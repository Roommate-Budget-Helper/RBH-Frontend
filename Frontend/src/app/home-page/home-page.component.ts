import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service'
import　* as jwt from 'jsonwebtoken'
import { MatDialogRef } from '@angular/material';

const STORAGE_KEY = "local_userInfo"

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router, private StorageService: StorageServiceService, private dialogRef: MatDialogRef<HomePageComponent>) { }
  user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo.full_name;

  ngOnInit() {
  }

  handleAddhome = () => {
    const token = this.StorageService.getLocalStorage(STORAGE_KEY).token;
    jwt.verify(token, "abcde", async (err, decode) =>{
      if(err){
        console.log(err)
      }else{
        let dialogRef = dialog.open(UserProfileComponent, {
          height: '400px',
          width: '600px',
        });
      }
    })
  }
}


