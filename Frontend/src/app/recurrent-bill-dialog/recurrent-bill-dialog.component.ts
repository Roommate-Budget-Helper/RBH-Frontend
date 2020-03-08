import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';



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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private imageCompress: NgxImageCompressService) { }
  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  ngOnInit() {
  }
  date = new Date()
  imgResultAfterCompress;


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
    this.imgResultAfterCompress = await this.imageCompress.compressFile(this.imgResultAfterCompress, 1, 20, 20)
    await ApiClient.bill
      .uploadProofById({
        numId: this.data.user.id,
        billId: billRes.id.valueOf(),
        baseString: this.imgResultAfterCompress.toString().split(',')[1]
      })
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
    let reader = new FileReader();
    let file = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      reader.onload = async () => {
        this.imgResultAfterCompress = reader.result.toString()
           document.getElementById("selectedFileName").innerHTML = file.name  
      };
    }
  };

}
