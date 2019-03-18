import { TestBed } from '@angular/core/testing';

import { ChambreManagerService } from './chambre-manager.service';

describe('ChambreManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChambreManagerService = TestBed.get(ChambreManagerService);
    expect(service).toBeTruthy();
  });
});
