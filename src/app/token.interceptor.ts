import { Injectable } from "@angular/core";
import { 
  HttpEvent, HttpInterceptor,
  HttpRequest, HttpHandler
} from "@angular/common/http";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { UserService } from "./services/user.service";
import { UtilizatorLogat } from "./shared/UtilizatorLogat";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    let currentUser: UtilizatorLogat;
    this.userService.currentUser.pipe(take(1)).subscribe(utilizator => currentUser = utilizator)

    if (currentUser) {
        console.log(currentUser);
        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, "Bearer " + currentUser.token)
          });
    }
  }
}