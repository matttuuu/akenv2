import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCurrentGuestsComponent } from './total-current-guests.component';

describe('TotalCurrentGuestsComponent', () => {
  let component: TotalCurrentGuestsComponent;
  let fixture: ComponentFixture<TotalCurrentGuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalCurrentGuestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalCurrentGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
