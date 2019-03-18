import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvernanceComponentComponent } from './gouvernance-component.component';

describe('GouvernanceComponentComponent', () => {
  let component: GouvernanceComponentComponent;
  let fixture: ComponentFixture<GouvernanceComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GouvernanceComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GouvernanceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
