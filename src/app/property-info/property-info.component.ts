import { Component } from '@angular/core';

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrl: './property-info.component.css'
})
export class PropertyInfoComponent {
  submitForm() {
    console.log("Form submitted!");
  }

}
