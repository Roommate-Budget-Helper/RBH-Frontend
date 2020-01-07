import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import * as jwt from 'jsonwebtoken';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import ApiClient from '../api-client';
import * as _ from 'lodash';

const STORAGE_KEY = 'local_userInfo';

export interface DialogData {
    name: string;
    numberOfRoommate: number;
    roommates: [];
}

@Component({
    selector: 'app-create-home-page',
    templateUrl: './create-home-page.component.html',
    styleUrls: ['./create-home-page.component.scss']
})
export class CreateHomePageComponent implements OnInit {
    HomeName: string;
    NumberOfRoommates: number;

    constructor(private router: Router, public fb: FormBuilder, private StorageService: StorageServiceService, public dialog: MatDialog) {
        this.NumberOfRoommates = this.addDynamicElement.length + 1;
    }
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;

    CreateHomeForm = this.fb.group({
        HomeName: '',
        addDynamicElement: this.fb.array([])
    });

    updateNumber = () => {
        this.NumberOfRoommates = this.addDynamicElement.length + 1;
    };

    onSubmit = async () => {
        let aFormArray = this.CreateHomeForm.get('addDynamicElement') as FormArray;

        for (let user of aFormArray.controls) {
            console.info(user.value);
        }

        const result = await ApiClient.home.createHome(this.CreateHomeForm.getRawValue().HomeName, this.user.userName, this.user.id);
        //create invitation
        aFormArray.controls.forEach((user) => {
            ApiClient.invitation.createInvitation(user.value, result);
        });
        // && await ApiClient.invitation.createInvitation(this.CreateHomeForm.getRawValue().HomeName, this.user.userName, this.user.id);
        result ? this.router.navigateByUrl('/home') : alert('Add home failed!');
        alert(JSON.stringify(this.CreateHomeForm.value));
    };

    get addDynamicElement() {
        return this.CreateHomeForm.get('addDynamicElement') as FormArray;
    }

    addItems = () => {
        this.updateNumber();
        this.addDynamicElement.push(this.fb.control(''));
    };

    deleteItems = () => {
        this.updateNumber();
        this.addDynamicElement.removeAt(this.addDynamicElement.length - 1);
    };

    handleBack = () => {
        this.router.navigateByUrl('/home');
    };

    ngOnInit() {}
}
