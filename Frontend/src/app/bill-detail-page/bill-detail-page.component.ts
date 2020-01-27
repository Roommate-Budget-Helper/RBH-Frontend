import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-bill-detail-page',
    templateUrl: './bill-detail-page.component.html',
    styleUrls: ['./bill-detail-page.component.scss']
})
export class BillDetailPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    handleBack = () => {
        this.router.navigateByUrl('/homedetail');
    };
}
