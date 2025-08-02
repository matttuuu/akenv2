import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { LiveMetricsService } from '../../../../services/live-metrics.service';

@Component({
    selector: 'app-adr',
    templateUrl: './adr.component.html',
    styleUrl: './adr.component.css',
    standalone: true,
    imports: [CommonModule]
})
export class AdrComponent implements OnInit {
    currentAdr: number | null = null;

    constructor(private liveMetricService: LiveMetricsService) {}

    ngOnInit(): void {
        this.liveMetricService.getADR().subscribe((value) => {
            this.currentAdr = value;
        })
    }

}
