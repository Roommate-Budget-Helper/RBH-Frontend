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
    selector: 'app-create-bill-one-time-page',
    templateUrl: './create-bill-one-time-page.component.html',
    styleUrls: ['./create-bill-one-time-page.component.scss']
})
export class CreateBillOneTimePageComponent implements OnInit {
    labelMsg = 'Upload Image';
    current_array = [''];
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
    home = this.StorageService.getHomeLocalStorage(HOME_STORAGE_KEY);
    roommate_array = this.home.roommates.trim().split('  ');
    editable_array = this.home.roommates.trim().split('  ');
    shareplan_array;
    constructor(
        private router: Router,
        public fb: FormBuilder,
        private StorageService: StorageServiceService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<any>
    ) {}
    oneTimeBillForm = this.fb.group({
        billname: [''],
        description: [''],
        amount: [0],
        receipt: [null],
        splitMethod: ['Percentage'],
        addDynamicElement: this.fb.array([this.shareDetail])
    });
    owneram = 0;
    ownerpp = 100;

    async ngOnInit() {
        this.deleteRoommate(this.user.userName);

        await this.getPlan();
        // console.log(this.shareplan_array);

        // console.info(this.roommate_array);
    }

    updateOwner = () => {
        let result = this.oneTimeBillForm.value;
        this.owneram = result.amount;
        this.ownerpp = 100;
        if (result.splitMethod == 'Amount') {
            this.addDynamicElement.value.forEach((element) => {
                console.info('element amount: ' + element.amount);
                // console.info("hhhhhhhhhhh",element.rm_name.rm_name );
                this.owneram -= element.amount;
                this.ownerpp -= (element.amount / result.amount) * 100;
            });
        } else {
            this.addDynamicElement.value.forEach((element) => {
                this.ownerpp -= element.amount;
                this.owneram -= (element.amount / 100) * result.amount;
            });
        }
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

    deleteRoommate(msg: string) {
        const index: number = this.roommate_array.indexOf(msg);
        if (index !== -1) {
            this.roommate_array.splice(index, 1);
        }
    }
    uploadFile(event) {
        let reader = new FileReader();
        let file = event.target.files[0];
        this.labelMsg = file.name;
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);

            // When file uploads set it to file formcontrol
            reader.onload = () => {
                this.oneTimeBillForm.patchValue({
                    receipt: reader.result
                });
            };
            // ChangeDetectorRef since file is loading outside the zone
            //   this.cd.markForCheck();
        }
    }

    onSubmit() {
        let result_am = [];
        let result_pp = [];
        let result = this.oneTimeBillForm.value;
        let result_rm = [];
        let owner_amount, owner_pp;
        let total_am = 0,
            total_pp = 0;

        console.info('result amount: ' + result.amount);
        if (result.splitMethod == 'Amount') {
            this.addDynamicElement.value.forEach((element) => {
                console.info('element amount: ' + element.amount);
                // console.info("hhhhhhhhhhh",element.rm_name.rm_name );
                result_rm.push(element.rm_name.rm_name);
                result_rm.push(this.user.userName);
                result_am.push(element.amount);
                total_am += element.amount;
                result_pp.push(parseInt(element.amount) / parseInt(result.amount));
                total_pp += parseInt(element.amount) / parseInt(result.amount);
            });
        } else {
            this.addDynamicElement.value.forEach((element) => {
                console.info('element amount: ' + parseInt(element.amount) * parseInt(result.amount));
                result_rm.push(element.rm_name.rm_name);
                result_rm.push(this.user.userName);
                result_am.push(parseInt(element.amount) * parseInt(result.amount));
                total_am += parseInt(element.amount) * parseInt(result.amount);
                result_pp.push(element.amount);
                total_pp += element.amount;
            });
        }
        let thisDialogRef = this.dialog.open(SharePlanDialogComponent, {
            data: { amount: this.owneram, pp: this.ownerpp },
            disableClose: true
        });
        let date: Date = new Date();
        thisDialogRef.afterClosed().subscribe(async (res) => {
            console.info(result);
            console.info(result_rm);
            if (res == '') {
                ApiClient.bill.createBill({
                    ownerId: this.user.id,
                    homeId: this.home.HouseId,
                    plannedSharedFlag: 0,
                    sharePlanid: 0,
                    full_name: '',
                    totalAmount: result.amount,
                    roommates: result_rm,
                    amount: result_am,
                    proportion: result_pp,
                    billName: result.billname,
                    descri: result.description,
                    created_at: date,
                    created_by: this.user.userName
                });
            } else {
                ApiClient.bill.createBill({
                    ownerId: this.user.id,
                    homeId: this.home.HouseId,
                    plannedSharedFlag: 1,
                    sharePlanid: -1,
                    full_name: result,
                    totalAmount: result.amount,
                    roommates: result_rm,
                    amount: result_am,
                    proportion: result_pp,
                    billName: result.billname,
                    descri: result.description,
                    created_at: date,
                    created_by: this.user.userName
                });
            }
            this.router.navigateByUrl('/homedetail');
        });
    }

    get addDynamicElement() {
        return this.oneTimeBillForm.get('addDynamicElement') as FormArray;
    }

    addItems = () => {
        if (this.roommate_array.length == 0) {
            alert("You don't have any more roommate to split with, invite now!");
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
        let total = this.oneTimeBillForm.value.amount;
        let evalue = e.target.value;
        if (JSON.stringify(evalue).split(' ').length == 1) {
            this.updateOwner();
            return;
        }

        let svalue = JSON.stringify(evalue).split(' ')[1];
        console.log('svalue : ' + svalue);
        let value = svalue.substring(0, svalue.length - 1);
        console.info(this.addDynamicElement.at(i));
        this.addDynamicElement
            .at(i)
            .setValue(
                { rm_name: value, amount: 0 },
                { onlySelf: true, emitEvent: true, emitModelToViewChange: true, emitViewToModelChange: true }
            );
        // this.addDynamicElement.get(`${i}`)   .['rm_name'].setValue(value)
        console.info('isisis', this.addDynamicElement.get(`${i}`).value.rm_name);

        // console.info("current array is: "+this.current_array)
        // console.info("roommate array is: "+this.roommate_array)
        // console.info("changed to: "+ value)
        // console.info("last value is: "+ this.current_array[i])
        if (this.current_array[i] == '') {
            this.deleteRoommate(value);
            this.current_array[i] = value;
        } else {
            this.deleteRoommate(value);
            this.roommate_array.push(this.current_array[i]);
            this.current_array[i] = value;
        }

        // if(this.oneTimeBillForm.value.splitMethod=="Percentage"){
        //       this.result_pp.push(moneyValue)
        //       this.result_am.push(moneyValue*total)
        //       this.owneram-=(moneyValue*total)
        //       this.ownerpp-=moneyValue
        // }else{
        //     this.result_pp.push(moneyValue/total*100)
        //     this.result_am.push(moneyValue)
        //     this.owneram-=moneyValue
        //     this.ownerpp-=(moneyValue/total*100)
        // }
        // console.info("After current array is: "+this.current_array)
        // console.info("After roommate array is: "+this.roommate_array)
    }
}
