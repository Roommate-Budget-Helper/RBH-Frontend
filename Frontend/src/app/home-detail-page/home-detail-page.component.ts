import { Component, OnInit } from '@angular/core';
import ApiClient from '../api-client';
import { StorageServiceService } from '../storage-service.service';
import { Router } from '@angular/router';
const HOME_STORAGE_KEY = "local_homeId";
const STORAGE_KEY = 'local_userInfo';
@Component({
  selector: 'app-home-detail-page',
  templateUrl: './home-detail-page.component.html',
  styleUrls: ['./home-detail-page.component.scss']
})

export class HomeDetailPageComponent implements OnInit {
  home;
  constructor(private router: Router, private StorageService: StorageServiceService) {
  }
  // user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
  // username = this.user.full_name;

  async ngOnInit() {
  //   this.home = await ApiClient.home.getHomeDetail(this.StorageService.getHomeLocalStorage(HOME_STORAGE_KEY));
  }

  handleBack = () => {
    this.router.navigateByUrl('/home');
};

}
