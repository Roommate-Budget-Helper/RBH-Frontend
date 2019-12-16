import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service'
import　* as jwt from 'jsonwebtoken'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

const STORAGE_KEY = "local_userInfo"



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  name: string
  numberOfRoommate:number
  roommates: []

  constructor(private router: Router, private StorageService: StorageServiceService) { }
  user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo.full_name;

  ngOnInit() {
  }

  handleAddhome = () => {
    const token = this.StorageService.getLocalStorage(STORAGE_KEY).token;
    jwt.verify(token, "abcde", async (err, decode) =>{
      if(err){
        console.log(err)
      }else{
        this.router.navigateByUrl("/createhome")
      }
    })
  }
}



