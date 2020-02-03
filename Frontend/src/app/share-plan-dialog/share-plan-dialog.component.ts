import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';


import { ErrorStateMatcher } from '@angular/material/core';
import ApiClient from '../api-client';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-share-plan-dialog',
  templateUrl: './share-plan-dialog.component.html',
  styleUrls: ['./share-plan-dialog.component.scss']
})
export class SharePlanDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  confirmed = false;
  haveName = false;
  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  ngOnInit() {
  }
  checkName = (planName) => {
    if (this.data.sp_array.indexOf(planName) != -1) {
      alert('this name has already been used in this house')
    } else {
      return planName;
    }
  }

}
