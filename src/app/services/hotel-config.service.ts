import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelConfigService {

  constructor() { }

  private clientToken: string = '';
  private accessToken: string = '';

  setTokens(clientToken: string, accessToken:string){
    this.clientToken = clientToken;
    this.accessToken = accessToken;
  }

  getClientToken(): string {
    return this.clientToken
  }

  getAccessToken(): string{
    return this.accessToken
  }


  //Metodos de prueba que me devuelven el token de cliente y accesso del hotel 2 - net pricing
  getTestingClientToken():string{
    return "E916C341431C4D28A866AD200152DBD3-A046EB5583FFBE94DE1172237763712";
  }

  getTestingAccessToken():string{
    return "1AEFA58C55E74D65BDC7AD2001564C12-66633E0B736F523379B9E5966165A55";
  }
  
}
