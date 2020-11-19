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

  async createUser(user_name: string,
                    email: string,
                    password: string,
                    avg_wage: number,
                    num_employees: number): Promise<boolean>{

    try {
      let promise = new Promise((res, rej) => {
        // Create user auth account with firebase
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        
          //TODO: create user record in firestore

        }).catch((err) => {
          //console.log('Error creating user0', err);
          //throw "TEST"
          rej(err);
        });
      }).catch((err) => {
        console.log('Error creating user1', err);
        throw err;
      });

      await promise;

    } catch(err) {
      console.log('Error creating user2', err);
      throw err;
    }
    return(true)
  }

  // TODO: remove later
  async test(){
    var data = {
      uid: 3,       //TODO: Change once users are integrated
      name: 'test'
    }

    let promise = new Promise((res, rej) => {

      try{
        db.collection('test').doc().set(data)
          .then(() => {
            console.log('Success creating elem');
            res(1);
          });
      }catch(err){
        console.log('Error creating elem', err);
        res(0);
      }
    });

    await promise;
    console.log('WORKS');
  }
}
