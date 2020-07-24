import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/validaters';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  
  result;
  constructor(private router:Router,private httpservice:UserServiceService,private http:HttpClient,private formBuilder: FormBuilder) { }
uname;lname;fname;email;pass;
alert: String;
validate: Boolean;
registerForm: FormGroup;
submitted = false;
  ngOnInit() {
    this.profile();
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description:['', [Validators.required,Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
  
  });
  }

  profile(){
    this.httpservice.getinfo().subscribe(res=>{
      this.result=res;
      console.log(this.result);
      
    });
  }
  

  get f() { return this.registerForm.controls; }

  
url="http://localhost:8090/profile/update";  
onSubmit() {
  this.submitted = true;
  if (this.registerForm.invalid) {
      return;
  }
  else{
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.put(this.url,this.result,{headers}).subscribe(data=>{
      console.log(data);
      sessionStorage.setItem('token',btoa(this.result.username+':' + this.result.password));
      alert("profile updated");
    });
  }
}
}
