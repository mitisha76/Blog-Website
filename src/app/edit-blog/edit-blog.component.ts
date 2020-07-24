import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
id;blogs;title;body;
  constructor(private route :ActivatedRoute,private httpservice:UserServiceService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap) => {
      this.id=params.get('id');
    });

    this.httpservice.getblog(this.id).subscribe(res=>{
      this.blogs=res;
      console.log("hsbcfhjf");
      console.log(this.blogs);
});


  }
  edit(){
    this.httpservice.editBlog(this.id,this.blogs)
//     .subscribe(res=>{
//       this.blogs=res;
//       console.log("updatesdxs datfd");
//       console.log(this.blogs);
//       alert("blog updated");
// });
alert("blog updated")
  }

}
