import { Directive, ElementRef, AfterViewInit, OnDestroy, inject, input } from '@angular/core';
import { animate } from 'animejs';

@Directive({
  selector: '[appFadeInView]'
})
export class FadeInView implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  // Permite retrasar la animación de algunos elementos respecto a otros (para efecto escalonado)
  delay = input(0);

  ngAfterViewInit() {
    const target = this.el.nativeElement;

    // Estado inicial: invisible y un poco abajo, ANTES de que el observer dispare
    target.style.opacity = '0';
    target.style.transform = 'translateY(30px)';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animate(target, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 700,
              delay: this.delay(),
              easing: 'easeOutExpo',
            });
            this.observer?.unobserve(target);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observer.observe(target);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}