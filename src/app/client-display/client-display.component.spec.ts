import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDisplayComponent } from './client-display.component';

describe('ClientDataComponent', () => {
  let component: ClientDisplayComponent;
  let fixture: ComponentFixture<ClientDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
