import { Component, OnInit, createPlatformFactory } from '@angular/core';
import ApiClient from '../api-client';
import * as sha256 from 'sha256';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { StorageServiceService } from '../storage-service.service';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
    
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid&&control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
        return (invalidCtrl||invalidParent);
    }
  }

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
    options: any;
    registerForm: FormGroup;
    matcher= new MyErrorStateMatcher();

    constructor(private fb: FormBuilder, private router: Router, private StorageService: StorageServiceService) {
        

        this.createForm();
        this.options = { email: '', username: '', password: '', repassword: '' };
    }
    
    checkPasswords(group: FormGroup) {
        let pass:string = group.get('password').value;
        let confirmPass = group.get('repassword').value;
// console.info(pass == confirmPass, pass, confirmPass, confirmPass!=null)
        if(pass == confirmPass){
         return null }
         else{ 
             return { notSame: true } };
    }
    

    createForm() {
        this.registerForm = this.fb.group(
            {
                username: [
                    '',
                    [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9_@!?-]{1,30}$')]
                ],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(50),
                        Validators.pattern('^[a-zA-Z0-9_@!?-]{1,100}$')
                    ]
                ],
                repassword: [''],
                email: ['', [Validators.email, Validators.required]]
            },
            { validator: this.checkPasswords }
        );
    }



    handleBack = () => {
        this.router.navigateByUrl('/');
    };

    handleSubmit = async () => {
        // let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //     if(!this.options.email.match(mailformat)){
        //         alert("Please enter a correct email address");
        //         return;
        //     }
        console.log(this.registerForm.value);
        this.options = this.registerForm.value;
        const result = await ApiClient.auth.register(this.options.username, sha256(this.options.password), this.options.email);
        console.info(result)
        result.isRegistered == false ? alert('user exists') : this.handleRedirect();
        
    };

    handleRedirect = async () =>{
        const result = await ApiClient.auth.login(this.options.username, sha256(this.options.password));
        this.StorageService.storeOnLocalStorage(result);
        console.info(result)
        _.isEmpty(result.userInfo) ? alert('wrong credential combination') : this.router.navigateByUrl('/home');
            
        this.router.navigateByUrl("/home")
    }
}
