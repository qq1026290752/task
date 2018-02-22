import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';
declare module 'rxjs/Observable' {
    interface Observable<T> {
        debug: (...any) =>　Observable<T>　;
    }
}
Observable.prototype.debug = function(message: string) {
  return this.do(
      (next) => {
          if (!environment.production) {
              console.log(message, next);
          }
      },
      (error) => {
        if (!environment.production) {
            console.error('ERROE>>' , message, error);
        }
    },
    () => {
        if (!environment.production) {
            console.log('Completed');
        }
    }
  );
};