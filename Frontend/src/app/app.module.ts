import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: LoginPageComponent }
            //{ path: 'products/:productId', component: ProductDetailsComponent },
        ])
    ],
    declarations: [AppComponent, LoginPageComponent],
    // providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
