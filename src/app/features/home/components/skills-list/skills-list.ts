import { Component } from '@angular/core';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skills-list',
  imports: [],
  templateUrl: './skills-list.html',
  styleUrl: './skills-list.css'
})
export class SkillsList {
  skills: Skill[] = [
    { name: 'HTML', icon: 'devicon-html5-plain colored' },
    { name: 'CSS', icon: 'devicon-css3-plain colored' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: 'Express', icon: 'devicon-express-original' },
    { name: 'Next.js', icon: 'devicon-nextjs-original' },
    { name: 'Nest.js', icon: 'devicon-nestjs-plain colored' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
  ];

  // Duplicamos para que el loop sea perfecto (cuando termina la primera tanda, ya está la segunda lista para continuar sin salto)
  get loopedSkills(): Skill[] {
    return [...this.skills, ...this.skills];
  }
}