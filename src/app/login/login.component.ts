import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  result:any;


  username;password;
  constructor(private userservice:UserServiceService,private router:Router) { }
  data;
    login(){
      console.log(this.username+this.password);
      if(this.username && this.password){
        var x;
        x=this.userservice.auth(this.username,this.password);
        console.log(x);

        // this.userservice.authenticate(this.username,this.password).subscribe(
        //   data=>
        //   {
        //     this.userservice.isLoggedIn(true);
        //     this.userservice.getinfo().subscribe(res=>{
        //       this.data=res;
        //       if(this.data.role=="moderator"){
        //         this.router.navigate(['admin']);
        //       }
        //       else{
        //         this.router.navigate(['']);
        //       }
        //     })
        //   }
        // );
         }
         else{
          //  alert("fields can not be null");
         }
    }


    signup(){
      this.router.navigate(['/register']);
    }
  ngOnInit() {
  }

}
