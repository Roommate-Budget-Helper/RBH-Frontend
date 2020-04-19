import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import ApiClient from '../api-client';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
    options: string[] = this.data.roommateArray;
    filteredOptions: Observable<string[]>;
    ngOnInit() {
        this.filteredOptions = this.emailFormControl.valueChanges.pipe(
            startWith(''),
            // map((value) => (typeof value === 'string' ? value : value.name))
            map((name) => (name ? this._filter(name) : this.options.slice()))
        );
        console.info(this.data.roommates);
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

    displayFn(user: string): string {
        return user;
    }

    private _filter(name: string): string[] {
        const filterValue = name.toLowerCase();

        return this.options.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    }
}
