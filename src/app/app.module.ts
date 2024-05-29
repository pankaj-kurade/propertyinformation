import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { PropertyFormComponent } from './property-form/property-form.component';
import { PropComponent } from './prop/prop.component';
import { SideOptionComponent } from './side-option/side-option.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

import { FormsModule } from '@angular/forms';
import { PropertyInfoComponent } from './property-info/property-info.component';
@NgModule({
  declarations: [
    AppComponent,
    PropertyFormComponent,
    PropComponent,
    SideOptionComponent,
    PropertyInfoComponent
  ],
  imports: [
    BrowserModule,MatIconModule,FormsModule,
    AppRoutingModule,ReactiveFormsModule,MatInputModule,MatSelectModule,MatCheckboxModule,MatFormFieldModule,MatOptionModule




  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
