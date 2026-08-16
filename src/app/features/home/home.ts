import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { SkillsList } from './components/skills-list/skills-list';
import { ProjectsGrid } from './components/projects-grid/projects-grid';
import { ContactForm } from './components/contact-form/contact-form';
import { WaveDivider } from '../../shared/components/wave-divider/wave-divider';

@Component({
  selector: 'app-home',
  imports: [Hero, SkillsList, ProjectsGrid, ContactForm, WaveDivider],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}