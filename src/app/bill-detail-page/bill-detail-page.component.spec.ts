import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailPageComponent } from './bill-detail-page.component';

describe('BillDetailPageComponent', () => {
    let component: BillDetailPageComponent;
    let fixture: ComponentFixture<BillDetailPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BillDetailPageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BillDetailPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
