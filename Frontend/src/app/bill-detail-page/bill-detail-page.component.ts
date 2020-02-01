import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ApiClient from '../api-client';
import { StorageServiceService } from '../storage-service.service';
const STORAGE_KEY = 'local_userInfo';
@Component({
    selector: 'app-bill-detail-page',
    templateUrl: './bill-detail-page.component.html',
    styleUrls: ['./bill-detail-page.component.scss']
})
export class BillDetailPageComponent implements OnInit {
    billDetail: IBill;
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
    constructor(private route: ActivatedRoute, private router: Router, private StorageService: StorageServiceService) {}

    async ngOnInit() {
        this.billDetail = await ApiClient.bill.getBillById(this.route.snapshot.params['id']);
        // this.billDetail = await ApiClient.bill.getBillById('41');
        console.info(this.billDetail);
    }

    handleBack = () => {
        this.router.navigateByUrl('/homedetail');
    };
}
