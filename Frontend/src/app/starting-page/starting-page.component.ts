import { Component, OnInit } from '@angular/core';
import ApiClient from '../api-client';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InvitationDialogComponent } from '../invitation-dialog/invitation-dialog.component';

@Component({
    selector: 'app-starting-page',
    templateUrl: './starting-page.component.html',
    styleUrls: ['./starting-page.component.scss']
})
export class StartingPageComponent implements OnInit {
    constructor(private router: Router, public dialog: MatDialog, public dialogRef: MatDialogRef<any>) {}

    ngOnInit() {
        // this.dialogRef = this.dialog.open(InvitationDialogComponent, { data: { name: 'test1' } });
        // this.dialogRef.updatePosition({ top: '1%', right: '1%' });
    }

    share = async () => {
        //const result = await ApiClient.auth.login('huangj3', 'jjj');
        //window.alert(`${result}`);
    };

    handleRedirectLogin = () => {
        this.router.navigateByUrl('/login');
    };

    handleRedirectRegister = () => {
        this.router.navigateByUrl('/register');
    };
}
