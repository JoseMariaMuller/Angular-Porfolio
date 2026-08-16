import { Component, input } from '@angular/core';

@Component({
  selector: 'app-wave-divider',
  imports: [],
  templateUrl: './wave-divider.html',
  styleUrl: './wave-divider.css'
})
export class WaveDivider {
  flip = input(false); // para alternar el lado de la asimetría
}