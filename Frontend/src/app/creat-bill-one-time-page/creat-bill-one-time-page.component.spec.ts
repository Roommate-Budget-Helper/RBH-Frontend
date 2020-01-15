import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatBillOneTimePageComponent } from './creat-bill-one-time-page.component';

describe('CreatBillOneTimePageComponent', () => {
  let component: CreatBillOneTimePageComponent;
  let fixture: ComponentFixture<CreatBillOneTimePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatBillOneTimePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatBillOneTimePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
