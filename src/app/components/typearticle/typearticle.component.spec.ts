import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypearticleComponent } from './typearticle.component';

describe('TypearticleComponent', () => {
  let component: TypearticleComponent;
  let fixture: ComponentFixture<TypearticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypearticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypearticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
