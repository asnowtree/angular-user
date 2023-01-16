import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseData, UserInfo } from './user-info.component';
import { NgModel } from '@angular/forms';


@Injectable()
export class HttpClientUtils {
  constructor(private http: HttpClient) { }


  getPostRequest(url:string,data:any,headers:any){
    let req =  this.http.post<ResponseData>(url,data, {headers:headers}).pipe(
      catchError(this.handleError)
    )
    return req;
  }


//   get(url: string, options: {
//     headers?: HttpHeaders | {
//         [header: string]: string | string[];
//     };
//     context?: HttpContext;
//     observe?: 'body';
//     params?: HttpParams | {
//         [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
//     };
//     reportProgress?: boolean;
//     responseType: 'arraybuffer';
//     withCredentials?: boolean;
// }): Observable<ArrayBuffer>;
  getUserInfo() {
    const req = this.http.get<ResponseData>("/u/userinfo", {
    }).pipe(
        catchError(this.handleError) // then handle the error
        );
    return req;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
    //   console.error(
        // 'Backend returned code ${error.status}, body was: ', error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  saveUserInfo(userinfo:UserInfo){
    let postHeaders = {
        "Content-Type": "application/json"
    }
    const req = this.http.post<ResponseData>("/u/userinfo",
    JSON.stringify(userinfo),
    {
        headers : postHeaders
    }
    );
    req.subscribe(
       resp=>{
        if(resp.success){
            alert("成功")
        }
        return resp;
       }
    )
  }
}