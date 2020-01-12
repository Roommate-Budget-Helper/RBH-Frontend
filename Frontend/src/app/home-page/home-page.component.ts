import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import * as jwt from 'jsonwebtoken';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import ApiClient from '../api-client';
import { InvitationDialogComponent } from '../invitation-dialog/invitation-dialog.component';

const STORAGE_KEY = 'local_userInfo';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    constructor(
        private router: Router,
        private StorageService: StorageServiceService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<any>
    ) {}
    homes;
    invitations;
    roommates;
    user = this.StorageService.getLocalStorage(STORAGE_KEY).userInfo;

    username = this.user.userName;

    async ngOnInit() {
        this.homes = await ApiClient.home.getHome(this.user.id);

        await this.handleInvitation();

        for (let invitation of this.invitations) {
            let thisDialogRef = this.dialog.open(InvitationDialogComponent, { data: { name: invitation.houseName } });
            thisDialogRef.updatePosition({ top: '1%', right: '1%' });
            thisDialogRef.afterClosed().subscribe(async (result) => {
                if (result == 'accept') {
                    this.handleAccpetInvitation(invitation.id);
                    this.homes = await ApiClient.home.getHome(this.user.id);
                } else {
                    this.handleDeclineInvitation(invitation.id);
                }
            });
        }
    }

    // getHomeByHomeId = async (homeId) => {
    //     let roommate_names = "";
    //     this.roommates = await ApiClient.home.getHomeDetail(homeId);
    //     for(let roommate of this.roommates){
    //         roommate_names = roommate_names.concat(roommate.userName+", ");
    //     }
    //     return roommate_names.substring(0, roommate_names.length-2);
    // }

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
    handleDirectToHome = (home) => {
        this.StorageService.storeHomeOnLocalStorage(home);
        this.router.navigateByUrl('/homedetail');
    };

    handleInvitation = async () => {
        this.invitations = await ApiClient.invitation.getInvitation(this.user.id);
    };

    handleAccpetInvitation = async (invitationId) => {
        await ApiClient.invitation.acceptInvitation(invitationId);
    };
    handleDeclineInvitation = async (invitationId) => {
        await ApiClient.invitation.declineInvitation(invitationId);
    };
}
