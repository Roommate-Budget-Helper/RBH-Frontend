import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import ApiClient from '../api-client';

@Component({
  selector: 'app-remove-roommate-dialog',
  templateUrl: './remove-roommate-dialog.component.html',
  styleUrls: ['./remove-roommate-dialog.component.scss']
})
export class RemoveRoommateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
  }
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
  confirmDelete = (roommates) => {
    this.asyncForEach(roommates, async (user) => {
      await ApiClient.home.removeRoommate(user, this.data.houseId)})
  }

}
