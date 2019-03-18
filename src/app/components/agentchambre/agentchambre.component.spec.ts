import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentchambreComponent } from './agentchambre.component';

describe('AgentchambreComponent', () => {
  let component: AgentchambreComponent;
  let fixture: ComponentFixture<AgentchambreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentchambreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentchambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
