import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ApiClient from '../api-client';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { StorageServiceService } from '../storage-service.service';
const STORAGE_KEY = 'local_userInfo';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';


@Component({
    selector: 'app-bill-detail-page',
    templateUrl: './bill-detail-page.component.html',
    styleUrls: ['./bill-detail-page.component.scss']
})
export class BillDetailPageComponent implements OnInit {
    show: Boolean = false;
    billDetail: IBillDetail[];
    labelMsg = 'Upload Image';
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
    ownerName = '111';
    nameFlag = false;
    amountFlag = false;
    descriFlag = false;
    fileToUpload: File = null;
    fileName: String = null;
    nameStatus = "Edit";
    descriStatus = "Edit";
    amountStatus = "Edit";
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private StorageService: StorageServiceService,
        public fb: FormBuilder,
        private imageCompress: NgxImageCompressService
    ) { }

    async ngOnInit() {
        this.billDetail = await ApiClient.bill.getBillById(this.route.snapshot.params['id']);
        console.info(this.billDetail)
        // console.info(this.billDetail);
        this.findOwner(this.billDetail);
    }

    // ngOnChanges = (changes) => {
    //     console.log(changes['file'].currentValue);
    // };

    handleBack = () => {
        this.router.navigateByUrl('/homedetail');
    };

    findOwner = (billDetail: IBillDetail[]): stringId => {
        this.billDetail.map((i) => {
            if (i.ownerId == i.userId) {
                this.ownerName = i.userName;
            }
        });
        return this.ownerName;
    };
    findDescription = (billDetail: IBillDetail[]): stringId => {
        return this.billDetail[0].descri;
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
                return 'View Receipt';
            }
        } else {
            //if is not owner
            if (this.billDetail[index].ownerId === this.billDetail[index].userId) {
                return 'Check Recipt';
            } else if (this.user.id === this.billDetail[index].userId) {
                return 'Upload My Proof';
            } else {
                return 'No Proof Uploaded';
            }
        }
    };

    nameOnclick = () => {
        const tempName = this.billDetail[0].billName;
            this.nameFlag = !this.nameFlag;
            // this.billDetail.forEach((item) => {
            //     item.billName = tempName;
            // });
            // console.log(this.billDetail);
    };


    descriptionOnclick = () => {
        // const tempName = this.billDetail[0].descri;
        // if (this.descriFlag === true) {
        //     this.billDetail.forEach((item) => {
        //         item.descri = tempName;
        //     });
        //     console.log(this.billDetail);
        //     // ApiClient.bill.editBillById(this.billDetail).then(() => {
        //     //     this.descriFlag = !this.descriFlag;
        //     // });
        //     // this.descriStatus = "Edit";
        // } else {
            this.descriFlag = !this.descriFlag;
            // this.billDetail.forEach((item) => {
            //     item.descri = tempName;
            // });
            // console.log(this.billDetail);
            // this.descriStatus = "Save";
            
        // }
    }

    amountOnclick = () => {
        //this.amountFlag = !this.amountFlag;
        // if (this.amountFlag === true) {
            // this.billDetail.forEach((item) => {
            //     item.totalAmount = this.billDetail[0].totalAmount;
            // });
            // const result = ApiClient.bill.editBillById(this.billDetail).then(() => {
            //     this.amountFlag = !this.amountFlag;
            // });
            // this.amountStatus = "Edit";
        // } else {
            this.amountFlag = !this.amountFlag;
            // this.billDetail.forEach((item) => {
            //     item.descri = this.billDetail[0].descri;
            // });
            
            // this.amountStatus = "Save";
        // }
    };

    updateBillDetailOnclick = async() => {
        let detail = this.billDetail[0]
        this.billDetail.forEach((item) => {
            item.totalAmount = this.billDetail[0].totalAmount;

            item.descri = this.billDetail[0].descri;
            item.billName = this.billDetail[0].billName;
            });
            console.info(this.billDetail)

        await ApiClient.bill.editBillById(this.billDetail);
        await ApiClient.bill.createBillHistory({ownerId:detail.ownerId, homeId:detail.homeId, totalAmount:detail.totalAmount,
             currentID:detail.billId, billName:detail.billName, descri:detail.descri, created_at:new Date(),
              created_by:detail.created_by})
        this.handleBack();
    }

    onFileUpload = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        let imgResultAfterCompress = file

        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(imgResultAfterCompress);

            console.info(reader.result.toString())
            reader.onload = () => {
                console.info(reader.result.toString())
                this.imageCompress.compressFile(reader.result.toString(), 1, 20, 20).then(
                    result => {
                        console.info(result);
                        imgResultAfterCompress = result;
                        console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
                        ApiClient.bill
                            .uploadProofById({
                                numId: this.user.id,
                                billId: this.route.snapshot.params['id'],
                                baseString: imgResultAfterCompress.toString().split(',')[1]
                            })
                            .then(() => {
                                alert('Successfully uploaded!');
                            });
                    }
                );

            };
        }
    };

    onFileView = (basedString) => {
        var image = new Image();
        image.style.width = '200px';
        image.src = 'data:image/png;base64,' + basedString.proof;
        if (document.getElementById(basedString.index).childNodes.length === 0) {
            document.getElementById(basedString.index).append(image);
            document.getElementById(basedString.index).innerHTML+="<br><input type='checkbox'>  Approve  </input> <input type='checkbox'>  Decline  </input>"
            console.info( document.getElementById(basedString.index).innerHTML)
        }

        if (this.show) {
            document.getElementById(basedString.index).style.display = 'none';
            this.show = !this.show;
        } else {
            document.getElementById(basedString.index).style.display = 'block';
            this.show = !this.show;
        }
    };
}





