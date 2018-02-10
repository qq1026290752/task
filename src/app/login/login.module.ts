import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule} from './login-routing.module';
@NgModule({
  imports: [ 
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [RegisterComponent, LoginComponent]
})
export class LoginModule { }
