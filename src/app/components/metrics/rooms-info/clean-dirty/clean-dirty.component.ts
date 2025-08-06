import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveMetricsService } from '../../../../services/live-metrics.service';
import { HotelConfigService } from '../../../../services/hotel-config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clean-dirty',
  templateUrl: './clean-dirty.component.html',
  styleUrl: './clean-dirty.component.css',
  imports: [CommonModule],
  standalone: true,
})
export class CleanDirtyComponent implements OnInit, OnDestroy {
  cleanRooms: number | null = null;
  dirtyRooms: number | null = null;
  private tokensSub?: Subscription;

  constructor(
    private liveMetricsService: LiveMetricsService,
    private hotelConfigService: HotelConfigService
  ) {}

  ngOnInit(): void {
    // Solo carga si hay tokens válidos
    if (
      this.hotelConfigService.getClientToken() &&
      this.hotelConfigService.getAccessToken()
    ) {
      this.loadRoomsInfo();
    }

    // Suscribirse a los cambios de tokens
    this.tokensSub = this.hotelConfigService.onTokensChange().subscribe(() => {
      this.loadRoomsInfo();
    });
  }

  ngOnDestroy(): void {
    this.tokensSub?.unsubscribe();
  }

  private loadRoomsInfo() {
    this.cleanRooms = null;
    this.dirtyRooms = null;

    this.liveMetricsService.getTotalCleanRooms().subscribe((value) => {
      this.cleanRooms = value;
    });

    this.liveMetricsService.getTotalDirtyRooms().subscribe((value) => {
      this.dirtyRooms = value;
    });
  }
}
