import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, shareReplay } from 'rxjs';
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
    private hotelConfig: HotelConfigService
  ) {
    // Limpia el cache cuando cambian los tokens
    this.hotelConfig.onTokensChange().subscribe(() => {
      this.refreshReservationsInfo();
    });
  }

  //Variables cache propias en codigo

  private reservationsCache$: Observable<any[]> | null = null;
  private resourcesCaches$: Observable<any[]> | null = null;
  private orderItemsCache$: Observable<any[]> | null = null;

  refreshReservationsInfo(): void {
    this.reservationsCache$ = null;
    sessionStorage.removeItem('reservationsCache');
    this.resourcesCaches$ = null;
    sessionStorage.removeItem('resourcesCache');
    this.orderItemsCache$ = null;
    sessionStorage.removeItem('orderItemsCache');
  }

  ////Parte nueva - session storage ///////////////////////////////////////////////////////////

  private getFromSessionStorage<T>(key: string): T | null {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  private saveToSessionStorage<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  //Tokens

  private getTokensPayload() {
    ////Tokens reales - DEFINIR
    return {
      ClientToken: this.hotelConfig.getClientToken(),
      AccessToken: this.hotelConfig.getAccessToken(),
    };
  }

  private getTestingTokensPayload() {
    //Tokens de prueba : Uk
    //metodo de prueba para verificar que se devuelva un objeto con ambos strings
    return {
      ClientToken: this.hotelConfig.getTestingClientToken(), //Podria hacer que en vez de devolver un string hardcodeado, tome como parametro el hotelName y devuelva los tokens de ese hotel!
      AccessToken: this.hotelConfig.getTestingAccessToken(), //
    };
  }

  private getHotelTokens(hotelName: String) {
    ///seguir
    //Metodo que me permite obtener par de tokens
    this.hotelConfig.getHotelsList().subscribe({
      next: (response) => {},
    });
  }

  

  //Datos hotel mews
  //total available rooms?

  //Reservations
  getAllReservationsInfo(): Observable<any[]> {
    const cacheKey = 'reservationsCache';

    // Si ya tenemos la cache en memoria, devolvemos eso (ideal para múltiples suscripciones sin ir a storage)
    if (this.reservationsCache$) return this.reservationsCache$;

    // Intentamos recuperar del sessionStorage
    const storedData = this.getFromSessionStorage<any[]>(cacheKey);
    if (storedData) {
      this.reservationsCache$ = new Observable((observer) => {
        observer.next(storedData);
        observer.complete();
      });
      return this.reservationsCache$;
    }

    // Si no está en cache ni en sessionStorage, hacemos la petición
    const today = new Date();
    const startOfDay = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
    ).toISOString();
    const endOfDay = new Date(
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      )
    ).toISOString();

    const payload = {
      ...this.getTokensPayload(),
      StartUtc: startOfDay,
      EndUtc: endOfDay,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    this.reservationsCache$ = this.http
      .post<any>(`${this.apiURL}reservations/getAll`, payload, { headers })
      .pipe(
        map((res) => res.Reservations || []),
        map((data) => {
          this.saveToSessionStorage(cacheKey, data); // Guardamos en sessionStorage
          return data;
        }),
        shareReplay(1)
      );

    return this.reservationsCache$;
  }

  //Resources
  getAllResourcesInfo(): Observable<any[]> {
    const cacheKey = 'resourcesCache';

    if (this.resourcesCaches$) {
      return this.resourcesCaches$;
    }

    const storedData = this.getFromSessionStorage<any[]>(cacheKey);
    if (storedData) {
      this.resourcesCaches$ = of(storedData);
      return this.resourcesCaches$;
    }

    const today = new Date();
    const startOfDay = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
    ).toISOString();
    const endOfDay = new Date(
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      )
    ).toISOString();

    const payload = {
      ...this.getTokensPayload(),
      StartUtc: startOfDay,
      EndUtc: endOfDay,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    this.resourcesCaches$ = this.http
      .post<any>(`${this.apiURL}resources/getAll`, payload, { headers })
      .pipe(
        map((res) => res.Resources || []),
        map((data) => {
          this.saveToSessionStorage(cacheKey, data);
          return data;
        }),
        shareReplay(1)
      );

    return this.resourcesCaches$;
  }

  //Order Items
  getAllOrderItemsInfo(): Observable<any[]> {
    const cacheKey = 'orderItemsCache';

    if (this.orderItemsCache$) {
      return this.orderItemsCache$;
    }

    const storedData = this.getFromSessionStorage<any[]>(cacheKey);
    if (storedData) {
      this.orderItemsCache$ = of(storedData);
      return this.orderItemsCache$;
    }

    const today = new Date();
    const startOfDay = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
    ).toISOString();
    const endOfDay = new Date(
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      )
    ).toISOString();

    const payload = {
      ...this.getTokensPayload(),
      Limitation: { Count: 500 },
      CreatedUtc: {
        StartUtc: startOfDay,
        EndUtc: endOfDay,
      },
      UpdatedUtc: {
        StartUtc: startOfDay,
        EndUtc: endOfDay,
      },
      Types: ['SpaceOrder'],
      AccountingStates: ['Open'],
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    this.orderItemsCache$ = this.http
      .post<any>(`${this.apiURL}orderItems/getAll`, payload, { headers })
      .pipe(
        map((res) => res.OrderItems || []),
        map((data) => {
          this.saveToSessionStorage(cacheKey, data);
          return data;
        }),
        shareReplay(1)
      );

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
            (r) => ['Confirmed', 'Started'].includes(r.State) //&&
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
        todayStart.setHours(0, 0, 0);
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
    console.log(this.getTokensPayload()); //Tambien cambiado por getTokensPayload()
  }
}
