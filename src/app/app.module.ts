import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { BlogComponent } from './blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { OrderByPipe } from './order-by.pipe';
import { PeopleComponent } from './people/people.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    BlogComponent,
    ProfileComponent,
    EditProfileComponent,
    EditBlogComponent,
    OrderByPipe,
    PeopleComponent,
    AdminComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    

  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
