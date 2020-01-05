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
    homes;
    invitations;
    roommates;
    constructor(private router: Router, private StorageService: StorageServiceService) {


    }

    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;
    username = this.user.full_name;

    async ngOnInit() {
        // console.info(this.user.id);
        this.homes = await ApiClient.home.getHome(this.user.id);
        console.info(this.homes);  
        console.info(JSON.stringify(await this.getHomeByHomeId(16))); 
    }

    getHomeByHomeId = async (homeId) => {
        let roommate_names = "";
        this.roommates = await ApiClient.home.getHomeDetail(homeId);
        for(let roommate of this.roommates){
            roommate_names = roommate_names.concat(roommate.userName+", ");
        }
        return roommate_names.substring(0, roommate_names.length-2);
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
    handleDirectToHome = (homeId) => {
        this.StorageService.storeHomeOnLocalStorage(homeId);
        this.router.navigateByUrl('/homedetail');
    }

    handleInvitation = async () =>{
        this.invitations = await ApiClient.invitation.getInvitation(this.user.userId)
    }
}
    