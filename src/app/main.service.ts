import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';

// Datatype definitions
import { environment } from '../environments/environment'
import { User } from './user'

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
}
