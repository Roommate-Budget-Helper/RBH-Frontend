import { Component, OnInit, createPlatformFactory } from '@angular/core';
import ApiClient from '../api-client';
import * as sha256 from 'sha256';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
    options: any;
    registerForm: FormGroup;
    formErrors = {
        username: '',
        email: '',
        password: '',
        repassword: ''
    };
    constructor(private dialogRef: MatDialogRef<RegisterPageComponent>, private fb: FormBuilder, private router: Router) {
        this.createForm();
        this.options = { email: '', username: '', password: '', repassword: '' };
    }

    checkPasswords(group: FormGroup) {
        let pass = group.get('password').value;
        let confirmPass = group.get('repassword').value;

        return pass === confirmPass ? null : { notSame: true };
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
                repassword: ['', [Validators.required]],
                email: ['', [Validators.email, Validators.required]]
            },
            { validator: this.checkPasswords }
        );
    }

    ngOnInit() {}

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
        result.isRegistered == false ? alert('user exists') : alert('register succeed');
        this.dialogRef.close();
    };
}
