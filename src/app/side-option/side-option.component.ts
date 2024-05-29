import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-option',
  templateUrl: './side-option.component.html',
  styleUrl: './side-option.component.css'
})
export class SideOptionComponent {
logout() {
throw new Error('Method not implemented.');
}
  arrtran=[1,2,3,4]
  constructor(private router:Router){}

onprev() {
throw new Error('Method not implemented.');
}
onProfile() {
throw new Error('Method not implemented.');
}
ondashboard() {
throw new Error('Method not implemented.');
}
  isSlideOut=false
toggleslide():void {
  this.isSlideOut = !this.isSlideOut;
  console.log(this.isSlideOut)


}


}
