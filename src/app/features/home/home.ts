import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { SkillsList } from './components/skills-list/skills-list';
import { ProjectsGrid } from './components/projects-grid/projects-grid';

@Component({
  selector: 'app-home',
  imports: [Hero, SkillsList, ProjectsGrid],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}