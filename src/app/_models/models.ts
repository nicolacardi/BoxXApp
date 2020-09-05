import { MissionsListPage } from '../missions/missions-list/missions-list.page'

export interface currentUser {
    userID: string;
    fullname: string;
    email: string;
    username: string;
    badge: string;
    token?: string;
}

export interface customer {
    id:number;
    codice: string;
    ragsoc: string;
    indirizzo: string;
    citta: string;
    prov: string;
    nazione: string;
    poi: string;
}

export interface currency{
    id: number;
    codice: string;
    descrizione: string;
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

//#region Tickets

export interface ticket {
    id: number;
    n_Ticket: string;
    tipoTicket: string;
    statoTicket: string;
    badge: string;
    data1: Date;
    customerID: number;
    customer: customer;
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

export interface ticketSignature {
    id: number;
    ticketID: number;
    signature: string;
    dtIns: Date;
}

export interface ticketPhoto {
    id: number;
    ticketID: number;
    ticketDetailID: number;
    photo: string;
    dtIns: Date;
}

export interface ticketCausale {
    id: number;
    causaleDesc: string;
}

//#endregion

//#region Missions
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

//#endregion

	 
 
