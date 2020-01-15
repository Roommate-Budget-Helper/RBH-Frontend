import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillRecurringPageComponent } from './create-bill-recurring-page.component';

describe('CreateBillRecurringPageComponent', () => {
  let component: CreateBillRecurringPageComponent;
  let fixture: ComponentFixture<CreateBillRecurringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBillRecurringPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBillRecurringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
