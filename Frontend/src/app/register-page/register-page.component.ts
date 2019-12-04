import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  options: any;
  constructor() { this.options = { email:'', username: '', password: '', repassword:'' }}

  ngOnInit() {
  }



}
