import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageServiceService } from '../storage-service.service';
import { PaymentHistoryPageComponent } from './payment-history-page.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
let sampleStorage = {
    userInfo: {
        id: 111111,
        full_name: 'full_name',
        balance: 0,
        userName: 'username',
        hashedPassword: 'hashedPass',
        email: 'some@gmail.com'
    },
    token: 'some-token'
};

let sampleGetHome = [
    { id: 0, full_name: 'home0', admin_name: 'admin_name0', admin_id: 0, roommates: 'roommates0 ' },
    { id: 1, full_name: 'home1', admin_name: 'admin_name1', admin_id: 1, roommates: 'roommates1' }
];

describe('PaymentHistoryPageComponent', () => {
    let component: PaymentHistoryPageComponent;
    let fixture: ComponentFixture<PaymentHistoryPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentHistoryPageComponent],
            providers: [{ provide: Router, useValue: routerSpy }, StorageServiceService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentHistoryPageComponent);
        component = fixture.componentInstance;
        component.user = sampleStorage.userInfo;
        component.home = sampleGetHome[0];
        component.roommates = sampleGetHome[0].roommates;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show correct user info', () => {
        const greeting = fixture.debugElement.query(By.css('.payment-history__header-user p')).nativeElement;
        expect(greeting.textContent).toContain(component.user.userName);
    });
    it('should create back button', () => {
        let backButton = fixture.debugElement.queryAll(By.css('.home-detail-page-back-arrow'));
        expect(backButton).toBeTruthy();
    });

    it('should create user Icon', () => {
        let userIcon = fixture.debugElement.queryAll(By.css('.home-detail-page-user-icon'));
        expect(userIcon).toBeTruthy();
    });

    it('should create correct header', () => {
        let header = fixture.debugElement.nativeElement.querySelector('h2');
        expect(header).toBeTruthy();
        expect(header.textContent).toContain('Summary');
    });

    it('should be able to go back', () => {
        component.handleBack();
        fixture.whenStable().then(() => {
            const navArgs = routerSpy.calls.mostRecent().args[0];
            expect(navArgs).toBe('/homedetail');
        });
    });

    it('should have a current roommate section', () => {
        let header = fixture.debugElement.nativeElement.querySelector('h3');

        expect(header).toBeTruthy();
        expect(header.textContent).toContain('Current Roommates');
    });

    it('should include all roommates in current roommate section', () => {
        let header = fixture.debugElement.nativeElement.querySelector('h4');

        expect(header).toBeTruthy();
        expect(header.textContent).toContain(sampleGetHome[0].roommates);
    });

    it('should mark owner in current roommate section', () => {
        let header = fixture.debugElement.nativeElement.querySelector('h4');

        expect(header).toBeTruthy();
        expect(header.textContent).toContain('(owner)');
    });

    it('should have a balance Section', () => {
        let header = fixture.debugElement.queryAll(By.css('.summary__all'));

        expect(header[0].nativeElement.querySelector('h3')).toBeTruthy();
        expect(header[0].nativeElement.querySelector('h3').textContent).toContain('Balance');
    });
});
