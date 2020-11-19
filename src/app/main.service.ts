import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

// Datatype definitions
import { environment } from '../environments/environment'

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
