import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledReservationsComponent } from './canceled-reservations.component';

describe('CanceledReservationsComponent', () => {
  let component: CanceledReservationsComponent;
  let fixture: ComponentFixture<CanceledReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CanceledReservationsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CanceledReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
