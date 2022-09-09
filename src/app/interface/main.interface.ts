export interface Summary {
    totalQuantity: number;
    totalAmount: number;
    totalNetAmount: number;
    totalAverageAmount: number;
    initialDate: string;
    finalDate: string;
}

export interface Pagination {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    numPages: number;
    lastPage: boolean;
    firstPage: boolean;
}

export interface Item {
    id: string;
    merchantId: string;
    paymentNode: number;
    cnpjRoot: number;
    date: Date;
    paymentType: string;
    cardBrand: string;
    authorizationCode: string;
    truncatedCardNumber: string;
    grossAmount: number;
    netAmount: number;
    terminal: string;
    administrationFee: number;
    channelCode: number;
    channel: string;
    withdrawAmount: number;
    minimumMDRAmmount: number;
    mdrTaxAmount: number;
    mdrFeeAmount: number;
    status: string;
}

export interface Main {
    summary: Summary;
    pagination: Pagination;
    items: Item[];
}
