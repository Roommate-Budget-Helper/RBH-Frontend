import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogRef} from '@angular/material';
import { By } from "@angular/platform-browser";
import ApiClient from '../api-client';
import { of} from 'rxjs';

let sampleStorage = {userInfo: {id: 111111,
    full_name: "full_name",
    balance: 0,
    userName: "username",
    hashedPassword: "hashedPass",
    email: "some@gmail.com"},
    token:"some-token"};

let sampleGetHome = [{id: 0, full_name: "home0", admin_name: "admin_name0", admin_id: 0, roommates: "roommates0"},
{id: 1, full_name: "home1", admin_name: "admin_name1", admin_id: 1, roommates: "roommates1"}];
let sampleInvitation = [{id: 0, userName: "user0", houseName: "home0", userId:0,houseId: 0,created_at: new Date().getDate()},
{id: 1, userName: "user1", houseName: "home1", userId:1,houseId: 1,created_at: new Date().getDate()}]
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
// const storageSpy = jasmine.createSpyObj('StorageServiceService', ['storeOnLocalStorage', 'getLocalStorage', 'storeHomeOnLocalStorage', 'getHomeLocalStorage']);


export class MdDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open(){
    return {
      afterClosed: () => of(),
      updatePosition: () => {}
    }
  };
};

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let storage;
//   const STORAGE_KEY = "local_userInfo";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Router,   useValue: routerSpy }, 
        StorageServiceService,
        { provide: MatDialog,   useValue: MdDialogMock},
        { provide: MatDialogRef,   useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    component.user = sampleStorage.userInfo;
    component.username = component.user.userName;
    storage = fixture.debugElement.injector.get(StorageServiceService);
    fixture.detectChanges();
    spyOnProperty(ApiClient, 'home').and.returnValue({ getHome: () => Promise.resolve(sampleGetHome)});
    spyOnProperty(ApiClient, 'invitation').and.returnValue({getInvitation: (uid) => Promise.resolve(sampleInvitation)});
  });
  describe('Basic Tests', () => {
    it('should create', () => {
      console.info("dialog is "+ component.dialog.open)
        expect(component).toBeTruthy();
    });

    it('should show correct user info', () => {
      const greeting = fixture.debugElement.query(By.css('.home-page-user-info p')).nativeElement;
      expect(greeting.textContent).toContain(component.username);
    });

    it('should call ApiClient.home.getHome when init', () => {
      spyOn(ApiClient.home, 'getHome');
      fixture = TestBed.createComponent(HomePageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(ApiClient.home.getHome).toHaveBeenCalled();
    });

    it('should call handleInvitation when init', () => {
      spyOnProperty(ApiClient, 'home').and.returnValue({ getHome: () => Promise.resolve(sampleGetHome)});
      spyOnProperty(ApiClient, 'invitation').and.returnValue({getInvitation: (uid) => Promise.resolve(sampleInvitation)});
      console.info(component.invitations+"++++++++++++++++++++++++++")
      expect(component.invitations).toBe(sampleInvitation);
    });


    //to be continued;
    //   it("should store token to local storage if result is not empty", ()=>{
    //     spyOnProperty(ApiClient, 'auth').and.returnValue({ login: () => Promise.resolve(sampleCorrect)})
    //     let storage = fixture.debugElement.injector.get(StorageServiceService);
    //     component.options['username'] = username;
    //     component.options['password'] = password;
    //     component.handleSubmit();
    //     const STORAGE_KEY = "local_userInfo";
    //     expect(storage.getLocalStorage(STORAGE_KEY)).toEqual(sampleCorrect);
    //   });
  });
});
