import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrl: './property-info.component.css'
})
export class PropertyInfoComponent implements OnInit {
  generatePDF() {
    const data = `
      Country: ${this.receivedData[0].country}\n
      Parcel: ${this.receivedData[0].additionalInformation.parcel}\n
      Owner Name: ${this.receivedData[0].additionalInformation.ownerName}\n
      Additional Info: ${this.receivedData[0].additionalInformation.additionalInfo}\n
      Total: ${this.receivedData[1]}
    `;

    const doc = new jsPDF();
    doc.text(data, 10, 10);
    doc.save('property-details.pdf');
  }
  receivedData: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.receivedData = data;
    });
    console.log(this.receivedData,'recivedtta');

  }

  submitForm() {
    console.log("Form submitted!");
  }


}
