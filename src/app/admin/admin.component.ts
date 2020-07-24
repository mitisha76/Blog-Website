import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  posts;
  constructor(private blogservice:UserServiceService,private router:Router) { }

  ngOnInit() {
    this.blogservice.getposts().subscribe(res=>{
      this.posts=res;
      console.log(this.posts);
    });
  }

  delete(id){
    this.blogservice.deleteblog(id).subscribe(res=>{
      this.posts=res;
      console.log(this.posts);
    })
  }
 view(id){
   this.router.navigate(['/blog/',id]);
 }

 searchblog(key){
  if(key){
  this.blogservice.searchblog(key).subscribe(res=>{
    this.posts=res;
    console.log(res);
  })
}
else{
  this.ngOnInit();
}
}

logout(){
  sessionStorage.removeItem('token');
this.blogservice.isLoggedIn(false);
this.router.navigate(['login']);
}

}
