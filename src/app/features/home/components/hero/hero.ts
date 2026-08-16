import { Component, OnInit, OnDestroy, signal } from '@angular/core';

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

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit, OnDestroy {
  renderedLines = signal<Line[]>([]);
  currentText = signal('');
  showCursor = signal(true);

  private timeoutId?: ReturnType<typeof setTimeout>;
  private cursorInterval?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.typeScript(0, 0);
    this.cursorInterval = setInterval(() => this.showCursor.update(v => !v), 500);
  }

  ngOnDestroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.cursorInterval) clearInterval(this.cursorInterval);
  }

  private typeScript(lineIndex: number, charIndex: number) {
    if (lineIndex >= SCRIPT.length) return;

    const line = SCRIPT[lineIndex];

    if (charIndex <= line.text.length) {
      this.currentText.set(line.text.slice(0, charIndex));
      const speed = 25 + Math.random() * 25;
      this.timeoutId = setTimeout(() => this.typeScript(lineIndex, charIndex + 1), speed);
    } else {
      this.renderedLines.update(lines => [...lines, line]);
      this.currentText.set('');
      this.timeoutId = setTimeout(() => this.typeScript(lineIndex + 1, 0), 350);
    }
  }
}