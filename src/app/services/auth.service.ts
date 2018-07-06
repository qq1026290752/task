import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User, Project, Auth } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    private readonly domain = 'users';
    private token = '111';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http , @Inject('BASE_CONFIG')private config) {  }
    register(user: User): Observable <Auth> {
        user.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'mail': user.email}})
            .switchMap(res => {
                if (res.json().length > 0) {
                   throw new Error('user existed');
                }
                return this.http.post(uri, JSON.stringify(user), {headers: this.headers})
                .map(result => ({token: this.token, user: result.json()}));
            });
    }

    login(email: string, password: string): Observable <Auth> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'email ': email, 'password': password}})
            .map(result => {
                if (result.json().length === 0) {
                    throw new Error('用户名或者密码不正确');
                }
                return {
                    token: this.token,
                    user: result.json()[0]
                };
            });
    }
}
