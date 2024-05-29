import { Component } from '@angular/core';

@Component({
  selector: 'app-prop',
  templateUrl: './prop.component.html',
  styleUrl: './prop.component.css'
})
export class PropComponent {
continue() {
throw new Error('Method not implemented.');
}
onChange($event: Event) {
throw new Error('Method not implemented.');
}
// propertyAddressForm: FormGroup<any>;
onSubmit() {
throw new Error('Method not implemented.');
}
selectedOption: string = '';
  selectedCountryServices: any = {};

totalAmount:any = 0;
selectedServices: any = {};

onSelectionChange(event: any): void {
  const selectedCountry = this.countries.find(country => country.name === event.value);
  this.selectedCountryServices = selectedCountry ? selectedCountry.services : {};
  this.totalAmount = 0;  // Reset the total amount whenever a new country is selected
  this.selectedServices = {};  // Reset selected services
}

onCheckboxChange(service: string, event: any): void {
  if (event.target.checked) {
    this.selectedServices[service] = this.selectedCountryServices[service];
  } else {
    delete this.selectedServices[service];
  }
  this.calculateTotalAmount();
}

calculateTotalAmount(): void {
  var total = 0;
  var t:any;
  for (let value of Object.values(this.selectedServices)) {
    // total += value;
    t = value;

    total=total+t

  }
  console.log(total);
  this.totalAmount = total;
}

obj={}
countries = [
  {
    name: 'India',
    services: {
      currentOwner: 85,
      twoOwnerSearch: 110,
      fullSearch: 150,
      documentRetrieval: 40
    }
  },
  {
    name: 'Dubai',
    services: {
      currentOwner: 80,
      twoOwnerSearch: 100,
      fullSearch: 140,
      documentRetrieval: 35
    }
  }]





}
