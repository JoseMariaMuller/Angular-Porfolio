import { Component, signal, ElementRef, inject, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private el = inject(ElementRef<HTMLElement>);

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isMenuOpen()) return;

    const clickedInside = this.el.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      this.closeMenu();
    }
  }
}