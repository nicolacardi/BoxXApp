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