import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TicketActions from './ticket.actions';
import { ApiService } from '../services/api.service';
import { mergeMap, map, EMPTY } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class TicketEffects {
  loadTickets$; // Declare first

  constructor(
    private actions$: Actions,
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('🧩 TicketEffects created');
    console.log('✅ Actions$: ', this.actions$);
    console.log('✅ ApiService: ', this.api);

    // ✅ Now we can safely check after platformId is initialized
    if (isPlatformBrowser(this.platformId)) {
      this.loadTickets$ = createEffect(() =>
        this.actions$.pipe(
          ofType(TicketActions.loadTickets),
          mergeMap(() =>
            this.api.getAllTickets().pipe(
              map(tickets => TicketActions.loadTicketsSuccess({ tickets }))
            )
          )
        )
      );
    } else {
      console.warn('🚫 Skipping TicketEffects on SSR');
      this.loadTickets$ = EMPTY as any; // safely define as empty
    }
  }
}
