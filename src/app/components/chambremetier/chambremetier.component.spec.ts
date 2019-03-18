import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambremetierComponent } from './chambremetier.component';

describe('ChambremetierComponent', () => {
  let component: ChambremetierComponent;
  let fixture: ComponentFixture<ChambremetierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChambremetierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChambremetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
