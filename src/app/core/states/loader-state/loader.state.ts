import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoaderAddAction, LoaderProgressAction, LoaderRemoveAction } from './loader.actions';
import { LoaderProgressType } from '@beng-core/types/loader-progress';
import { LoaderStateType } from './loader-state.type';

@Injectable()
@State<LoaderStateType>({
  name: 'LoaderState',
  defaults: {
    list: [],
    progress: [],
  },
})
export class LoaderState {
  @Selector()
  static getList({ list }: LoaderStateType) {
    return list;
  }

  static getOne(item: string) {
    return createSelector([LoaderState], ({ list }: LoaderStateType) => {
      return list.some((key) => key === item);
    });
  }

  static getAny(items: string[]) {
    return createSelector([LoaderState], ({ list }: LoaderStateType) => {
      return list.some((key) => items.indexOf(key) >= 0);
    });
  }

  static getProgress(item: LoaderProgressType) {
    return createSelector([LoaderState], ({ progress }: LoaderStateType) => progress.find(({ id }) => id === item.id));
  }

  @Action(LoaderAddAction)
  addItem({ getState, patchState }: StateContext<LoaderStateType>, { payload }: LoaderAddAction) {
    const { list } = getState();
    patchState({
      list: filterList(list, payload).concat(payload),
    });
  }

  @Action(LoaderProgressAction)
  progressItem({ getState, patchState }: StateContext<LoaderStateType>, { payload }: LoaderProgressAction) {
    const { progress } = getState();
    patchState({
      progress: filterProgress(progress, payload).concat(payload.status != null ? payload : []),
    });
  }

  @Action(LoaderRemoveAction)
  removeItem({ getState, patchState }: StateContext<LoaderStateType>, { payload }: LoaderRemoveAction) {
    const { list } = getState();
    patchState({
      list: filterList(list, payload),
    });
  }
}

function filterList(list: string[], payload: string[] | string) {
  if (Array.isArray(payload)) {
    return list.filter((name) => payload.indexOf(name) < 0);
  }

  return list.filter((name) => name !== payload);
}

function filterProgress(progress: LoaderProgressType[], payload: LoaderProgressType) {
  return progress.filter(({ id }) => id !== payload.id);
}
