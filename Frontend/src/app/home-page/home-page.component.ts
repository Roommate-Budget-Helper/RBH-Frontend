import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service'

const STORAGE_KEY = "local_userInfo"

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router, private StorageService: StorageServiceService) { }
  user= this.StorageService.getLocalStorage(STORAGE_KEY).userName;

  ngOnInit() {
  }

  handleAddhome(){
    this.router.navigateByUrl('/createhome');
  }
}


