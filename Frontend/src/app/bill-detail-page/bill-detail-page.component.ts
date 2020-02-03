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
    billDetail: IBillDetail[];
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
    ownerName = '111';
    constructor(private route: ActivatedRoute, private router: Router, private StorageService: StorageServiceService) {}

    async ngOnInit() {
        this.billDetail = await ApiClient.bill.getBillById(this.route.snapshot.params['id']);
        this.findOwner(this.billDetail);
        // this.billDetail = await ApiClient.bill.getBillById('41');
        console.info(this.billDetail);
    }

    handleBack = () => {
        this.router.navigateByUrl('/homedetail');
    };

    findOwner = (billDetail: IBillDetail[]): stringId => {
        console.info(billDetail);
        this.billDetail.map((i) => {
            if (i.ownerId == i.userId) {
                this.ownerName = i.userName;
            }
        });
        return this.ownerName;
    };

    getTitle = (index: number): string => {
        if (this.user.userName === this.ownerName) {
            //if is owner
            if (this.billDetail[index].ownerId === this.billDetail[index].userId) {
                return 'Creator';
            } else {
                return 'split';
            }
        } else {
            //if is not owner
            if (this.billDetail[index].ownerId === this.billDetail[index].userId) {
                return 'Creator';
            } else {
                return 'split';
            }
        }
    };

    getButtonText = (index: number): string => {
        if (this.user.userName === this.ownerName) {
            //if is owner
            if (this.billDetail[index].ownerId === this.billDetail[index].userId) {
                return 'Upload Recipt';
            } else {
                return 'Audit Proof';
            }
        } else {
            //if is not owner
            if (this.billDetail[index].ownerId === this.billDetail[index].userId) {
                return 'Check Recipt';
            } else if (this.user.userId === this.billDetail[index].userId) {
                return 'Upload Proof';
            } else {
                return 'Check Proof';
            }
        }
    };
}
