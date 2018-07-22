import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {

  constructor() { 
    
  }
  public static get BASE_URL() { return "https://swapi.co/api/"; }
  public static get people_url() { return "people/"; }
  public static get starships_url() { return "starships/"; }
}
