import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly _projects = signal<Project[]>([
    {
      id: 1,
      name: 'Doña Plácida',
      description: 'Sitio web para el almacén de un pueblo, con información del comercio, productos y contacto para la comunidad local.',
      techStack: ['Next.js', 'React', 'TypeScript'],
      liveUrl: 'https://dona-placida.vercel.app/',
      imageUrl: '/doniaplacida.PNG',
      featured: true,
    },
    {
      id: 2,
      name: 'MecanicLab',
      description: 'Aplicación web para gestión de un taller mecánico: control de clientes, vehículos y órdenes de trabajo.',
      techStack: ['Next.js', 'React', 'TypeScript'],
      liveUrl: 'https://mecaniclab.vercel.app/',
      imageUrl: '/mecanicapp.PNG',
    },
    // TODO: reemplazar por un proyecto real o quitar de la lista antes de publicar
    {
      id: 3,
      name: 'Task Manager',
      description: 'Gestor de tareas colaborativo con websockets.',
      techStack: ['Nest.js', 'TypeScript', 'MongoDB'],
      imageUrl: 'https://placehold.co/600x400/1e293b/6366f1?text=Task+Manager',
    },
  ]);

  readonly projects = this._projects.asReadonly();

  getById(id: number): Project | undefined {
    return this._projects().find(p => p.id === id);
  }
}