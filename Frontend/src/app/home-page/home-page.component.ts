import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service'
import　* as jwt from 'jsonwebtoken'

const STORAGE_KEY = "local_userInfo"

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router, private StorageService: StorageServiceService) { }
  user = this.StorageService.getLocalStorage(STORAGE_KEY).userName;

  ngOnInit() {
  }

  handleAddhome = () => {
    const token = this.StorageService.getLocalStorage(STORAGE_KEY).token;
    jwt.verify(token, "abcde", async (err, decode) =>{
      if(err){
        console.log(err)
      }else{
        this.router.navigateByUrl('/createhome');
      }
    })
  }
}


