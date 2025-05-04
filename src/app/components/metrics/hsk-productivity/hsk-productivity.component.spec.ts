import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HskProductivityComponent } from './hsk-productivity.component';

describe('HskProductivityComponent', () => {
  let component: HskProductivityComponent;
  let fixture: ComponentFixture<HskProductivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HskProductivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HskProductivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
