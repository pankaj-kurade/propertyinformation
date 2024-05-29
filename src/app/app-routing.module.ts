import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyFormComponent } from './property-form/property-form.component';
import { PropertyInfoComponent } from './property-info/property-info.component';

const routes: Routes = [
  {
    path:'property-form',component:PropertyFormComponent
  },{
    path:'property-info',component:PropertyInfoComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
