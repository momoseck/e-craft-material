import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GieComponent } from './gie.component';

describe('GieComponent', () => {
  let component: GieComponent;
  let fixture: ComponentFixture<GieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
