import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutsComponent } from './check-outs.component';

describe('CheckOutsComponent', () => {
  let component: CheckOutsComponent;
  let fixture: ComponentFixture<CheckOutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CheckOutsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
