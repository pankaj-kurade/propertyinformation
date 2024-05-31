import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prop',
  templateUrl: './prop.component.html',
  styleUrl: './prop.component.css'
})
export class PropComponent   {
  toggleDropdown(): void {
    const dropdownToggle: HTMLElement | null = document.querySelector('.dropdown-toggle');
    const dropdownMenu: HTMLElement | null = document.querySelector('#dropdown > .menu');

    dropdownMenu?.classList.toggle('open');
    dropdownToggle?.classList.toggle('open');
  }
}
