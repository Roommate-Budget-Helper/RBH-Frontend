import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    constructor(private location: Location) {}

    ngOnInit() {}

    handleBack = () => {
        this.location.back();
    };
}
