import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPickupsComponent } from './daily-pickups.component';

describe('DailyPickupsComponent', () => {
  let component: DailyPickupsComponent;
  let fixture: ComponentFixture<DailyPickupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyPickupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
