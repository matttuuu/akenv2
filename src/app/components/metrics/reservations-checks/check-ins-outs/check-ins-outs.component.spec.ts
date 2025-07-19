import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInsOutsComponent } from './check-ins-outs.component';

describe('CheckInsOutsComponent', () => {
  let component: CheckInsOutsComponent;
  let fixture: ComponentFixture<CheckInsOutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CheckInsOutsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CheckInsOutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
