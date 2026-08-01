import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    // Simula datos que en el futuro vendrían de una API real (GET /projects)
    private readonly _projects = signal<Project[]>([
        {
            id: 1,
            name: 'E-commerce API',
            description: 'API REST con autenticación JWT, capas controller/service/model.',
            techStack: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
            githubUrl: 'https://github.com/tu-usuario/proyecto1',
        },
        {
            id: 2,
            name: 'Dashboard Admin',
            description: 'Panel de administración con gráficos en tiempo real.',
            techStack: ['React', 'Next.js', 'MongoDB'],
            githubUrl: 'https://github.com/tu-usuario/proyecto2',
        },
        {
            id: 3,
            name: 'Task Manager',
            description: 'Gestor de tareas colaborativo con websockets.',
            techStack: ['Nest.js', 'TypeScript', 'MongoDB'],
            githubUrl: 'https://github.com/tu-usuario/proyecto3',
        },
    ]);

    // Expone solo lectura, como un "GET" de tu API
    readonly projects = this._projects.asReadonly();

    getById(id: number): Project | undefined {
        return this._projects().find(p => p.id === id);
    }
}