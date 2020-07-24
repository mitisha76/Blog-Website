import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
 date=new Date();
 title;body;result;posts;value;blogSearch;status="private";search;


  constructor(private blogservice:UserServiceService,private router:Router) { }

  ngOnInit() {

    // this.router.navigate(['login']);
  if(window.localStorage.getItem('username')==null || window.localStorage.getItem('username')=="")
    {
     this.router.navigate(['login']);

   }
  else{
    this.blogservice.getinfo().subscribe(res=>{
      this.result=res;
      console.log(this.result);

    });

    this.blogservice.getposts().subscribe(res=>{
      this.posts=res;
      console.log(this.posts);
    });
  }

  }


  post(){
    console.log(this.status);
  alert("posted");
  const blog = {
    username:window.localStorage.getItem('username'),
    password:window.localStorage.getItem('password'),
    body:this.body,
    title: this.title,
    create_date: this.date,
    status:this.status

  };
  this.blogservice.addblog(blog).subscribe(res=>{
    console.log('added to database');
    console.log(res);


  })
  this.body="";
    this.title="";
  }

  logout(){
    window.localStorage.setItem("username","");
    window.localStorage.setItem("password","");
  this.blogservice.isLoggedIn(false);
  this.router.navigate(['login']);
  }

  view(id){
    this.router.navigate(['blog/',id]);
  }

  unfollow(id){
    this.blogservice.unfollow(id).subscribe(res=>{
      this.router.navigate(['']);
    });
  }

  searchUser(key){
    if(key){
    this.blogservice.search(key).subscribe(res=>{
      this.search=res;
      console.log(res);
    })
  }
  else{
    this.search=[];
  }
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

  userprofile(id){
    this.router.navigate(['people/',id]);
  }
  }
