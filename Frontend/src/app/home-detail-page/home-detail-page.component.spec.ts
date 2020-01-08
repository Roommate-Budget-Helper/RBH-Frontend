import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetailPageComponent } from './home-detail-page.component';

describe('HomeDetailPageComponent', () => {
  let component: HomeDetailPageComponent;
  let fixture: ComponentFixture<HomeDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDetailPageComponent ]
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
