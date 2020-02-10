import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogRef} from '@angular/material';
import ApiClient from '../api-client';
let sampleStorage = {userInfo: {id: 111111,
    full_name: "full_name",
    balance: 0,
    userName: "username",
    hashedPassword: "hashedPass",
    email: "some@gmail.com"},
    token:"some-token"};
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
// const storageSpy = jasmine.createSpyObj('StorageServiceService', ['storeOnLocalStorage', 'getLocalStorage', 'storeHomeOnLocalStorage', 'getHomeLocalStorage']);
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
        // { provide: StorageServiceService,   useValue: storageSpy},
        StorageServiceService,
        { provide: MatDialog,   useValue: {} },
        { provide: MatDialogRef,   useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    storage = fixture.debugElement.injector.get(StorageServiceService);
    component.user = sampleStorage.userInfo;
    component.username = sampleStorage.userInfo.userName;
    fixture.detectChanges();
  });
  describe('Basic Tests', () => {
    it('should create', () => {
        console.info(component.user.userInfo+"++++++++");
        expect(component).toBeTruthy();
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
