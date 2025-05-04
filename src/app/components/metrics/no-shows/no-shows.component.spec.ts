import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoShowsComponent } from './no-shows.component';

describe('NoShowsComponent', () => {
  let component: NoShowsComponent;
  let fixture: ComponentFixture<NoShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoShowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
