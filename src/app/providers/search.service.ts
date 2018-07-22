import { Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { HttpServiceService } from './http-service.service';
import { Observable } from '../../../node_modules/rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable()
export class SearchService {

  constructor(public appSettings: AppSettingsService, public httpService: HttpServiceService) { 

  }

  /**
   * Method to searchRecords
   * Params(SearchKey: string - search text from the textbox, searchOption: string - people or ship, forPageCall: boolean - to get if its from page or normal)
   */

  searchRecords(searchKey, searchOption, forPageCall): Observable<any>{
    let url;
    /** forPageCall condition is checked first, if its true it won't check any other condition 
     * so there won't be a need to check it every time.
    */
    if(forPageCall){
      if(searchOption == "people"){
        url = AppSettingsService.people_url + searchKey;
      } else{
        url = AppSettingsService.starships_url + searchKey;
      }
    }else if(searchOption == "people"){
      if(searchKey == "*"){
        url = AppSettingsService.people_url;
      }else{
        url = AppSettingsService.people_url + "?search="+ searchKey;
      }
    } else if(searchOption == "starships"){
      if(searchKey == "*"){
        url = AppSettingsService.starships_url;
      }else{
        url = AppSettingsService.starships_url + "?search="+ searchKey;
      }
    }
    return this.httpService.getCall(url).pipe(map(res => 
      res.json()
    ), catchError(this.handleErrorObservable));
}
handleErrorObservable(error): Observable<any>{ 
  return Observable.throw(error);
}
    // return this.httpService.getCall(url).pipe(map(res => {
    //   console.log("res on map...", res);

    // }))
}
