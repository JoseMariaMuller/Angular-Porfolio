import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, signal } from '@angular/core';
import { animate, stagger } from 'animejs';

interface Line {
  prompt: string;
  text: string;
}

const SCRIPT: Line[] = [
  { prompt: '$', text: 'whoami' },
  { prompt: '>', text: 'José María Muller — Full Stack Developer' },
  { prompt: '$', text: 'cat stack.json' },
  { prompt: '', text: '{' },
  { prompt: '', text: '  "frontend": ["React", "Next.js", "Angular"],' },
  { prompt: '', text: '  "backend": ["Node", "Express", "Nest.js"],' },
  { prompt: '', text: '  "database": ["MongoDB", "PostgreSQL"],' },
  { prompt: '', text: '  "devops": ["Docker"]' },
  { prompt: '', text: '}' },
  { prompt: '$', text: 'echo "Construyendo software real, de punta a punta."' },
];

const PHOTO_REVEAL_AT_LINE = 5;

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('kicker') kickerRef!: ElementRef<HTMLElement>;
  @ViewChild('headline') headlineRef!: ElementRef<HTMLElement>;
  @ViewChild('subline') sublineRef!: ElementRef<HTMLElement>;
  @ViewChild('ctas') ctasRef!: ElementRef<HTMLElement>;
  @ViewChild('visual') visualRef!: ElementRef<HTMLElement>;

  renderedLines = signal<Line[]>([]);
  currentText = signal('');
  showCursor = signal(true);
  showPhoto = signal(false);

  private timeoutId?: ReturnType<typeof setTimeout>;
  private cursorInterval?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.cursorInterval = setInterval(() => this.showCursor.update(v => !v), 500);
  }

  ngAfterViewInit() {
  animate([this.kickerRef.nativeElement], {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 600,
    easing: 'easeOutQuad',
  });

  animate([this.headlineRef.nativeElement], {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 800,
    delay: 150,
    easing: 'easeOutExpo',
  });

  animate([this.sublineRef.nativeElement], {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 700,
    delay: 350,
    easing: 'easeOutExpo',
  });

  animate([this.ctasRef.nativeElement], {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 600,
    delay: 500,
    easing: 'easeOutQuad',
  });

  animate([this.visualRef.nativeElement], {
    opacity: [0, 1],
    translateX: [30, 0],
    duration: 900,
    delay: 250,
    easing: 'easeOutExpo',
  });

  // La terminal arranca a tipear recién cuando el usuario la ve en pantalla
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.typeScript(0, 0);
          observer.unobserve(this.visualRef.nativeElement);
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(this.visualRef.nativeElement);
}
  ngOnDestroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.cursorInterval) clearInterval(this.cursorInterval);
  }

  private typeScript(lineIndex: number, charIndex: number) {
    if (lineIndex >= SCRIPT.length) return;

    if (lineIndex === PHOTO_REVEAL_AT_LINE && charIndex === 0) {
      this.showPhoto.set(true);
    }

    const line = SCRIPT[lineIndex];

    if (charIndex <= line.text.length) {
      this.currentText.set(line.text.slice(0, charIndex));
      const speed = 10 + Math.random() * 12;
      this.timeoutId = setTimeout(() => this.typeScript(lineIndex, charIndex + 1), speed);
    } else {
      this.renderedLines.update(lines => [...lines, line]);
      this.currentText.set('');
      this.timeoutId = setTimeout(() => this.typeScript(lineIndex + 1, 0), 150);
    }
  }
}