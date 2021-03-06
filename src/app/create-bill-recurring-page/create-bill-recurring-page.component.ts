import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { StorageServiceService } from '../storage-service.service';
import ApiClient from '../api-client';
import { element } from 'protractor';
import { SharePlanDialogComponent } from '../share-plan-dialog/share-plan-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const HOME_STORAGE_KEY = 'local_homeId';
const STORAGE_KEY = 'local_userInfo';

@Component({
    selector: 'app-create-recurring-page',
    templateUrl: './create-bill-recurring-page.component.html',
    styleUrls: ['./create-bill-recurring-page.component.scss']
})
export class CreateBillRecurringPageComponent implements OnInit {
    current_array = [''];
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
    home = this.StorageService.getHomeLocalStorage(HOME_STORAGE_KEY);
    roommate_array;
    rec_method = ['Week', 'Month', '3 Month', '6 Month'];
    shareplan_array;
    rm_num;
    constructor(
        private router: Router,
        public fb: FormBuilder,
        private StorageService: StorageServiceService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<any>
    ) {}
    recurrentBillForm = this.fb.group({
        billname: [''],
        description: [''],
        startDate: [''],
        addDynamicElement: this.fb.array([this.shareDetail]),
        recurringMethod: ['']
    });
    ownerpp = 100;

    async ngOnInit() {
        this.roommate_array = this.home.roommates.trim().split('  ');
        this.rm_num = this.roommate_array.length - 1;
        this.deleteRoommate(this.user.userName);
        if (this.roommate_array.length == 0) {
            this.recurrentBillForm = this.fb.group({
                billname: [''],
                description: [''],
                startDate: [''],
                addDynamicElement: [''],
                recurringMethod: ['']
            });
        }
        await this.getPlan();
    }

    updateOwner = () => {
        let result = this.recurrentBillForm.value;
        this.ownerpp = 100;
        this.addDynamicElement.value.forEach((element) => {
            this.ownerpp -= element.amount;
        });
    };

    get shareDetail(): FormGroup {
        return this.fb.group({
            rm_name: '',
            amount: 0
        });
    }

    getPlan = async () => {
        this.shareplan_array = await ApiClient.bill.getSharePlans(this.home.HouseId);
    };
    handleBack = () => {
        this.router.navigateByUrl('/billoption');
    };
    redirectToUserHistory = () => {
        this.router.navigateByUrl('/history');
    };

    deleteRoommate(msg: string) {
        const index: number = this.roommate_array.indexOf(msg);

        if (index !== -1) {
            this.roommate_array.splice(index, 1);
        }
    }

    print(event) {}
    onSubmit() {
        let result_am = [];
        let result_pp = [];
        let result = this.recurrentBillForm.value;

        if (result.recurringMethod == '' || result.recurringMethod == 'method1') {
            alert('please select a recurring method!');
            return;
        }
        let result_rm = [];

        let rec_interval;
        switch (result.recurringMethod) {
            case 'Month':
                rec_interval = 30;
                break;
            case 'Week':
                rec_interval = 7;
                break;
            case '3 Month':
                rec_interval = 90;
                break;
            case '6 Month':
                rec_interval = 180;
                break;
            default:
                rec_interval = 30;
        }
        let ret = false;
        if (this.addDynamicElement.value) {
            this.addDynamicElement.value.forEach((element) => {
                if (element.rm_name == '') {
                    alert('please select roommates');
                    ret = true;
                    return;
                }
                result_rm.push(element.rm_name);
                result_am.push(parseInt(element.amount));
                result_pp.push(parseFloat(element.amount.toPrecision(2)));
            });
        }
        if (ret) {
            return;
        }

        result_rm.push(this.user.userName);
        result_pp.push(this.ownerpp);

        let thisDialogRef = this.dialog.open(SharePlanDialogComponent, {
            data: { pp: this.ownerpp, recurrent: true, interval: result.recurringMethod, starton: result.startDate },
            disableClose: true
        });
        let date: Date = new Date();

        thisDialogRef.afterClosed().subscribe(async (res) => {
            if (res == 'back') {
                return;
            } else {
                await ApiClient.bill.createBill({
                    ownerId: this.user.id,
                    homeId: this.home.HouseId,
                    plannedSharedFlag: 1,
                    sharePlanid: -1,
                    full_name: res,
                    totalAmount: result.amount,
                    roommates: result_rm,
                    amount: result_am,
                    proportion: result_pp,
                    billName: result.billname,
                    descri: result.description,
                    isRecurrent: 1,
                    isRecurrentDateTime: result.startDate,
                    recurrentIntervl: rec_interval,
                    created_at: date,
                    created_by: this.user.userName
                });
            }
            this.router.navigateByUrl('/homedetail');
        });
    }

    get addDynamicElement() {
        return this.recurrentBillForm.get('addDynamicElement') as FormArray;
    }

    addItems = () => {
        if (this.roommate_array.length == 0 || this.addDynamicElement.controls.length >= this.rm_num) {
            alert(`You only have ${this.rm_num} roommates!`);
        } else {
            this.addDynamicElement.push(this.shareDetail);
            this.current_array.push('');
        }
    };

    deleteItems = () => {
        this.addDynamicElement.removeAt(this.addDynamicElement.length - 1);
        this.roommate_array.push(this.current_array.pop());
    };

    changeName(i, e) {
        let total = this.recurrentBillForm.value.amount;
        let evalue = e.target.value;

        if (this.roommate_array.indexOf(evalue) < 0) {
            this.updateOwner();
            return;
        }

        if (this.current_array[i] == '') {
            this.deleteRoommate(evalue);
            this.current_array[i] = evalue;
        } else {
            this.deleteRoommate(evalue);
            this.roommate_array.push(this.current_array[i]);
            this.current_array[i] = evalue;
        }
    }
}
