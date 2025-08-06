import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LiveMetricsService } from '../../../../services/live-metrics.service';
import { HotelConfigService } from '../../../../services/hotel-config.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-adr',
    templateUrl: './adr.component.html',
    styleUrl: './adr.component.css',
    standalone: true,
    imports: [CommonModule]
})
export class AdrComponent implements OnInit, OnDestroy {
    currentAdr: number | null = null;
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
          this.loadADR();
        }
        this.tokensSub = this.hotelConfigService.onTokensChange().subscribe(() => {
          this.loadADR();
        });
    }

    ngOnDestroy(): void {
      this.tokensSub?.unsubscribe();
    }

    private loadADR() {
      this.currentAdr = null;
      this.liveMetricService.getADR().subscribe((value) => {
        this.currentAdr = value;
      });
    }
}
