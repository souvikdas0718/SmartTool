import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAnalyticsComponent } from './graph-analytics.component';

describe('GraphAnalyticsComponent', () => {
  let component: GraphAnalyticsComponent;
  let fixture: ComponentFixture<GraphAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
