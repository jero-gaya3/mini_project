import { createReducer, on } from '@ngrx/store';
import * as TicketActions from './ticket.actions';

export interface TicketState {
  tickets: any[];
}

export const initialState: TicketState = { tickets: [] };

export const ticketReducer = createReducer(
  initialState,
  on(TicketActions.loadTicketsSuccess, (state, { tickets }) => ({ ...state, tickets }))
);
