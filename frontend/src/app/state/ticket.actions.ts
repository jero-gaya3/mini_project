import { createAction, props } from '@ngrx/store';

export const loadTickets = createAction('[Ticket] Load');
export const loadTicketsSuccess = createAction('[Ticket] Load Success', props<{ tickets: any[] }>());
export const assignTicket = createAction('[Ticket] Assign', props<{ id: number, techId: number }>());
export const updateStatus = createAction('[Ticket] Update Status', props<{ id: number, status: string }>());
