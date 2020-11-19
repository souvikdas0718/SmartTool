export class User {
    uid: number;
    user_name: string;
    email: string;
    avg_wage: number;
    num_employees: number;

    constructor() {
        this.uid = -1;
        this.user_name = "";
        this.email = "";
        this.avg_wage = 0;
        this.num_employees = 0;
    }

    // Adds data to empty User object
    setData(uid: number, user_name: string, email: string, avg_wage: number, num_employees: number) {
        this.uid = uid;
        this.user_name = user_name;
        this.email = email;
        this.avg_wage = avg_wage;
        this.num_employees = num_employees;
    }

    setUID(uid: number){ this.uid = uid; }
    getUID(): number { return this.uid; }

    setUsername(user_name: string) { this.user_name = user_name; }
    getUsername(): string { return this.user_name; }

    setEmail(email: string) { this.email = email; }
    getEmail(): string { return this.email; }

    setAvgWage(avg_wage: number) { this.avg_wage = avg_wage; }
    getAvgWage(): number { return this.avg_wage; }

    setNumEmployees(num_employees: number) { this.num_employees = num_employees; }
    getNumEmployees(): number { return this.num_employees; }
}
