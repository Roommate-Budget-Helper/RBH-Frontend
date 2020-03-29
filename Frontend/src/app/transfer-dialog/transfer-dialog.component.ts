import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    selector: 'app-transfer-dialog',
    templateUrl: './transfer-dialog.component.html',
    styleUrls: ['./transfer-dialog.component.scss']
})
export class TransferDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {}
    emailFormControl = new FormControl('', [Validators.required]);
    matcher = new MyErrorStateMatcher();
    ngOnInit() {
        // console.info(this.data);
    }

    invite = async (username) => {
        if (this.data.roommateArray.includes(username)) {
            await ApiClient.home
                .transerOwnership(this.data.houseId, username)
                .then(() => {
                    alert('Transfer succeeded!');
                })
                .then(() => {
                    this.router.navigateByUrl('/home');
                })
                .catch(() => {
                    alert('Transfer failed!');
                });
        } else {
            alert('User does not exist!');
            return;
        }
        // await ApiClient.home.transerOwnership(username, this.data.houseId);
        // await ApiClient.invitation.createInvitation(username, this.data.houseId);
    };
}
