import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes, AppModule } from './app.module';
import { StartingPageComponent } from './starting-page/starting-page.component';

// import { tick } from '@angular/core/src/render3';
import { Location } from '@angular/common';
describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Roommate-Budget-Helper'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Roommate-Budget-Helper');
    });

    // it('should render title in a h1 tag', () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h1').textContent).toContain('Welcome to Roommate-Budget-Helper!');
    // });
});

// describe("Test Routing: App", () => {
//     let location : Location;
//     let router:Router;
//     let fixture;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [RouterTestingModule.withRoutes(routes)]
//         })

//         router = TestBed.get(Router);
//         location = TestBed.get(Location);
//         fixture = TestBed.createComponent(AppComponent);
//         router.initialNavigation();
//     });

//     it(`navigate to "" redirects you to StartingPageComponent`, fakeAsync (() => {
//         router.navigate(['']);
//         tick();
//         expect(location.path()).toBe(StartingPageComponent);
//     }));
// });
