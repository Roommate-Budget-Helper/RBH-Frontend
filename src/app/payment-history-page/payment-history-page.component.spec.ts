import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryPageComponent } from './payment-history-page.component';

describe('PaymentHistoryPageComponent', () => {
  let component: PaymentHistoryPageComponent;
  let fixture: ComponentFixture<PaymentHistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHistoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
