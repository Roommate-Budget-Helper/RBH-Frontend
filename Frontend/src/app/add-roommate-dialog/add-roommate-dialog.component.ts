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
    selector: 'app-add-roommate-dialog',
    templateUrl: './add-roommate-dialog.component.html',
    styleUrls: ['./add-roommate-dialog.component.scss']
})
export class AddRoommateDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
    emailFormControl = new FormControl('', [Validators.required]);
    matcher = new MyErrorStateMatcher();
    ngOnInit() {}

    invite = async (username) => {
        console.info(username);
        await ApiClient.invitation.createInvitation(username, this.data.houseId);
    };
}
