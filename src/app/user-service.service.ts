import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient ,private router:Router) {
   }
  getUsers()
  {
    var x= this.http.get("http://localhost:8090/getUsers");

    console.log(x);
    return x;
  }

  adduser(user){
    console.log(user);
    return this.http.post("http://localhost:8090/addUsers",user).subscribe(res=>
    this.router.navigate(['login']));
  }

  // authenticate(username,password)
  // {
  //   const headers=new HttpHeaders({Authorization: 'Basic ' + btoa(username+':'+password)});
  //   return this.http.get('http://localhost:8090/validateUser',{headers}).pipe(
  //     map(data => {
  //         sessionStorage.setItem('token',btoa(username+':' + password));
  //         return data;
  //       }

  //     ));
  // }
  auth(username,password)
  {
    var data={"user":username,"pass":password};
    console.log(username+password);
    console.log(data);
    this.http.post('http://localhost:8090/validateUser',data).subscribe(res=>{
      console.log(res);
      if(res=="0"){
        this.router.navigate(['register']);
      }
      else{
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("password", password);

        this.router.navigate(['/']);
      }
    }

    );
  }

  isLoggedIn(bool:boolean)
  {
    sessionStorage.setItem('auth',String(bool));
    return bool;
  }

  authentication(username: any, password: any) {
    throw new Error("Method not implemented.");
  }

  getinfo()
  {
    var u=window.localStorage.getItem("username");
    var p=window.localStorage.getItem("password");
    var x={"user":u,"pass":p};
    return this.http.post("http://localhost:8090/profile/get",x);
  }

  getmyblogs()
  {
    var u=window.localStorage.getItem("username");
    var p=window.localStorage.getItem("password");
    var x={"user":u,"pass":p};
    return this.http.post("http://localhost:8090/profile/getMyBlogs",x);
  }


  getblog(id)
  {
    var x={"id":id};
    return this.http.post("http://localhost:8090/myblogs/getblogById",x);
  }

  editBlog(id,result)
  {
    console.log(result);
    var x={"id":id,"result":result};
    return this.http.post("http://localhost:8090/myblogs/update",x);
  }

  deleteblog(id){
    var x={"id":id};
    return this.http.post("http://localhost:8090/deleteblog",x);
  }

  addblog(blog){
    // const token=sessionStorage.getItem("token");
    // const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.post("http://localhost:8090/addblog",blog);
  }

  getcomments(id){
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.get("http://localhost:8090/comments/getbyblog/"+id,{headers});
  }

  addcomment(id,data){
    console.log(data);
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.post("http://localhost:8090/comments/addcomment/"+id,data,{headers});
  }

  deletecomment(id){
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.get("http://localhost:8090/comments/deletecomment/"+id,{headers});
  }

  getposts(){
    // const token=sessionStorage.getItem("token");
    // const headers=new HttpHeaders({Authorization:'Basic '+token});
    console.log("api called");
    return this.http.get("http://localhost:8090/profile/getblogsofpublic");
  }

  unfollow(id){
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.get("http://localhost:8090/profile/unfollow/"+id,{headers});
  }

  follow(id){
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.get("http://localhost:8090/profile/follow/"+id,{headers});
  }

  remove(id){
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.get("http://localhost:8090/profile/deletefollowing/"+id,{headers});
  }

  getfollowers(){
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.get("http://localhost:8090/profile/getfollowers",{headers});
  }

  getfollowing(){
    const token=sessionStorage.getItem("token");
    const headers=new HttpHeaders({Authorization:'Basic '+token});
    return this.http.get("http://localhost:8090/profile/getfollowing",{headers});
  }

  search(key){
    var x={"key":key};
    return this.http.post("http://localhost:8090/profile/search",x);
  }

  searchblog(key){
    var x={"key":key};
    return this.http.post("http://localhost:8090/myblogs/search",x);
  }

  getprofile(key){
    var x={"key":key};
    return this.http.post("http://localhost:8090/profile/getuser",x);
  }

}
