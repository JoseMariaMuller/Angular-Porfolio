import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  currentYear = new Date().getFullYear();

  socials = [
    { name: 'GitHub', url: 'https://github.com/tu-usuario', icon: 'devicon-github-original' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/tu-usuario', icon: 'devicon-linkedin-plain colored' },
  ];
}