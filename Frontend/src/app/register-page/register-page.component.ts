import { Component, OnInit } from '@angular/core';
import ApiClient from '../api-client';
import * as sha256 from 'sha256';
import * as _ from "lodash";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  options: any;
  constructor(private router: Router) { this.options = { email:'', username: '', password: '', repassword:'' }}

  ngOnInit() {
  }

  handleBack = () => {
    this.router.navigateByUrl('/');
  };

  handleSubmit = async () => {
    const result = await ApiClient.auth.register(this.options.username, sha256(this.options.password),this.options.email);
    result.isRegistered == false ? alert('user exists') : alert('register succeed');
  };

}
