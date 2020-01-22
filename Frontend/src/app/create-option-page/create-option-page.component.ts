import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-option-page',
    templateUrl: './create-option-page.component.html',
    styleUrls: ['./create-option-page.component.scss']
})
export class CreateOptionPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    handleBack = () => {
        this.router.navigateByUrl('/homedetail');
    };

    handleOneTimeCreate = () => {
        this.router.navigateByUrl('/onetimebill');
    };
    handleRecurringTimeCreate = () => {
        this.router.navigateByUrl('/recurringtimebill');
    };
}
