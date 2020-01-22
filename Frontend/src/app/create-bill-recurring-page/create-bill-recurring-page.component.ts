import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import * as jwt from 'jsonwebtoken';
import ApiClient from '../api-client';
const HOME_STORAGE_KEY = 'local_homeId';
const STORAGE_KEY = 'local_userInfo';
@Component({
    selector: 'app-create-bill-recurring-page',
    templateUrl: './create-bill-recurring-page.component.html',
    styleUrls: ['./create-bill-recurring-page.component.scss']
})
export class CreateBillRecurringPageComponent implements OnInit {
    home

    constructor(private router: Router,private StorageService:StorageServiceService) {}

    async ngOnInit() {
        this.home = this.StorageService.getHomeLocalStorage(HOME_STORAGE_KEY);
    }



    handleBack = () => {
        this.router.navigateByUrl('./billoption')
    }
}
