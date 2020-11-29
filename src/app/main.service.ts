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
          revenue: revenue
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
  async getClients(user_id: string): Promise<Client[]> {
    var client_list = [];
    let promise = new Promise((res, rej) => {
      try {

        let current_uid = this.cookieService.get('current_user');
        db.collection('Users').doc(current_uid).collection('Clients').get().then((clients) => {
            clients.forEach((client) => {
              var client_data = client.data();
              var new_client = new Client();
              new_client.setData(client.id, client_data.client_name, client_data.start_date,
                                  client_data.end_date, client_data.revenue);
              client_list.push(new_client);

            });
            // sorting client records by date
            client_list.sort((a, b) => {return b.start_date - a.start_date});
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
          revenue: client.revenue
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

        // TODO: Send remove client request to backend
        console.log(client_id);

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
            // sorting client records by date
            revenue_records.sort((a, b) => {return b.date - a.date});
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

        //TODO: contact backend to add record
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

        //TODO: contact backend to edit record

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

        //TODO: contact backend to remove record
        
      } catch(err) {
        console.log('Error adding revenue record', err);
        rej();
      }
    });

    await promise;
  }
}


