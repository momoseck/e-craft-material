import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptableComponentComponent } from './comptable-component.component';

describe('ComptableComponentComponent', () => {
  let component: ComptableComponentComponent;
  let fixture: ComponentFixture<ComptableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptableComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
