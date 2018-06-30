import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http , @Inject('BASE_CONFIG')private config) {  }
    add(project: Project): Observable<Project> {
        project.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
                .post(uri, JSON.stringify(project), { headers: this.headers})
                .map(response => response.json());
    }
    update(project: Project): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name : project.name,
            desc : project.desc,
            coverImg: project.coverImg
        };
        return this.http
                .patch(uri, JSON.stringify(toUpdate), { headers: this.headers})
                .map(response => response.json());
    }
    delete(project: Project): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name : project.name,
            desc : project.desc,
            coverImg: project.coverImg
        };
        return this.http
                .patch(uri, JSON.stringify(toUpdate), { headers: this.headers})
                .map(response => response.json());
    }
}
