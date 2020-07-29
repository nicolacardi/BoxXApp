export interface currentUser {
    userID: string;
    fullname: string;
    email: string;
    username: string;
    badge: string;
    token?: string;
}

export interface todoEvent{
    id: number;
    userID: string;
    causaleID: number;
    ticketID: number;
    //objTicket: ticket;
    isClosed: boolean;
    titolo: string;
    dettagli: string;
    dt?: Date;
    h_Ini?: Date;
}

export interface ticket {
    id: number;
    n_Ticket: string;
    tipoTicket: string;
    statoTicket: string;
    badge: string;
    data1: Date;
    customerID: number;
    customer: Customer;
    poi: string;
}

export interface Customer {
    id:number;
    codice: string;
    ragsoc: string;
    indirizzo: string;
    citta: string;
    prov: string;
    nazione: string;
    poi: string;
}