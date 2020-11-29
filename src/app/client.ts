export class Client {
    client_id: string;
    client_name: string;
    start_date: Date;
    end_date: Date;
    revenue: number;
    is_active: boolean;

    constructor() {
        this.client_id = "";
        this.client_name = "";
        this.start_date = new Date();
        this.end_date = new Date();
        this.revenue = 0;
        this.is_active = false;
    }

    // Adds data to empty Client object
    setData(client_id: string,
            client_name: string,
            start_date: Date,
            end_date: Date,
            revenue: number,
            is_active: boolean) {

        this.client_id = client_id;
        this.client_name = client_name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.revenue = revenue;    
        this.is_active = is_active;
    } 
}
