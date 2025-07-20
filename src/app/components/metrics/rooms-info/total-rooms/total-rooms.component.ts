import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveMetricsService } from '../../../../services/live-metrics.service';

@Component({
    selector: 'app-total-rooms',
    imports: [CommonModule],
    templateUrl: './total-rooms.component.html',
    styleUrls: ['./total-rooms.component.css']
})
export class TotalRoomsComponent implements OnInit {
  totalRooms: number | null = null;

  constructor(private liveMetricService: LiveMetricsService) {}

  ngOnInit(): void {
    this.liveMetricService.getTotalRooms().subscribe((value) => {
      this.totalRooms = value;
    });
  }
}