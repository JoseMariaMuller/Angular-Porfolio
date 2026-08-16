import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, signal } from '@angular/core';

const TOTAL_FRAMES = 96;
const FRAME_PATH = (i: number) => `/scroll-frames/frame-${String(i).padStart(3, '0')}.jpg`;

@Component({
  selector: 'app-scroll-scrub',
  imports: [],
  templateUrl: './scroll-scrub.html',
  styleUrl: './scroll-scrub.css'
})
export class ScrollScrub implements AfterViewInit, OnDestroy {
  @ViewChild('canvasEl') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('wrapperEl') wrapperRef!: ElementRef<HTMLDivElement>;

  private ctx!: CanvasRenderingContext2D;
  private images: HTMLImageElement[] = [];
  private imagesLoaded = signal(0);
  loading = signal(true);

  private onScrollBound = () => this.onScroll();

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.preloadImages();
    window.addEventListener('scroll', this.onScrollBound, { passive: true });
    window.addEventListener('resize', this.onScrollBound);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollBound);
    window.removeEventListener('resize', this.onScrollBound);
  }

  private preloadImages() {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        this.imagesLoaded.update(n => n + 1);
        if (this.imagesLoaded() === TOTAL_FRAMES) {
          this.loading.set(false);
          this.drawFrame(0);
        }
      };
      this.images.push(img);
    }
  }

  private onScroll() {
    if (this.loading()) return;

    const rect = this.wrapperRef.nativeElement.getBoundingClientRect();
    const sectionHeight = rect.height - window.innerHeight;

    const progress = Math.min(Math.max(-rect.top / sectionHeight, 0), 1);
    const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));

    this.drawFrame(frameIndex);
  }

  private drawFrame(index: number) {
    const img = this.images[index];
    if (!img || !img.complete) return;

    const canvas = this.canvasRef.nativeElement;
    canvas.width = img.width;
    canvas.height = img.height;
    this.ctx.drawImage(img, 0, 0);
  }
}