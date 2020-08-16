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


export interface ticketDetail {
    id: number;
    ticketID: number;
    causaleID: number;
    causale: ticketCausale;
    dt: Date;
    h_Ini: Date;
    h_End: Date;
    note;
}

export interface ticketCausale {
    id: number;
    causaleDesc: string;
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

export interface mission{
    id: number;
    userID: string;
    descrizione: string;
    stato: string;

    valutaID: number;
    dtIns?: Date;
    dtSub?: Date;
    dtClosed?: Date;
}


export interface missionDetail{
    id: number;
    missionID: number;

    causaleID: number;
    objCausale: missionCausale;

    valutaID: number;
    objValuta: currency;

    ticketID: number;
    objTicket: ticket;

    tipoPagamento: string;
    importo: number;
    dt: Date;

    stato: string;
    note: string;

    dtIns: Date;
    dtSub: Date;
    dtClosed: Date;
}


export interface missionCausale{
    id: number;
    causaleDesc: string;
    seq: number;
}

export interface currency{
    id: number;
    codice: string;
    descrizione: string;
}
	 
 
