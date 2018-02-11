import { AjaxResponse } from 'rxjs/observable/dom/AjaxObservable';

interface ResponseState {
  code: number,
  msg: string
}

export interface Response extends AjaxResponse, DataAny {
  state: ResponseState
}