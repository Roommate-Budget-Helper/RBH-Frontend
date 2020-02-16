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
    shareplanId;
    shareplanName;
    shareplanName_array = [];
    rm_num = this.roommate_array.length - 1;
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
        addDynamicElement: this.fb.array([])
    });
    owneram = 0;
    ownerpp: number = 100;

    async ngOnInit() {
        this.deleteRoommate(this.user.userName);

        await this.getPlan();
        this.shareplan_array.forEach(element => {
            this.shareplanName_array.push(element.full_name)
        });

        console.log(this.shareplan_array);
    }

    updateOwner = () => {
        let result = this.oneTimeBillForm.value;
        this.owneram = result.amount;
        this.ownerpp = 100;
        this.shareplanName = ''
        if (result.splitMethod == 'Amount') {
            this.addDynamicElement.value.forEach((element) => {
                console.info('element amount: ' + element.amount);
                // console.info("hhhhhhhhhhh",element.rm_name.rm_name );
                this.owneram -= element.amount;
                this.ownerpp -= (element.amount / result.amount) * 100;
                this.ownerpp = parseFloat(this.ownerpp.toPrecision(4));
                console.info(this.ownerpp);
            });
        } else {
            this.addDynamicElement.value.forEach((element) => {
                this.ownerpp -= parseFloat(element.amount.toPrecision(2));
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
        console.log(index);
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

        console.info(this.oneTimeBillForm.controls);
        if (result.splitMethod == 'Amount') {
            this.addDynamicElement.value.forEach((element) => {
                console.info('element amount: ' + element.amount);
                // console.info("hhhhhhhhhhh",element.rm_name.rm_name );
                result_rm.push(element.rm_name);
                result_am.push(element.amount);
                total_am += element.amount;
                result_pp.push(parseFloat(((parseFloat(element.amount) / parseFloat(result.amount)) * 100).toPrecision(4)));
            });
        } else {
            this.addDynamicElement.value.forEach((element) => {
                console.info('element amount: ' + parseInt(element.amount) * parseInt(result.amount));
                result_rm.push(element.rm_name);
                result_am.push(parseInt(element.amount) * parseInt(result.amount));
                total_am += (parseInt(element.amount) * parseInt(result.amount)) / 100;
                result_pp.push(parseFloat(element.amount.toPrecision(4)));
            });
        }
        result_rm.push(this.user.userName);
        result_am.push(this.owneram);
        result_pp.push(this.ownerpp);
        // console.info(result)
        console.info(result_rm);
        console.info(this.shareplanId)
        console.info(this.shareplanName_array.indexOf(this.shareplanName))

        let thisDialogRef = this.dialog.open(SharePlanDialogComponent, {
            data: { amount: this.owneram, pp: this.ownerpp, spName: this.shareplanName, sp_array: this.shareplanName_array,recurrent: false },
            disableClose: true
        });
        let date: Date = new Date();
        thisDialogRef.afterClosed().subscribe(async (res) => {
            console.info(result);
            console.info(res);
            if (res == 'back') {
                return;
            }
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
                    isRecurrent: 0,
                    isRecurrentDateTime: date,
                    recurrentIntervl:0,
                    created_at: date,
                    created_by: this.user.userName
                });
            } else if (this.shareplanName_array.indexOf(this.shareplanName) >= 0) {
                ApiClient.bill.createBill({
                    ownerId: this.user.id,
                    homeId: this.home.HouseId,
                    plannedSharedFlag: 1,
                    sharePlanid: this.shareplanId,
                    full_name: res,
                    totalAmount: result.amount,
                    roommates: result_rm,
                    amount: result_am,
                    proportion: result_pp,
                    billName: result.billname,
                    descri: result.description,
                    isRecurrent: 0,
                    isRecurrentDateTime: date,
                    recurrentIntervl:0,
                    created_at: date,
                    created_by: this.user.userName
                });
            } else {
                ApiClient.bill.createBill({
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
                    isRecurrent: 0,
                    isRecurrentDateTime: date,
                    recurrentIntervl:0,
                    created_at: date,
                    created_by: this.user.userName
                });
            }
            this.router.navigateByUrl('/homedetail')

        });
    }

    get addDynamicElement() {
        return this.oneTimeBillForm.get('addDynamicElement') as FormArray;
    }

    addItems = (value) => {
        console.info(this.addDynamicElement.controls.length);
        if (this.roommate_array.length == 0 || this.addDynamicElement.controls.length >= this.rm_num) {
            alert(`You only have ${this.rm_num} roommates!`);
        } else {
            this.addDynamicElement.push(value);
            console.info(value);
            this.current_array.push(value);
        }
    };

    deleteItems = () => {
        this.addDynamicElement.removeAt(this.addDynamicElement.length - 1);
        this.roommate_array.push(this.current_array.pop());
    };

    updateList = (e) => {
        console.info('event: ', e.target.value);
        console.info(e);
        if (e.target.value == -1) {
            this.shareplanId = -1;
            this.shareplanName = '';
            while (this.addDynamicElement.length != 0) {
                this.deleteItems();
            }
            this.updateOwner();
            return;
        } else {
            this.shareplanId = this.shareplan_array[e.target.value].id;
            this.shareplanName = this.shareplan_array[e.target.value].full_name;
        }
        let selectedPlan = this.shareplan_array[e.target.value];
        let rm = selectedPlan.userName;
        let pp = selectedPlan.ratio;
        this.oneTimeBillForm.get('splitMethod').setValue('Percentage');
        if (this.addDynamicElement.length != 0) {
            while (this.addDynamicElement.length != 0) {
                this.deleteItems();
            }
        }
        if (rm.indexOf(this.user.userName) < 0) {
            alert('you cannot use this share plan because you are not part of it.');
        } else {
            for (let i = 0; i < rm.length; i++) {
                if (rm[i] != this.user.userName) {
                    this.addItems(
                        this.fb.group({
                            rm_name: rm[i],
                            amount: pp[i]
                        })
                    );
                }
            }
            this.updateOwner();
        }
    };

    changeName(i, e) {
        let total = this.oneTimeBillForm.value.amount;
        let evalue = e.target.value;
        console.log(this.roommate_array.indexOf(evalue));
        if (this.roommate_array.indexOf(evalue) < 0) {
            this.updateOwner();
            return;
        }
        console.info(this.addDynamicElement.at(i));
        // this.addDynamicElement.at(i)
        //     .patchValue(
        //         {rm_name: value}
        //     );
        // this.addDynamicElement.get(`${i}`)   .['rm_name'].setValue(value)
        console.info('isisis', evalue);
        console.info('current: ', this.current_array, i, this.current_array[i] == '');
        // console.info("current array is: "+this.current_array)
        // console.info("roommate array is: "+this.roommate_array)
        // console.info("changed to: "+ value)
        // console.info("last value is: "+ this.current_array[i])
        if (this.current_array[i] == '') {
            this.deleteRoommate(evalue);
            this.current_array[i] = evalue;
        } else {
            this.deleteRoommate(evalue);
            this.roommate_array.push(this.current_array[i]);
            this.current_array[i] = evalue;
        }
        console.log(this.current_array, this.roommate_array);

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
