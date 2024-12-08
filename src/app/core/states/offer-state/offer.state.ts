import { Action, Selector, State, StateContext } from "@ngxs/store";
import { OfferStateModel } from "./offer-state.type";
import { Injectable } from "@angular/core";
import { OfferService } from "@beng-core/services/offer.service";
import { catchError, tap, throwError } from "rxjs";
import { CreateOffer, DeleteOffer, GetOffers } from "./offer.actions";

@State<OfferStateModel>({
    name: 'offer',
    defaults: {
      offers: [],
      isLoading: false,
      error: null,
    },
  })
  @Injectable()
  export class OfferState {
    constructor(private offerService: OfferService) {}
  
    // Selectors
    @Selector()
    static offers(state: OfferStateModel): any[] {
      return state.offers;
    }
  
    @Selector()
    static isLoading(state: OfferStateModel): boolean {
      return state.isLoading;
    }
  
    @Selector()
    static error(state: OfferStateModel): string | null {
      return state.error;
    }
  
    // Actions
    @Action(GetOffers)
    getOffers(ctx: StateContext<OfferStateModel>) {
      ctx.patchState({ isLoading: true, error: null });
      return this.offerService.getOffers().pipe(
        tap((offers) => {
          ctx.patchState({ offers, isLoading: false });
        }),
        catchError((error) => {
          ctx.patchState({ isLoading: false, error: error.message });
          return throwError(() => error);
        })
      );
    }
  
    @Action(CreateOffer)
    createOffer(ctx: StateContext<OfferStateModel>, action: CreateOffer) {
      ctx.patchState({ isLoading: true, error: null });
      return this.offerService.createOffer(action.payload).pipe(
        tap((newOffer) => {
          const state = ctx.getState();
          ctx.patchState({
            offers: [...state.offers, newOffer],
            isLoading: false,
          });
        }),
        catchError((error) => {
          ctx.patchState({ isLoading: false, error: error.message });
          return throwError(() => error);
        })
      );
    }
  
    @Action(DeleteOffer)
    deleteOffer(ctx: StateContext<OfferStateModel>, action: DeleteOffer) {
      ctx.patchState({ isLoading: true, error: null });
      return this.offerService.deleteOffer(action.id).pipe(
        tap(() => {
          const state = ctx.getState();
          ctx.patchState({
            offers: state.offers.filter((offer) => offer.id !== action.id),
            isLoading: false,
          });
        }),
        catchError((error) => {
          ctx.patchState({ isLoading: false, error: error.message });
          return throwError(() => error);
        })
      );
    }
  }