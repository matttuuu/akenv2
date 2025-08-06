import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDayCardComponent } from './single-day-card.component';

describe('SingleDayCardComponent', () => {
  let component: SingleDayCardComponent;
  let fixture: ComponentFixture<SingleDayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleDayCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleDayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
