import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../storage-service.service';
import { Router, ActivatedRoute } from '@angular/router';
const STORAGE_KEY = 'local_userInfo';
import ApiClient from '../api-client';
@Component({
    selector: 'app-bill-history-page',
    templateUrl: './bill-history-page.component.html',
    styleUrls: ['./bill-history-page.component.scss']
})
export class BillHistoryPageComponent implements OnInit {
    histories;
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
    constructor(private route: ActivatedRoute, private router: Router, private StorageService: StorageServiceService) {}

    async ngOnInit() {
        this.histories = await ApiClient.bill.getBillHistoryById(this.route.snapshot.params['id']);
        console.info(this.histories)
    }

    handleBack = () => {
        this.router.navigateByUrl('/homedetail');
    };
}
