import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';

// Datatype definitions
import { environment } from '../environments/environment';
import { User } from './user';
import { Client } from './client';

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

  constructor() { }

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
                    start_date: string,
                    end_date:string,
                    revenue: number){
    //TODO: Contact backend and retrieve response
  }

  /**
   * @param user_id ID of the current user of application
   * @returns       All client records for given user
   */
  async getClients(user_id: string): Promise<Client[]> {

    var clients = [];
    let promise = new Promise((res, rej) => {
      try {

        // Placeholder data retreival
        // TODO: remove once backend available
        var n = ['amd', 'rty', 'cisco', 'ewra', 'tre']
        var std = [new Date('2020-01-01'),
                new Date('2020-01-01'),
                new Date('2020-01-01'),
                new Date('2020-01-01'),
                new Date('2020-01-01')]
        var etd = [new Date('2020-01-12'),
                new Date('2020-01-12'),
                new Date('2020-01-12'),
                new Date('2020-01-12'),
                new Date('2020-01-12')];
        var rev = [10, 1000, 10000, 20000, 30000]
        for (var i = 0; i < 5; i++) {
          var new_client = new Client();
          new_client.setData('' + i, n[i], std[i], etd[i], rev[i]);
          clients.push(new_client);
        }
        /////////////////////////////////
        // TODO: Retrieve client data from backend
        res(clients)

      } catch(err) {
        console.log('Error getting client data', err)
        rej(clients)
      }
    });

    await promise;
    return clients;
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
  }
}
