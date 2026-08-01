import { Component, inject } from '@angular/core';
import { ProjectCard } from '../../../../shared/components/project-card/project-card';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects-grid',
  imports: [ProjectCard],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.css'
})
export class ProjectsGrid {
  private projectsService = inject(ProjectsService);
  projects = this.projectsService.projects;
}