import { Component, OnInit, ViewChild } from '@angular/core';
import ApiClient from '../api-client';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as sha256 from 'sha256';
import * as _ from 'lodash';
import { StorageServiceService } from '../storage-service.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    options: any;
    constructor(private router: Router, private StorageService: StorageServiceService) {
        this.options = { username: '', password: '' };
    }

    ngOnInit = () => {};

    handleBack = () => {
        this.router.navigateByUrl('/');
    };

    handleSubmit = async () => {
        if (this.options.username.replace(/\s/g, '').length == 0 || this.options.password.replace(/\s/g, '').length == 0) {
            alert('please enter username or password!');
        } else {
            const result = await ApiClient.auth.login(this.options.username, sha256(this.options.password));
            _.isEmpty(result.userInfo) ? alert('wrong credential combination') : this.router.navigateByUrl('/home');
            this.StorageService.storeOnLocalStorage(result);
            console.info(result);
        }
    };

    ngOnDestroy() {}
}
