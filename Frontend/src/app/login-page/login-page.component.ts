import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import ApiClient from '../api-client';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    options: any;
    constructor(private location: Location) {
        this.options = { username: '', password: '' };
    }

    ngOnInit = () => {};

    handleBack = () => {
        this.location.back();
    };

    handleSubmit = async () => {
        const result = await ApiClient.auth.login(this.options.username, this.options.password);
        alert(`${result}`);
    };

    ngOnDestroy() {}
}
