import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveMetricsService } from '../../../../services/live-metrics.service';
import { HotelConfigService } from '../../../../services/hotel-config.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-total-rooms',
    imports: [CommonModule],
    templateUrl: './total-rooms.component.html',
    styleUrls: ['./total-rooms.component.css']
})
export class TotalRoomsComponent implements OnInit, OnDestroy {
  totalRooms: number | null = null;
  private tokensSub?: Subscription;

  constructor(
    private liveMetricService: LiveMetricsService,
    private hotelConfigService: HotelConfigService
  ) {}

  ngOnInit(): void {
    if (
      this.hotelConfigService.getClientToken() &&
      this.hotelConfigService.getAccessToken()
    ) {
      this.loadTotalRooms();
    }
    this.tokensSub = this.hotelConfigService.onTokensChange().subscribe(() => {
      this.loadTotalRooms();
    });
  }

  ngOnDestroy(): void {
    this.tokensSub?.unsubscribe();
  }

  private loadTotalRooms() {
    this.totalRooms = null;
    this.liveMetricService.getTotalRooms().subscribe((value) => {
      this.totalRooms = value;
    });
  }
}