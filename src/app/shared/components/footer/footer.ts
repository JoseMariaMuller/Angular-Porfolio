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
    { name: 'GitHub', url: 'https://github.com/JoseMariaMuller', icon: 'devicon-github-original' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jose-maria-muller-full-stack-dev', icon: 'devicon-linkedin-plain colored' },
  ];
}