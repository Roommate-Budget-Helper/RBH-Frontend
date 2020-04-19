import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

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
    selector: 'app-add-roommate-dialog',
    templateUrl: './add-roommate-dialog.component.html',
    styleUrls: ['./add-roommate-dialog.component.scss']
})
export class AddRoommateDialogComponent implements OnInit {
    myControl = new FormControl();
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
    emailFormControl = new FormControl('', [Validators.required]);
    matcher = new MyErrorStateMatcher();

    options: string[];

    filteredOptions: Observable<string[]>;

    async ngOnInit() {
        await ApiClient.invitation.getAllUsername().then((result) => {
            this.options = result;
        });

        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            // map((value) => (typeof value === 'string' ? value : value.name))
            map((name) => (name ? this._filter(name) : this.options.slice()))
        );
    }

    invite = async (username) => {
        if (this.data.roommates.includes(username)) {
            alert('User already exists in this home!');
            return;
        } else {
            const exist = await ApiClient.invitation.checkInvitation(username, this.data.houseId);
            if (exist) {
                alert('User has been invited!');
                return;
            } else {
                await ApiClient.invitation.createInvitation(username, this.data.houseId).then(() => {
                    alert('Sent invitation successfully!');
                });
            }
        }
    };

    displayFn(user: string): string {
        return user;
    }

    private _filter(name: string): string[] {
        const filterValue = name.toLowerCase();

        return this.options.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    }
}
