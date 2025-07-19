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
    return "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D";
  }

  getTestingAccessToken():string{
    return "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D";
  }
  
}
