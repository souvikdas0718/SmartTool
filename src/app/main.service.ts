import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

// Datatype definitions
import { environment } from '../environments/environment';
import { User } from './user';
import { Client } from './client';
import { UserRevenue } from './userRevenue';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

// Initialize Firebase
var project = firebase.initializeApp(environment.firebaseConfig);
var db = project.firestore();

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private dbUrl = environment.apiURL;

  constructor(private cookieService: CookieService) { }

  /**
   *
   * Creates firebase user-auth record, and firebase user record
   * @param user_name     Name of company user
   * @param email         Email address for login creds
   * @param password      Password for login creds
   * @param avg_wage      Average of monthly wage costs per employee in company
   * @param num_employees Number of employees working for company
   * @returns user's uid
   *
   */
  async createUser(user_name: string,
                    email: string,
                    password: string,
                    avg_wage: number,
                    num_employees: number): Promise<string>{

    try {
      let promise = new Promise((res, rej) => {
        // Create user auth account with firebase
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {

          // Create user record in firestore
          var new_user = new User();
          new_user.setData(user.user.uid, user_name, email, avg_wage, num_employees);
          db.collection('Users').doc(new_user.uid).set(Object.assign({}, new_user)).then((user) => {
            console.log('Success creating new user');
            res(new_user.getUID());

          }).catch((err) => { rej(err); });
        }).catch((err) => { rej(err); });
      }).catch((err) => { throw err; });

      let result = await promise;
      return(result + "");

    } catch(err) { throw err; }
  }

  /**
   * Logs user into application
   * @param email     Email address for login creds
   * @param password  Password for login creds
   * @returns         Firestore user record
   */
  async login(email: string, password: string): Promise<string> {
    try {
      let promise = new Promise((res, rej) => {

        // Check for user-auth record
        firebase.auth().signInWithEmailAndPassword(email, password).then((user_auth) => {

          // Retrieve firestore user record
          db.collection('Users').doc(user_auth.user.uid).get().then((user) => {
            if(user.exists){
              res(user.data().uid);

            } else { rej("Firestore user record not found"); }
          }).catch((err) => { rej(err); });
        }).catch((err) => { rej(err); });
      }).catch((err) => { throw err; });

      let result = await promise;
      return(result + "");

    } catch(err) { throw err; }
  }

  /**
   * Adds client record under current user 
   * @param client_name name of the client
   * @param start_date  start date of the client's contract
   * @param end_date    end date of the client's contract
   * @param revenue     total revenue attributed with new client contract
   */
  async addClient(client_name: string,
                    start_date: Date,
                    end_date: Date,
                    revenue: number){
    
    let promise = new Promise((res, rej) => {

      try{
        let current_uid = this.cookieService.get('current_user');
        var new_client = {
          client_name: client_name,
          start_date: start_date,
          end_date: end_date,
          revenue: revenue,
          is_active: true
        }
        db.collection('Users').doc(current_uid).collection('Clients').doc().set(new_client)
        .then(() => {
          console.log('Success creating client record');
          res(1);
        });

      } catch(err){
        console.log("Error creating client record.");
        res(0);
      }
    });

    await promise;
  }

  /**
   * @param user_id ID of the current user of application
   * @returns       All client records for given user
   */
  async getClients(user_id: string, get_deleted=false): Promise<Client[]> {
    var client_list = [];
    let promise = new Promise((res, rej) => {
      try {

        let current_uid = this.cookieService.get('current_user');
        db.collection('Users').doc(current_uid).collection('Clients').get().then((clients) => {
            clients.forEach((client) => {
              var client_data = client.data();
              var new_client = new Client();
              new_client.setData(client.id, client_data.client_name, client_data.start_date,
                                  client_data.end_date, client_data.revenue, client_data.is_active);
            
              if(new_client.is_active || get_deleted) { client_list.push(new_client); }
            });
            // sorting client records by start date
            client_list.sort((a, b) => { return new Date(a.start_date).getTime() - new Date(b.start_date).getTime(); });
            res(client_list);
          });

      } catch(err) {
        console.log('Error getting client data', err)
        rej(client_list)
      }
    });

    await promise;
    return client_list;
  }

  /**
   * 
   * @param client Client object to be updated
   */
  async editClient(client: Client) {
    
    let promise = new Promise((res, rej) => {
      try {
        
        let current_uid = this.cookieService.get('current_user');

        var updated_client = {
          client_name: client.client_name,
          start_date: client.start_date,
          end_date: client.end_date,
          revenue: client.revenue,
          is_active: true
        }
        db.collection('Users').doc(current_uid).collection('Clients').doc(client.client_id).set(updated_client)
          .then(() => {
            console.log('Success updating client record');
            res(1);
          });

      } catch(err) {
        console.log('Error editing client record', err);
        rej();
      }
    });
  }

  /**
   * 
   * @param client_id client id to be removed
   */
  async removeClient(client_id: string) {
    
    let promise = new Promise((res, rej) => {
      try {

        let current_uid = this.cookieService.get('current_user');


        db.collection('Users').doc(current_uid).collection('Clients').doc(client_id).get().then((client_snap) => {
          let client_data = client_snap.data();
          var removed_client = {
            client_name: client_data.client_name,
            start_date: client_data.start_date,
            end_date: client_data.end_date,
            revenue: client_data.revenue,
            is_active: false
          }
          db.collection('Users').doc(current_uid).collection('Clients').doc(client_id).set(removed_client)
            .then(() => {
              console.log('Success removing client record');
              res(1);
            });
        });

      } catch(err) {
        console.log('Error removing client record', err);
        rej();
      }
    });

    await promise;
  }

  /**
   * 
   * @param uid user id of current user 
   */
  async getRevenue(uid: string): Promise<UserRevenue[]> {
    
    var revenue_records = [];
    let promise = new Promise((res, rej) => {
      try {

        let current_uid = this.cookieService.get('current_user');
        db.collection('Users').doc(current_uid).collection('Revenue').get().then((reports) => {
            reports.forEach((report) => {
              var revenue_data = report.data();
              var new_revenue = new UserRevenue();
              new_revenue.setData(report.id, revenue_data.date, revenue_data.office_costs,
                                    revenue_data.wage_costs, revenue_data.marketing_costs,
                                    revenue_data.other_costs, revenue_data.operation_costs,
                                    revenue_data.revenue);
              revenue_records.push(new_revenue);

            });

            // Sorting records by date
            revenue_records = revenue_records.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
            res(revenue_records);
          });
      } catch(err) {
        console.log('Error adding revenue record', err);
        rej();
      }
    });

    await promise;
    return revenue_records;
  }

  /**
   * creates new revenue report
   * @param date 
   * @param office_costs 
   * @param wage_costs 
   * @param marketing_costs 
   * @param other_costs 
   * @param operation_costs 
   * @param revenue 
   */
  async createRevenue(date, office_costs, wage_costs, marketing_costs, other_costs, operation_costs, revenue){
    let promise = new Promise((res, rej) => {
      try {

        let current_uid = this.cookieService.get('current_user');
        var new_revenue = {
          date: date,
          office_costs: office_costs,
          wage_costs: wage_costs,
          marketing_costs: marketing_costs,
          other_costs: other_costs,
          operation_costs: operation_costs,
          revenue: revenue
        }

        db.collection('Users').doc(current_uid).collection('Revenue').doc().set(new_revenue)
        .then(() => {
          console.log('Success creating revenue record');
          res(1);
        });
        
      } catch(err) {
        console.log('Error adding revenue record', err);
        rej();
      }
    });

    await promise;
  }

  /**
   * updates revenue report
   * @param revenue updated revenue record
   */
  async editRevenue(revenue: UserRevenue){
    let promise = new Promise((res, rej) => {
      try {

        let current_uid = this.cookieService.get('current_user');
        var updated_revenue = {
          date: revenue.date,
          office_costs: revenue.office_costs,
          wage_costs: revenue.wage_costs,
          marketing_costs: revenue.marketing_costs,
          other_costs: revenue.other_costs,
          operation_costs: revenue.operation_costs,
          revenue: revenue.revenue
        }

        db.collection('Users').doc(current_uid).collection('Revenue').doc(revenue.uid).set(updated_revenue).then(() => {
          console.log('Success updating revenue record');
          res(1);
        });

      } catch(err) {
        console.log('Error adding revenue record', err);
        rej();
      }
    });

    await promise;
  }

  /**
   * 
   * @param revenue_id id of revenue record to delete
   */
  async removeRevenue(revenue_id: string){
    let promise = new Promise((res, rej) => {
      try {
        let current_uid = this.cookieService.get('current_user');
        db.collection('Users').doc(current_uid).collection('Revenue').doc(revenue_id).delete()
        .then(() => {
          console.log('Success deleting revenue record');
          res(1);
        });
        
      } catch(err) {
        console.log('Error deleting revenue record', err);
        rej();
      }
    });

    await promise;
  }

  async getProfitPerMonth(): Promise<number[]> {
    var profit_vec = [];
    let current_uid = this.cookieService.get('current_user');
    let promise = new Promise((res, rej) => {
      try {

        this.getRevenue(current_uid).then((revenue_records) => {
          var record_dates = [];
          var profit = [];
          revenue_records.forEach((record) => {
            record_dates.push(record.date)
            profit.push(record.revenue - (record.marketing_costs +
                                            record.office_costs +
                                            record.operation_costs +
                                            record.other_costs +
                                            record.wage_costs))
          });
          profit_vec.push(record_dates, profit);
        });
        res(profit_vec);

      } catch(err) {
        rej();
      }
    });

    await promise;
    return profit_vec;
  }

  async getRevenuePerMonth(): Promise<number[][]> {
    var revenue_vec = [];
    let current_uid = this.cookieService.get('current_user');

    let promise = new Promise((res, rej) => {
      try {

        this.getRevenue(current_uid).then((revenue_records) => {
          var record_dates = [];
          var revenue = [];
          revenue_records.forEach((record) => {
            record_dates.push(record.date)
            revenue.push(record.revenue)
          });
          revenue_vec.push(record_dates, revenue)
        });
        res(revenue_vec);

      } catch(err) {
        rej();
      }
    });

    await promise;
    return revenue_vec;
  }

  async getCostsPerMonth(): Promise<number[][]> {
    var costs_vec = [];
    let current_uid = this.cookieService.get('current_user');

    let promise = new Promise((res, rej) => {
      try {

        this.getRevenue(current_uid).then((revenue_records) => {
          var record_dates = [];
          var costs = [];
          revenue_records.forEach((record) => {
            record_dates.push(record.date);
            costs.push(record.marketing_costs +
                          record.office_costs +
                          record.operation_costs +
                          record.other_costs +
                          record.wage_costs)
          
          });
          costs_vec.push(record_dates, costs)
        });
        res(costs_vec);

      } catch(err) {
        rej();
      }
    });

    await promise;
    return costs_vec;
  }

  async getCostsBreakdown(): Promise<number[]>{
    var costs_breakdown = []
    var costs_labels = ['Office Costs', 'Wage Costs', 'Marketing Costs', 'Operations Costs', 'Other Costs']
    let current_uid = this.cookieService.get('current_user');
    let promise = new Promise((res, rej) => {
      try {

        this.getRevenue(current_uid).then((revenue_records) => {
          var office_costs = [];
          var wage_costs = [];
          var marketing_costs = [];
          var operation_costs = [];
          var other_costs = []
          revenue_records.forEach((record) => {
            office_costs.push(record.office_costs);
            wage_costs.push(record.wage_costs);
            marketing_costs.push(record.marketing_costs);
            operation_costs.push(record.operation_costs);
            other_costs.push(record.other_costs)
          });

          // pushing sum of each cost array
          costs_breakdown.push(costs_labels, [office_costs.reduce((a, b) => a + b, 0),
                                              wage_costs.reduce((a, b) => a + b, 0),
                                              marketing_costs.reduce((a, b) => a + b, 0),
                                              operation_costs.reduce((a, b) => a + b, 0),
                                              other_costs.reduce((a, b) => a + b, 0)]);
        });
        res(costs_breakdown);

      } catch(err) {
        rej();
      }
    });
    
    await promise;
    return costs_breakdown;
  }

  async getClientsPerMonth(): Promise<number[]>{
    var clients_vec = [];
    let current_uid = this.cookieService.get('current_user');

    let promise = new Promise((res, rej) => {
      try {
        this.getClients(current_uid, true).then((client_records) => {
          var client_date_vec = [];
          var client_count_vec = [];
          var start_dates = [];          
          var end_dates = [];

          client_records.forEach((record) => {
            //console.log(record.start_date)
            start_dates.push(new Date(record.start_date));
            end_dates.push(new Date(record.end_date));
          });

          // sorting end dates as client records are sorted by start date
          end_dates.sort((a, b) => { return a.getTime() - b.getTime(); });

          var current_clients = 0;
          var curr_start: Date;
          while(start_dates.length > 0 || end_dates.length > 0) {
          
            // make sure start dates has records else use up all end dates
            if(start_dates.length > 0) {
              curr_start = start_dates.shift()
              current_clients += 1;

              // Count up all start dates in month and year of curr_start
              while(start_dates[0] && curr_start.getUTCMonth() == start_dates[0].getUTCMonth() && curr_start.getUTCFullYear() == start_dates[0].getUTCFullYear()) {
                start_dates.shift()
                current_clients += 1;
              }
              
              // create client record with month
              client_date_vec.push(curr_start.getUTCFullYear() + "-" + (curr_start.getUTCMonth() + 1))
              client_count_vec.push(current_clients);

              // search for end dates in month and year and subtract 
              while(curr_start.getUTCMonth() == end_dates[0].getUTCMonth() && curr_start.getUTCFullYear() == end_dates[0].getUTCFullYear()) {
                end_dates.shift()
                current_clients -= 1;
              }

            } else {
              // Checking for remaining end dates with month and/or years less than current date
              var current_date = new Date();
              if((end_dates[0].getUTCMonth() < current_date.getUTCMonth() && end_dates[0].getUTCFullYear() == current_date.getUTCFullYear()) || end_dates[0].getUTCFullYear() < current_date.getUTCFullYear()) {
                var end_date = end_dates.shift();
                current_clients -= 1;

                // Getting all other end dates of same month & year
                while(end_dates[0] && end_date.getUTCMonth() == end_dates[0].getUTCMonth() && end_date.getUTCFullYear() == end_dates[0].getUTCFullYear()) {
                  var end_date = end_dates.shift();
                  current_clients -= 1;
                }

                // create client record with month
                client_date_vec.push(end_date.getUTCFullYear()+ "-" + (end_date.getUTCMonth() + 2))
                client_count_vec.push(current_clients);

              } else {
                break;
              }
            }
          }

          clients_vec.push(client_date_vec, client_count_vec);
          res(client_records);
        });
      } catch(err) {
        rej();
      }
    });

    await promise;
    return clients_vec;
  }
}


