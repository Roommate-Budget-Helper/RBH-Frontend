import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-bill-one-time-page',
    templateUrl: './create-bill-one-time-page.component.html',
    styleUrls: ['./create-bill-one-time-page.component.scss']
})
export class CreateBillOneTimePageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    handleBack = () => {
        this.router.navigateByUrl('/billoption');
    };
}
