import { Component, OnInit } from '@angular/core';
import ApiClient from '../api-client';
import { Router } from '@angular/router';

@Component({
    selector: 'app-starting-page',
    templateUrl: './starting-page.component.html',
    styleUrls: ['./starting-page.component.scss']
})
export class StartingPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    share = async () => {
        //const result = await ApiClient.auth.login('huangj3', 'jjj');
        //window.alert(`${result}`);
    };

    handleRedirect = () => {
        this.router.navigateByUrl('/login');
    };
}
