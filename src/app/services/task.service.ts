import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task, TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {
    private readonly domain = 'task';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http , @Inject('BASE_CONFIG')private config) {  }
    add(task: Task): Observable<Task> {
        task.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
                .post(uri, JSON.stringify(task), { headers: this.headers})
                .map(response => response.json());
    }
    update(task: Task): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
        const toUpdate = {
            desc : task.desc,
            priority: task.priority,
            dueDate: task.dueDate,
            reminder: task.reminder,
            owenerId: task.ownerId,
            participantId: task.participantId,
            remark: task.remark
        };
        return this.http
            .patch(uri, JSON.stringify(toUpdate), { headers: this.headers})
            .map(response => response.json());
    }
    delete(task: Task): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
          return this.http.delete(uri).mapTo(task);
    }
    get (taskId: string): Observable<Task[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'taskListId ': taskId}})
            .map(result => result.json() as Task[]);
    }
    // 把所以任务列表的所有任务取出、
    getByList(lists: TaskList[]): Observable<Task[]> {
        return Observable.from(lists)
            .mergeMap(list => this.get( list.id))
            .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t ], []);
    }
    // 完成任务
    complete(task: Task): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
        return this.http
            .patch(uri, JSON.stringify({completed: task.completed}), { headers: this.headers})
            .map(response => response.json());
    }

    // 移动
    move(taskId: String, taskListId: string): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${taskId}`;
        return this.http
            .patch(uri, JSON.stringify({taskListId: taskListId}), { headers: this.headers})
            .map(response => response.json());
    }
    // 移动一个列表的任务到另一个任务列表
    moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
        return this.get(srcListId)
            .mergeMap(tasks => Observable.from(tasks))
            .mergeMap(task => this.move(task.id, targetListId))
            .reduce((arr , x ) => [...arr, x ], []);
    }
}
