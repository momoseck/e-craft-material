import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagnonComponent } from './compagnon.component';

describe('CompagnonComponent', () => {
  let component: CompagnonComponent;
  let fixture: ComponentFixture<CompagnonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompagnonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompagnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
