export class GetOffers {
    static readonly type = '[Offer] Get Offers';
}

export class CreateOffer {
    static readonly type = '[Offer] Create Offer';
    constructor(public payload: any) { }
}

export class DeleteOffer {
    static readonly type = '[Offer] Delete Offer';
    constructor(public id: string) { }
}
