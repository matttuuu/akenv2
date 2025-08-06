import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousDayComponentComponent } from './previous-day-component.component';

describe('PreviousDayComponentComponent', () => {
  let component: PreviousDayComponentComponent;
  let fixture: ComponentFixture<PreviousDayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviousDayComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousDayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
