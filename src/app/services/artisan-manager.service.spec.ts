import { TestBed } from '@angular/core/testing';

import { ArtisanManagerService } from './artisan-manager.service';

describe('ArtisanManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtisanManagerService = TestBed.get(ArtisanManagerService);
    expect(service).toBeTruthy();
  });
});
