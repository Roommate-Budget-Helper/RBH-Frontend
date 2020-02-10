import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogRef} from '@angular/material';
import ApiClient from '../api-client';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const storageSpy = jasmine.createSpyObj('StorageServiceService', ['storeOnLocalStorage', 'getLocalStorage', 'storeHomeOnLocalStorage', 'getHomeLocalStorage']);
describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  const STORAGE_KEY = "local_userInfo";
  let sampleStorage = {userInfo: {id: 111111,
    full_name: "full_name",
    balance: 0,
    userName: "username",
    hashedPassword: "hashedPass",
    email: "some@gmail.com"},
    token:"some-token"};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Router,   useValue: routerSpy }, 
        { provide: StorageServiceService,   useValue: storageSpy},
        { provide: MatDialog,   useValue: {} },
        { provide: MatDialogRef,   useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('Basic Tests', () => {
    it('should create', () => {
        expect(component).toBeTruthy();
      });
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
