import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { CazareComponent } from './cazare/cazare.component';
import { AtractieComponent } from './atractie/atractie.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './shared/auth.guard';
//import { TermsComponent } from './terms/terms.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent , canActivate: [AuthGuard]},
  { path: 'edit', component: EditComponent , canActivate: [AuthGuard]},
  { path: 'cazari', component: CazareComponent, canActivate: [AuthGuard] },
  { path: 'atractii', component: AtractieComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'restaurante', component: RestaurantComponent, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  //{ path: 'terms', component: TermsComponent },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
