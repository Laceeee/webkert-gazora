import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    /*if (this.email.value === 'test@gmail.com' && this.password.value === 'testpw') {
      this.router.navigateByUrl('/main');
    } else {
      console.error('Incorrect email or password!')
    }*/

    this.authService.login(this.email.value, this.password.value).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/main');
    }).catch(error => {
      console.error(error);
    })
  }

  

}
