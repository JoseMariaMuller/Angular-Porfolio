import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.css'
})
export class Logo {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}