import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingPageComponent } from './starting-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('StartingPageComponent', () => {
    let component: StartingPageComponent;
    let fixture: ComponentFixture<StartingPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [StartingPageComponent],
            // providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StartingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
