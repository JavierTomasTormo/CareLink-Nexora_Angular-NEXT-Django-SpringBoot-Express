import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminclsGuard } from './admincls.guard';

describe('adminclsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminclsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
