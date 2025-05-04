import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfOrderRoomsComponent } from './out-of-order-rooms.component';

describe('OutOfOrderRoomsComponent', () => {
  let component: OutOfOrderRoomsComponent;
  let fixture: ComponentFixture<OutOfOrderRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutOfOrderRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutOfOrderRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
