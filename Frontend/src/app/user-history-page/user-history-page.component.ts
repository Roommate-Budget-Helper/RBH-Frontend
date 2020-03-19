import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../storage-service.service';
import ApiClient from '../api-client';
const STORAGE_KEY = 'local_userInfo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-history-page',
  templateUrl: './user-history-page.component.html',
  styleUrls: ['./user-history-page.component.scss']
})
export class UserHistoryPageComponent implements OnInit {
  user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
  constructor(        private router: Router,
    private StorageService: StorageServiceService
    ) { }

  ngOnInit() {
  }

  handleBack = () => {
    this.router.navigateByUrl('/homedetail')
  }

}
