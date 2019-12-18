import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import * as jwt from 'jsonwebtoken';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import ApiClient from '../api-client';

const STORAGE_KEY = 'local_userInfo';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    name: string;
    homes;

    constructor(private router: Router, private StorageService: StorageServiceService) {}

    // user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
    // username = this.user.full_name;

    async ngOnInit() {
        // console.info(this.user.id);
        // this.homes = await ApiClient.home.getHome(this.user.id);
    }

    handleAddhome = () => {
        const token = this.StorageService.getLocalStorage(STORAGE_KEY).token;
        jwt.verify(token, 'abcde', async (err, decode) => {
            if (err) {
                console.log(err);
                alert('your session has expired. Please log in again.');
                this.router.navigateByUrl('/login');
            } else {
                this.router.navigateByUrl('/createhome');
            }
        });
    };
}
