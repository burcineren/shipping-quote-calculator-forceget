import { LoaderProgressType } from '@beng-core/types/loader-progress';
import { RestError } from '@beng-core/types/rest';

export class LoaderAddAction {
  static readonly type = '[Loader] LoaderAddAction';

  constructor(public payload: string[] | string) {}
}

export class LoaderRemoveAction {
  static readonly type = '[Loader] LoaderRemoveAction';

  constructor(public payload: string[] | string) {}
}

export class LoaderProgressAction {
  static readonly type = '[Loader] LoaderProgressAction';

  constructor(public payload: LoaderProgressType) {}
}

export class RestErrorAction {
  static readonly type = '[Rest] RestErrorAction';

  constructor(public payload: RestError) {}
}
