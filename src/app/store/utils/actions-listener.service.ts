import { Injectable } from '@angular/core';
import { Action, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionsListenerService {

  constructor(private actionsSubject: ActionsSubject) { }

  public getAction$<T>({ type }: Action): Observable<T> {
    return this.actionsSubject
      .pipe(
        skip(1),
        filter((action: Action): boolean => this.isCurrentAction(action, type)),
        distinctUntilChanged(),
        map(data => data as unknown as T)
      )
  }

  private isCurrentAction(action: Action, actionType: string): boolean {
    return actionType === action.type;
  }
}
