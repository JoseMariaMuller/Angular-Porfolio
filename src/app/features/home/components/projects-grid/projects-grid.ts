import { Component, inject, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { ProjectCard } from '../../../../shared/components/project-card/project-card';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects-grid',
  imports: [ProjectCard],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.css'
})
export class ProjectsGrid implements AfterViewInit, OnDestroy {
  private projectsService = inject(ProjectsService);
  projects = this.projectsService.projects;

  @ViewChild('wrapperEl') wrapperRef!: ElementRef<HTMLDivElement>;
  @ViewChild('viewportEl') viewportRef!: ElementRef<HTMLDivElement>;
  @ViewChild('trackEl') trackRef!: ElementRef<HTMLDivElement>;

  progress = signal(0);

  private onScrollBound = () => this.onScroll();

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onScrollBound, { passive: true });
    // Esperamos un tick para que el layout ya esté calculado (imágenes, fuentes, etc.)
    setTimeout(() => this.onScroll(), 0);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollBound);
  }

  private onScroll() {
    const wrapper = this.wrapperRef.nativeElement;
    const track = this.trackRef.nativeElement;
    const viewport = this.viewportRef.nativeElement;

    const rect = wrapper.getBoundingClientRect();
    const scrollableHeight = rect.height - window.innerHeight;

    const rawProgress = -rect.top / scrollableHeight;
    const clamped = Math.min(Math.max(rawProgress, 0), 1);

    this.progress.set(clamped);

    const maxTranslate = track.scrollWidth - viewport.clientWidth;
    track.style.transform = `translateX(-${clamped * maxTranslate}px)`;
  }
}