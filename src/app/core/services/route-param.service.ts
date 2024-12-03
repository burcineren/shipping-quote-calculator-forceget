import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteParamService {
  private router = inject(Router);

  getRouteParam(name: string): string {
    return this.getRouteParams()[name];
  }

  getRouteParams(): Record<string, string> {
    return this.accumulateParams(this.router.routerState.snapshot.root, 'params');
  }

  getQueryParams(): Record<string, string> {
    return this.accumulateParams(this.router.routerState.snapshot.root, 'queryParams');
  }

  private accumulateParams(snapshot: ActivatedRouteSnapshot, key: 'params' | 'queryParams'): Record<string, string> {
    let accumulatedParams: Record<string, string> = {};
    let activeRoute = snapshot;

    while (activeRoute) {
      accumulatedParams = { ...accumulatedParams, ...activeRoute[key] };
      activeRoute = activeRoute.firstChild;
    }

    return accumulatedParams;
  }
}
