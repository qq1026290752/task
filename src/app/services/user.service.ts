import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User, Project } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    private readonly domain = 'users';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http , @Inject('BASE_CONFIG')private config) {  }
    searchUsers(filter: string): Observable <User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'email_like ': filter}})
            .map(result => result.json() as User[]);
    }

    getUserByProject(projectId: string): Observable <User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'peojectId ': projectId}})
            .map(result => result.json() as User[]);
    }

    addPeojectRef(user: User, projectId: string): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        if (projectIds.indexOf(projectId) > 0 ) {
            return Observable.of(user);
        }
        return this.http.patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers})
            .map(result => result.json() as User);
    }

    removePeojectRef(user: User, projectId: string): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        const index = projectIds.indexOf(projectId);
        if (index === -1) {
            return Observable.of(user);
        }
        const toUpadateProjects = [...projectIds.splice(0, index) , projectIds.slice(index) ];
        return this.http.patch(uri, JSON.stringify({projectIds: toUpadateProjects}) , {headers: this.headers})
            .map(result => result.json() as User);
    }

    batchUpdateProjectRef(project: Project): Observable<User[]> {
        const projectId = project.id;
        const memberIds = project.members ? project.members : [];
        return Observable.from(memberIds)
            .switchMap(id => {
                const uri = `${this.config.uri}/${this.domain}/${id}`;
                return this.http.get(uri).map(result => result.json() as User);
            })
            .filter(user => user.projectIds.indexOf(projectId) === -1)
            .switchMap(u => this.addPeojectRef(u, projectId))
            .reduce((arr , curr) => [...arr, curr], []);
    }
}
