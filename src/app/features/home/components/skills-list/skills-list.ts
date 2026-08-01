import { Component } from '@angular/core';

@Component({
  selector: 'app-skills-list',
  imports: [],
  templateUrl: './skills-list.html',
  styleUrl: './skills-list.css'
})
export class SkillsList {
  skills = [
    'HTML', 'CSS', 'TypeScript', 'JavaScript',
    'React', 'Node.js', 'Express', 'Next.js',
    'Nest.js', 'MongoDB', 'PostgreSQL', 'Docker'
  ];
}