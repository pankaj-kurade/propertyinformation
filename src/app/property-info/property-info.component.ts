import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrl: './property-info.component.css',
})
export class PropertyInfoComponent implements OnInit {
  generatePDF() {
    let data = `
      Country: ${this.receivedData[0].country}\n
      Parcel: ${this.receivedData[0].additionalInformation.parcel}\n
      Owner Name: ${this.receivedData[0].additionalInformation.ownerName}\n
      Additional Info: ${this.receivedData[0].additionalInformation.additionalInfo}\n
      Total: ${this.receivedData[1]}\n
      address ${this.receivedData[0].propertyAddress.address}\n
      City ${this.receivedData[0].propertyAddress.city}\n
      country ${this.receivedData[0].propertyAddress.country}\n
      state ${this.receivedData[0].propertyAddress.state}\n
      street ${this.receivedData[0].propertyAddress.street}\n
      zipCode ${this.receivedData[0].propertyAddress.zipCode}\n

      }
    `;
    data += '\nSelected Services:\n';

    this.receivedData[2].forEach((item: { service: any; cost: any; }, index: number) => {
        data += `${index + 1} ${item.service}  Cost= ${item.cost}\n`;

    });



    const doc = new jsPDF();
    doc.text(data, 10, 10);
    doc.save('property-details.pdf');
  }
  receivedData: any;
  serviceobj = [];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.data$.subscribe((data) => {
      this.receivedData = data;
    });
    console.log(this.receivedData, 'recivedtta');

    for (let i = 0; i < this.receivedData[2].length; i++) {
      if (this.receivedData[0].services.value) {
        console.log(this.receivedData[0].services.value);
      }
    }
  }

  submitForm() {
    console.log('Form submitted!');
  }

  backTohomePge() {
    this.router.navigate(['./property-form']);
    // this.router.navigate(['./property-info']);
  }
}
