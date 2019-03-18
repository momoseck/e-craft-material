import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentgouvernanceComponent } from './agentgouvernance.component';

describe('AgentgouvernanceComponent', () => {
  let component: AgentgouvernanceComponent;
  let fixture: ComponentFixture<AgentgouvernanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentgouvernanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentgouvernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
