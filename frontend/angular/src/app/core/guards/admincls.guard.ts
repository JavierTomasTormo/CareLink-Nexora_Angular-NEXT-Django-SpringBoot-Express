import { CanActivateFn } from '@angular/router';

export const adminclsGuard: CanActivateFn = (route, state) => {
  return true;
};
