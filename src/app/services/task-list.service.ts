import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {
    private readonly domain = 'taskList';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http , @Inject('BASE_CONFIG')private config) {  }
    add(taskList: TaskList): Observable<TaskList> {
        taskList.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
                .post(uri, JSON.stringify(taskList), { headers: this.headers})
                .map(response => response.json());
    }
    update(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name : taskList.name
        };
        return this.http
            .patch(uri, JSON.stringify(toUpdate), { headers: this.headers})
            .map(response => response.json());
    }
    delete(taskList: TaskList): Observable<TaskList> {
        const url = `${this.config.uri}/taskLists/${taskList.id}`;
        return this.http.delete(url).mapTo(taskList);
    }
    get (projectId: string): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'projectId ': projectId}})
            .map(result => result.json() as TaskList[]);
    }
    // 拖拽非法执行数据库
    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const drapUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drap$ = this.http
            .patch(drapUri, JSON.stringify({order: target.order}), {headers: this.headers})
            .map(result => result.json());
        const drop$ = this.http
            .patch(dropUri, JSON.stringify({order: src.order}), {headers: this.headers})
            .map(result => result.json());
        return Observable
                .concat(drap$, drop$)
                .reduce((arrs, list) => [...arrs, list], []);
    }

}
