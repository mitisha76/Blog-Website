import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/validaters';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  result: any;
  alert: String;
  validate: Boolean;
  registerForm: FormGroup;
  submitted = false;
  uname; pass; fname; lname; email;description;

  constructor(private _activatedroute: ActivatedRoute, private userservice: UserServiceService, private router: Router,private formBuilder: FormBuilder) {
    this.userservice.getUsers().subscribe(res => {
      this.result = res;
      console.log(this.result);
    });
  }

  change(e) {
    for (let i = 0; i < this.result.length; i++) {
      console.log(this.result[i].username);

      if (this.result[i].username == e) {
        this.alert = "username already exist";
        this.validate = true;

        break;
      }

      else {
        this.alert = "";
        this.validate = false;
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    else{
  alert("register successful");
  const user = {
    active: 1,
    description:this.description,
    email: this.email,
    firstname: this.fname,
    followers:[],
    following:[],
    lastname: this.lname,
    password: this.pass,
    status:"private",
    username: this.uname,
    role:"user"

  };
  console.log(user);
  this.userservice.adduser(user);
}
  }

get f() { return this.registerForm.controls; }


ngOnInit() {

  this.registerForm = this.formBuilder.group({
    username: ['', [Validators.required,Validators.minLength(6)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    description:['', [Validators.required,Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
}, {
    validator: MustMatch('password', 'confirmPassword')
});


}

}
