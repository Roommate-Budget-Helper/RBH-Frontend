import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import ApiClient from '../api-client';
import { FormBuilder } from '@angular/forms';
import { StorageServiceService } from '../storage-service.service';
const STORAGE_KEY = 'local_userInfo';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

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
    nameStatus = 'Edit';
    descriStatus = 'Edit';
    amountStatus = 'Edit';
    original: IBillHistory;
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    downloadURL: Observable<string>;
    billId;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private StorageService: StorageServiceService,
        public fb: FormBuilder,
        private afStorage: AngularFireStorage
    ) { }

    async ngOnInit() {
        this.billId = this.route.snapshot.params['id'];
        this.billDetail = await ApiClient.bill.getBillById(this.billId);
        console.info(this.billDetail)
        this.original = {
            ownerId: this.billDetail[0].ownerId,
            homeId: this.billDetail[0].homeId,
            totalAmount: this.billDetail[0].totalAmount,
            currentID: this.billDetail[0].billId,
            billName: this.billDetail[0].billName,
            descri: this.billDetail[0].descri,
            created_at: this.billDetail[0].created_at,
            created_by: this.billDetail[0].created_by
        };

        this.findOwner(this.billDetail);
    }

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
        console.info(this.ownerName, this.billDetail[index])
        if (this.user.userName === this.ownerName) {
            //if is owner
            if (this.billDetail[index].ownerId === this.billDetail[index].userId) {
                return 'Upload Recipt';
            } else {
                if (this.billDetail[index].proof == null) {
                    return 'No Receipt uploaded'
                } else {
                    return 'View Receipt'
                };
            }
        } else {
            //if is not owner
            if (this.billDetail[index].ownerId === this.billDetail[index].userId) {
                if (this.billDetail[index].proof != null) {
                    return 'Check Recipt';
                }else{
                    return 'No Proof Uploaded'
                }
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
    };

    descriptionOnclick = () => {
        this.descriFlag = !this.descriFlag;
    };

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

    updateBillDetailOnclick = async () => {
        let detail = this.billDetail[0];

        this.billDetail.forEach((item) => {
            item.totalAmount = this.billDetail[0].totalAmount;

            item.descri = this.billDetail[0].descri;
            item.billName = this.billDetail[0].billName;
        });

        await ApiClient.bill.editBillById(this.billDetail);
        await ApiClient.bill.createBillHistory(this.original);
        this.handleBack();
    };

    onFileUpload = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        let imgResultAfterCompress = file;

        const id = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(file);
        this.task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    this.downloadURL = this.ref.getDownloadURL();

                    this.downloadURL.subscribe((url) => {
                        ApiClient.bill.uploadProofById({
                            numId: this.user.id,
                            billId: this.route.snapshot.params['id'],
                            baseString: url
                        });
                    });
                })
            )
            .subscribe();
    };

    onFileView = (basedString) => {
        var image = new Image();
        image.style.width = '200px';

        image.src = basedString.proof;
        if (document.getElementById(basedString.index).childNodes.length === 0) {
            document.getElementById(basedString.index).append(image);
            // document.getElementById(basedString.index).innerHTML += "<br><input type='checkbox'>  Approve  </input> <input type='checkbox'>  Decline  </input>"
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
