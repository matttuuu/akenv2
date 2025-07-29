import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveMetricsService } from '../../../../services/live-metrics.service';

@Component({
  selector: 'app-clean-dirty',
  templateUrl: './clean-dirty.component.html',
  styleUrl: './clean-dirty.component.css',
  imports: [CommonModule],
  standalone: true,
})
export class CleanDirtyComponent implements OnInit {
  constructor(private liveMetricsService: LiveMetricsService) {}

  cleanRooms: number | null = null;
  dirtyRooms: number | null = null;

  ngOnInit(): void {
    this.liveMetricsService.getTotalCleanRooms().subscribe((value) => {
      this.cleanRooms = value;
    })

    this.liveMetricsService.getTotalDirtyRooms().subscribe((value) => {
      this.dirtyRooms = value;
    })
  }
}
