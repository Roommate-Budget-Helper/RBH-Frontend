import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeDetailPageComponent } from './home-detail-page.component';
import { StorageServiceService } from '../storage-service.service';
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
describe('HomeDetailPageComponent', () => {
  let component: HomeDetailPageComponent;
  let fixture: ComponentFixture<HomeDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDetailPageComponent ],
      providers: [{ provide: Router, useValue: routerSpy },
        StorageServiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
