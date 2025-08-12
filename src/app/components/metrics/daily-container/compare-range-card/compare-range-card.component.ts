import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-range-card',
  standalone: true,
  templateUrl: './compare-range-card.component.html',
  styleUrl: './compare-range-card.component.css',
  imports: [CommonModule],
})
export class CompareRangeCardComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  variables: any;
}
