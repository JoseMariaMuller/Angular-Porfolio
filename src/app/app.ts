import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { AnimatedBackground } from './shared/components/animated-background/animated-background';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, AnimatedBackground],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}