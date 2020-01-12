import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
@Component({
  selector: 'app-add-roommate-dialog',
  templateUrl: './add-roommate-dialog.component.html',
  styleUrls: ['./add-roommate-dialog.component.scss']
})
export class AddRoommateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

}
