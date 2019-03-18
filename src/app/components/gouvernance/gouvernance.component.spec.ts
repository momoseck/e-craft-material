import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvernanceComponent } from './gouvernance.component';

describe('GouvernanceComponent', () => {
  let component: GouvernanceComponent;
  let fixture: ComponentFixture<GouvernanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GouvernanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GouvernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
