import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillOneTimePageComponent } from './create-bill-one-time-page.component';

describe('CreateBillOneTimePageComponent', () => {
    let component: CreateBillOneTimePageComponent;
    let fixture: ComponentFixture<CreateBillOneTimePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateBillOneTimePageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateBillOneTimePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
