import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgCleaningTimeComponent } from './avg-cleaning-time.component';

describe('AvgCleaningTimeComponent', () => {
  let component: AvgCleaningTimeComponent;
  let fixture: ComponentFixture<AvgCleaningTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvgCleaningTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgCleaningTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
