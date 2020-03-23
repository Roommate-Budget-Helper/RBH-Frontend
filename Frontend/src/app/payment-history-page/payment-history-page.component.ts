import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ApiClient from '../api-client';
import { StorageServiceService } from '../storage-service.service';
const STORAGE_KEY = 'local_userInfo';
const HOME_STORAGE_KEY = 'local_homeId';
@Component({
    selector: 'app-payment-history-page',
    templateUrl: './payment-history-page.component.html',
    styleUrls: ['./payment-history-page.component.scss']
})

//@ts-ignore
export class PaymentHistoryPageComponent implements OnInit {
    home;
    roommate_array = [] as string[];
    balance_array = [] as number[];
    roommate_string = '';
    id;
    user;
    roommates;
    temp;
    constructor(private router: Router, private StorageService: StorageServiceService) {}
    async ngOnInit() {
        this.user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
        this.home = this.StorageService.getHomeLocalStorage(HOME_STORAGE_KEY);
        this.roommates = this.StorageService.getHomeLocalStorage(HOME_STORAGE_KEY).roommates;
        this.roommate_string = this.roommates.replace(this.home.admin_name, '');
        this.id = this.StorageService.getHomeLocalStorage(HOME_STORAGE_KEY).id;

        // this.temp = await ApiClient.home.getUserbalanceByHome('darcy007', this.home.HouseId);

        this.roommate_array = this.roommates.trim().split('  ');

        this.getBalanceInfo();
    }

    handleBack = () => {
        this.router.navigateByUrl('/home');
    };

    getBalanceInfo = () => {
        this.roommate_array = this.roommates.trim().split('  ');
        this.roommate_array.map(async (item, index) => {
            (await (await ApiClient.home.getUserbalanceByHome(item, this.home.HouseId)).balance) == null
                ? (this.balance_array[index] = 0)
                : (this.balance_array[index] = (await ApiClient.home.getUserbalanceByHome(item, this.home.HouseId)).balance);
        });
    };
}
