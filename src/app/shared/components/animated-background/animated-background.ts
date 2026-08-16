import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

interface Blob {
  x: number; y: number;
  baseX: number; baseY: number;
  radius: number;
  color: string;
  speed: number;
  angle: number;
}

@Component({
  selector: 'app-animated-background',
  imports: [],
  templateUrl: './animated-background.html',
  styleUrl: './animated-background.css'
})
export class AnimatedBackground implements AfterViewInit, OnDestroy {
  @ViewChild('bgCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private blobs: Blob[] = [];
  private rafId = 0;
  private scrollY = 0;

  private onScrollBound = () => { this.scrollY = window.scrollY; };
  private onResizeBound = () => this.setup();

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.setup();
    window.addEventListener('scroll', this.onScrollBound, { passive: true });
    window.addEventListener('resize', this.onResizeBound);
    this.animate();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollBound);
    window.removeEventListener('resize', this.onResizeBound);
    cancelAnimationFrame(this.rafId);
  }

  private setup() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight; // cubre TODO el alto del sitio, no solo la pantalla

    const h = canvas.height;
    const w = canvas.width;

   this.blobs = [
  { x: w * 0.1, y: h * 0.05, baseX: w * 0.1, baseY: h * 0.05, radius: 550, color: 'rgba(99, 102, 241, 0.28)', speed: 0.4, angle: 0 },
  { x: w * 0.9, y: h * 0.18, baseX: w * 0.9, baseY: h * 0.18, radius: 500, color: 'rgba(56, 189, 248, 0.22)', speed: 0.3, angle: 2 },
  { x: w * 0.15, y: h * 0.45, baseX: w * 0.15, baseY: h * 0.45, radius: 580, color: 'rgba(167, 139, 250, 0.25)', speed: 0.35, angle: 4 },
  { x: w * 0.85, y: h * 0.65, baseX: w * 0.85, baseY: h * 0.65, radius: 520, color: 'rgba(99, 102, 241, 0.24)', speed: 0.25, angle: 1 },
  { x: w * 0.2, y: h * 0.85, baseX: w * 0.2, baseY: h * 0.85, radius: 560, color: 'rgba(56, 189, 248, 0.2)', speed: 0.3, angle: 3 },
];
  }

  private animate = () => {
    this.draw();
    this.rafId = requestAnimationFrame(this.animate);
  };

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const blob of this.blobs) {
      blob.angle += blob.speed * 0.002;
      blob.x = blob.baseX + Math.sin(blob.angle) * 80;
      blob.y = blob.baseY + Math.cos(blob.angle * 0.7) * 60;

      const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
      grad.addColorStop(0, blob.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}