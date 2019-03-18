import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambreComponentComponent } from './chambre-component.component';

describe('ChambreComponentComponent', () => {
  let component: ChambreComponentComponent;
  let fixture: ComponentFixture<ChambreComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChambreComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChambreComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
