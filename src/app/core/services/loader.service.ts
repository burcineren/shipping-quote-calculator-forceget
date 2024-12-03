import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, mergeWith } from 'rxjs';
import { Actions, ofActionCanceled, ofActionDispatched, ofActionErrored, ofActionSuccessful } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private router = inject(Router);
  private actions = inject(Actions);

  private loader = signal(false);

  layoutLoading = computed(() => this.routerLoading() || this.actionsLoading() || this.loader());

  // When these actions are dispatched, the loader will be shown
  ActionsToListen = signal([]);

  private actionsLoading = toSignal(
    this.actions.pipe(
      ofActionDispatched(...this.ActionsToListen()),
      map(() => true),
      mergeWith(
        this.actions.pipe(
          ofActionCanceled(...this.ActionsToListen()),
          map(() => false),
        ),
        this.actions.pipe(
          ofActionErrored(...this.ActionsToListen()),
          map(() => false),
        ),
        this.actions.pipe(
          ofActionSuccessful(...this.ActionsToListen()),
          map(() => false),
        ),
      ),
    ),
  );

  private routerLoading = toSignal(
    this.router.events.pipe(
      filter(
        (event) =>
          event instanceof NavigationStart ||
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError,
      ),
      map((event) => event instanceof NavigationStart),
    ),
  );

  hideLoader() {
    this.loader.set(false);
  }

  showLoader() {
    this.loader.set(true);
  }
}
