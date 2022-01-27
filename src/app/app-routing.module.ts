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
//import { TermsComponent } from './terms/terms.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit', component: EditComponent },
  { path: 'cazari', component: CazareComponent },
  { path: 'atractii', component: AtractieComponent},
  { path: 'login', component: LoginComponent },
  { path: 'restaurante', component: RestaurantComponent},
  { path: 'contact', component: ContactComponent },
  //{ path: 'terms', component: TermsComponent },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
