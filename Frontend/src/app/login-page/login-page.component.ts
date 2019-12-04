import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import ApiClient from '../api-client';
import { Router } from '@angular/router';
import * as sha256 from 'sha256';
import * as _ from "lodash";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    options: any;
    constructor(private location: Location, private router: Router) {
        this.options = { username: '', password: '' };
    }

    ngOnInit = () => {};

    handleBack = () => {
        this.router.navigateByUrl('/');
    };

    handleSubmit = async () => {

        if(this.options.username.replace(/\s/g, "").length == 0 || this.options.password.replace(/\s/g, "").length == 0){
            alert('please enter username or password!');
        }else{
            const result = await ApiClient.auth.login(this.options.username, sha256(this.options.password));
            _.isEmpty(result) ? alert('wrong credential combination') : alert('login succeed');
        }

    };

    ngOnDestroy() {}
}
