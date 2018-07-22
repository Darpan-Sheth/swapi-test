import { Injectable, ErrorHandler } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { Observable } from '../../../node_modules/rxjs';
import { Http } from "@angular/http";
import { map, catchError } from "rxjs/operators";


@Injectable()
export class HttpServiceService {

  constructor(public appSettings: AppSettingsService, public http: Http) { 
    
  }

  /*
  * Method to handle get call
  * Params(path: string - url for web service call)
  * return observable
  * */

  getCall(path: any): Observable<any>{
      var url = AppSettingsService.BASE_URL + path;
      console.log("getCall url...", url);
      return this.http.get(url, "").pipe(catchError(this.handleErrorObservable));
  }

  /*
  * Method to handle error 
  * Params(http error)
  * return observable
  * */

  handleErrorObservable(error): Observable<any>{
    return Observable.throw(error);
  }
}
