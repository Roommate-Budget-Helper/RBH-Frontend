import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs'



import { ErrorStateMatcher } from '@angular/material/core';
import ApiClient from '../api-client';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-recurrent-bill-dialog',
  templateUrl: './recurrent-bill-dialog.component.html',
  styleUrls: ['./recurrent-bill-dialog.component.scss']
})
export class RecurrentBillDialogComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private imageCompress: NgxImageCompressService, private afStorage: AngularFireStorage,
  ) { }
  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  ngOnInit() {
  }
  date = new Date()
  file;


  publish = async (result) => {
    console.info(result)
    let amount = []
    this.data.element.ratio.forEach(ratio => {
      amount.push(ratio * result / 100)
    })
    console.info(amount)
    var billRes = {} as IBillCreateResponse;

    billRes = await ApiClient.bill.createBill({
      ownerId: this.data.user.id,
      homeId: this.data.home.HouseId,
      plannedSharedFlag: 1,
      sharePlanid: this.data.element.id,
      full_name: this.data.element.full_name,
      totalAmount: result,
      roommates: this.data.element.userName,
      amount: amount,
      proportion: this.data.element.ratio,
      billName: this.data.element.full_name,
      descri: this.data.element.descri,
      isRecurrent: 0,
      isRecurrentDateTime: this.date,
      recurrentIntervl: 0,
      created_at: this.date,
      created_by: this.data.user.userName
    });
    let newDate = this.convertNextDate(this.data.element.recurrentInterval)
    console.info(newDate, this.data.element.id)
    await ApiClient.bill.updateRecurrent({ id: this.data.element.id, newDate: newDate })
    console.info(this.file)
    let id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(this.file)
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        // console.info("url is:" + this.downloadURL)
        this.downloadURL.subscribe(url => {
          // console.info(url)
          ApiClient.bill.uploadProofById(
            {
              numId: this.data.user.id,
              billId: billRes.id.valueOf(),
              baseString: url
            }
          );
        });
      })).subscribe();
  }

  convertNextDate = (num) => {
    var now = new Date();
    switch (num) {
      case 30:
        return this.addAMonth(now)
      case 7:
        return new Date(Date.now() + (6.04e+8))
      case 90:
        return this.addAMonth(this.addAMonth(this.addAMonth(now)))
      case 180:
        return this.addAMonth(this.addAMonth(this.addAMonth(this.addAMonth(this.addAMonth(this.addAMonth(now))))))
      default:
        ""
    }
  }

  addAMonth = (date) => {
    if (date.getMonth() == 11) {
      return new Date(date.getFullYear() + 1, 0, date.getDate());
    } else {
      return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }
  }
  onFileUpload = (event) => {
    this.file = event.target.files[0];
    document.getElementById("selectedFileName").innerHTML = this.file.name

  };

}
