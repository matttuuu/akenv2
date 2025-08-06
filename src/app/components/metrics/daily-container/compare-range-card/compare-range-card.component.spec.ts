import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareRangeCardComponent } from './compare-range-card.component';

describe('CompareRangeCardComponent', () => {
  let component: CompareRangeCardComponent;
  let fixture: ComponentFixture<CompareRangeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompareRangeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareRangeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
