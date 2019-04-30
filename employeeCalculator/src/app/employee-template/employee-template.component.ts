import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-employee-template',
  templateUrl: './employee-template.component.html',
  styleUrls: ['./employee-template.component.scss']
})
export class EmployeeTemplateComponent implements OnInit {
  index = 0;
  employeesForm: FormGroup;
  dependents: FormArray;
  employees: FormArray;
  total = {};
  dep = {};
  depTotal = {};
  empTotal = {};
  payPeriod = 26;
  wkPay = 2000;
  discount = .10;
  employeeBen = 1000 / this.payPeriod;
  dependentBen = 500 / this.payPeriod;
  discountedRateEmp = this.employeeBen - (this.employeeBen * this.discount);
  discountedRateDep = this.dependentBen - (this.dependentBen * this.discount);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.employeesForm = this.fb.group({
      employees: this.fb.array([this.employeeSection()])
    });
  }

  getEmployees(form) {
    return form.controls.employees.controls;
  }

  // Create Form Group for each employee card
  employeeSection() {
    return new FormGroup({
      employeeName: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      total: new FormControl(''),
      dependents: this.fb.array([])
    });
  }

   // Add Dependent to List
  addDependent(dependent) {
    dependent.push(
      this.fb.control('', [Validators.required, Validators.minLength(1)])
    );
  }

  // Add Employee to List
  addEmployee() {
    this.employees = this.employeesForm.get('employees') as FormArray;
    this.employees.push(this.employeeSection());
  }

  // Remove Dependent from List
  removeDependent(dependent, index, emp) {
    dependent.removeAt(index);
    delete this.dep[index];
    this.reCalDepTotal(emp);
  }

  // Remove Employee from List
  removeEmployee(form, index) {
    form.controls.employees.removeAt(index);
    delete this.empTotal[index];
    delete this.total[index];
  }

  // Subscribe to the corresponding employee input to reduce keyup calls
  employeeNameWatch(employee, index) {
    fromEvent(employee.currentTarget, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe(value => {
        this.calculateEmp(employee.target.value, index);
      });
  }

  // Subscribe to the corresponding dependent input to reduce keyup calls
  dependentWatch(dependent, index, empIndex) {
    fromEvent(dependent.currentTarget, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe(value =>  this.calculateDep(dependent.target.value, index, empIndex));
  }

  // Calaculate Employee Total after deduction and assign to total
  calculateEmp(value, index) {
    if (value.toLowerCase().charAt(0) === 'a') {
     this.empTotal[index] = (this.wkPay - this.discountedRateEmp).toFixed(2);
    } else {
      this.empTotal[index] = (this.wkPay - this.employeeBen).toFixed(2);
    }
    this.total = Object.assign({}, this.empTotal);
    this.reCalDepTotal(index);
  }

  // Calaculate Dependent at Index choose if discounted Rate
  calculateDep(value, index, emp) {
     if (value.toLowerCase().charAt(0) === 'a') {
      this.dep[index] =  this.discountedRateDep.toFixed(2);
     } else {
       this.dep[index] = this.dependentBen.toFixed(2);
     }
     this.reCalDepTotal(emp);
  }

// Calaculate Total for all current Dependents
   reCalDepTotal(emp) {
    let depTotal = 0;
    const empTotal = this.empTotal[emp];
    for (const dep in this.dep) {
      depTotal +=  parseFloat(this.dep[dep]);
     }
    this.total[emp] = empTotal - depTotal;
   }
}
