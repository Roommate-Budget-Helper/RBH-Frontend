import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss']
})
export class InvitationDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
  ngOnInit() {

  }

}
