import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirtyRoomsComponent } from './dirty-rooms.component';

describe('DirtyRoomsComponent', () => {
  let component: DirtyRoomsComponent;
  let fixture: ComponentFixture<DirtyRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirtyRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirtyRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
