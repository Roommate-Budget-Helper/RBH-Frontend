import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
const STORAGE_KEY = 'local_userInfo';
@Component({
    selector: 'app-create-option-page',
    templateUrl: './create-option-page.component.html',
    styleUrls: ['./create-option-page.component.scss']
})
export class CreateOptionPageComponent implements OnInit {
    constructor(private router: Router, private StorageService: StorageServiceService) {}
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
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
