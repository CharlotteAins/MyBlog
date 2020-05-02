import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [`.error {color: crimson;}`]
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean = false;
  public message;

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = 'You don`t authorise';
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    if(!this.form.invalid) {
      this.submitted = true;

     const user: User = {
       email: this.form.value.email,
       password: this.form.value.password
     }

     this.authService.login(user).subscribe(() => {
       this.form.reset();
       this.router.navigate(['/admin', 'dashboard']);
       this.submitted = false;
     },error => {
       this.submitted = false;
     })
    }
  }

}
