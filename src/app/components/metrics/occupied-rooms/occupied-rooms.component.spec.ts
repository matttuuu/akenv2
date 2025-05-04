import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupiedRoomsComponent } from './occupied-rooms.component';

describe('OccupiedRoomsComponent', () => {
  let component: OccupiedRoomsComponent;
  let fixture: ComponentFixture<OccupiedRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OccupiedRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupiedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
