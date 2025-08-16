import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelConfigService {
  private hotelsUrl = 'http://localhost:3000/api/hotels';

  constructor(private http: HttpClient) {}

  private clientToken: string = '';
  private accessToken: string = '';

  private tokensChanged = new BehaviorSubject<boolean>(false);

  notifyTokensChange() {
    /**
     * Notifica a todos los suscriptores que los tokens han cambiado.
     * Se llama internamente cuando se actualizan clientToken y accessToken.
     */
    this.tokensChanged.next(true);
  }

  onTokensChange(): Observable<boolean> {
    //Devuelve un observable al que se puede suscribir un componente para enterarse cuando cambia un token
    //se usa para que al cambiar de hotel, los componente actualizen datos

    return this.tokensChanged.asObservable();
  }

  setTokens(clientToken: string, accessToken: string) {
    //Asigna valores a client y accesstoken, y notifica este cambio
    this.clientToken = clientToken;
    this.accessToken = accessToken;
    this.notifyTokensChange();
  }

  getClientToken(): string {  
    return this.clientToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  //Obtener hoteles - Dropdown
  getHotelsList() {
    return this.http.get<any>(this.hotelsUrl + '/getHotels');
  }

  ////TOKENS DE PRUEBA
  //Metodos de prueba que me devuelven el token de cliente y accesso del hotel 1 - net pricing
  getTestingClientToken(): string {
    return 'E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D';
  }

  getTestingAccessToken(): string {
    return 'C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D';
  }

  getHotelTokensByName(hotelName: string) { //Consulta al backend para obtener los tokens de un hotel en la db, buscando por nombre
    return this.http.get(this.hotelsUrl + '/getHotelTokensByName', {
      params: { name: hotelName },
    });
  }
}
