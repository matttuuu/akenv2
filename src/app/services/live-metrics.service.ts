import { Injectable } from '@angular/core';
import { Observable, forkJoin, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HotelConfigService } from './hotel-config.service';
import { DailyMetricsService } from './daily-metrics.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LiveMetricsService {
  private apiURL = '/api/connector/v1/';

  //Variables de token y clave de acceso aqui, para usar en cada metodo

  constructor(
    private http: HttpClient,
    private hotelConfig: HotelConfigService,
   
    
  ) {}

  //Variables cache propias en codigo

  private reservationsCache$: Observable<any[]> | null = null;
  private resourcesCaches$: Observable<any[]> | null = null;
  private orderItemsCache$: Observable<any[]> | null = null;

  refreshReservationsInfo(): void {
    this.reservationsCache$ = null;
  }

  

  //Tokens

  private getTokensPayload() {
    return {
      ClientToken: this.hotelConfig.getClientToken(),
      AccessToken: this.hotelConfig.getAccessToken(),
    };
  }

  private getTestingTokensPayload() {
    //metodo de prueba para verificar que se devuelva un objeto con ambos strings
    return {
      ClientToken: this.hotelConfig.getTestingClientToken(),
      AccessToken: this.hotelConfig.getTestingAccessToken(),
    };
  }

  //Datos hotel mews
  //total available rooms?

  //Reservations
  getAllReservationsInfo(): Observable<any[]> {
    if (!this.reservationsCache$) {
       const today = new Date();
       const startOfDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)).toISOString();
       const endOfDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)).toISOString();
      const payload = {
        ...this.getTestingTokensPayload(),
        
        StartUtc:startOfDay,
        EndUtc: endOfDay
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      this.reservationsCache$ = this.http
        .post<any>(`${this.apiURL}reservations/getAll`, payload, { headers })
        .pipe(
          map((res) => res.Reservations || []),
          shareReplay(1) //La 'ultima' respuesta de la consulta se mantiene en el cache, disponible para cualquier funcion u objeto que se quiera suscribir
        );
    }

    return this.reservationsCache$;
  }

  //Resources
  getAllResourcesInfo(): Observable<any[]> {
    
    if (!this.resourcesCaches$) {
       const today = new Date();
       const startOfDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)).toISOString();
       const endOfDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)).toISOString();
      const payload = {
        
        ...this.getTestingTokensPayload(),
        
        StartUtc: startOfDay,
        EndUtc: endOfDay
      };
      const headers = {
        'Content-Type': 'application/json',
      };

      this.resourcesCaches$ = this.http
        .post<any>(`${this.apiURL}resources/getAll`, payload, { headers })
        .pipe(
          map((res) => res.Resources || []),
          shareReplay(1)
        );
    }
    return this.resourcesCaches$;
  }

  //Order Items
  getAllOrderItemsInfo(): Observable<any[]> {
  if (!this.orderItemsCache$) {
    const today = new Date();
    const startOfDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)).toISOString();
    const endOfDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)).toISOString();
    const payload = {
      ...this.getTestingTokensPayload(),
      Limitation: {
        Count: 500 // Si se necesitan mas items, lo aumentamos
      },
      CreatedUtc: {
        StartUtc: startOfDay,
        EndUtc: endOfDay
      },
      UpdatedUtc: {
        StartUtc: startOfDay,
        EndUtc: endOfDay
      },
      Types: ['SpaceOrder'],
      AccountingStates: [
        'Open'
      ]
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    this.orderItemsCache$ = this.http
      .post<any>(`${this.apiURL}orderItems/getAll`, payload, { headers })
      .pipe(
        map((res) => res.OrderItems || []),
        shareReplay(1)
      );
  }

  return this.orderItemsCache$;
}

  

  //Info de reservas que se han creado en el dia... ///Funciona - Probando ahora con entorno 1 gross pricing (Uk)

  getTotalCheckIns(): Observable<any> {
    //Devuelve la cantidad de checkIns en base a la respuesta del metodo 'getAllReservationsInfo()'
    return this.getAllReservationsInfo().pipe(
      map(
        (reservations) =>
          reservations.filter((r) => r.State === 'Started').length
      ) ///Leer respuesta en postman para saber que filtrar!
    );
  }

  getTotalConfirmedReservations(): Observable<any> {
    //Devuelve la cantidad de checkIns en base a la respuesta del metodo 'getAllReservationsInfo()'
    return this.getAllReservationsInfo().pipe(
      map(
        (reservations) =>
          reservations.filter((r) => r.State === 'Confirmed').length
      ) ///Leer respuesta en postman para saber que filtrar!
    );
  }

  getTotalCanceledReservations(): Observable<any> {
    //Devuelve la cantidad de checkIns en base a la respuesta del metodo 'getAllReservationsInfo()'
    return this.getAllReservationsInfo().pipe(
      map(
        (reservations) =>
          reservations.filter((r) => r.State === 'Canceled').length
      ) ///Leer respuesta en postman para saber que filtrar!
    );
  }

  getTotalCheckOuts(): Observable<any> {
    return this.getAllReservationsInfo().pipe(
      map(
        (reservations) =>
          reservations.filter((r) => r.State === 'Processed').length
      )
    );
  }

  //Info de recursos del hotel

  getTotalRooms(): Observable<any> {
    return this.getAllResourcesInfo().pipe(
      map(
        (resources) =>
          resources.filter((r) => r.Data.Discriminator === 'Space').length //De esta manera accedemos a la info subsecuente en la respuesta del JSON
      )
    );
  }

  getTotalCleanRooms(): Observable<any> {
    return this.getAllResourcesInfo().pipe(
      map(
        (resources) => resources.filter((r) => r.State === 'Clean').length //De no colocar .length, se devuelve el array, por eso la confusion con la consola del navegador
      )
    );
  }

  getTotalDirtyRooms(): Observable<any> {
    return this.getAllResourcesInfo().pipe(
      map((resources) => resources.filter((r) => r.State === 'Dirty').length)
    );
  }

  getTotalOccupiedRooms(): Observable<any> {
    //No se hizo check in, pero la habitacion ya esta ocupada por una reserva
    return this.getAllReservationsInfo().pipe(
      map((reservations) =>
        reservations
          .filter(
            (r) =>
              ['Confirmed', 'Started'].includes(r.State) //&&
              // !!r.AssignedResourceId
          )
          .map((r) => r.AssignedResourceId)
      ),
      map((resourceIds) => Array.from(new Set(resourceIds))), // eliminar duplicados
      map((uniqueResourceIds) => uniqueResourceIds.length)
    );
  }

  getADR(): Observable<number> {
    
    return forkJoin({
      orderItems: this.getAllOrderItemsInfo(), 
      occupiedRooms: this.getTotalOccupiedRooms(), 
    }).pipe(
      map(({ orderItems, occupiedRooms }) => {
        if (!orderItems || occupiedRooms === 0) return 0;

        // Fecha actual en UTC (para asegurar consistencia)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0 );
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59);

        // Filtramos los ítems de tipo SpaceOrder del día
        const validItems = orderItems.filter(
          (item) =>
            // item.Type === 'SpaceOrder' &&
            item.Amount.NetValue //&&
            // item.ConsumedUtc &&
            // // new Date(item.ConsumedUtc) >= todayStart &&
            // // new Date(item.ConsumedUtc) <= todayEnd &&
            // item.AccountingState !== 'Canceled' &&
            // item.Options?.CanceledWithReservation === false
        );

        // Sumamos los ingresos netos
        const totalRevenue = validItems.reduce((sum, item) => {
          return sum + item.Amount.NetValue;
        }, 0);

        // Calculamos ADR
        const adr = totalRevenue / occupiedRooms;
        return +adr.toFixed(2); // Redondeado a 2 decimales
      })
    );
  }

  //Info de ingresos en vivo (Sumado despues para ser guardado en las metricas daily) - ADR y Total (Daily) Revenue

  makeGetTokensSpeak() {
    console.log(this.getTestingTokensPayload());
  }


}
