import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueDisplayComponent } from './revenue-display.component';

describe('RevenueDisplayComponent', () => {
  let component: RevenueDisplayComponent;
  let fixture: ComponentFixture<RevenueDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
