import {inject} from 'aurelia-framework'
import { json } from 'aurelia-fetch-client';

@inject("httpClient")
export class UserAuthentication {
  constructor(http){
    this.http = http;
  }

  getToken(username, password){
    var promise = new Promise((resolve, reject) => {
        this.http
        .fetch("auth/token/login",{
          method:'post',
          body:json({'username':username, 'password':password})
        })
        .then(response => response.json())
        .then(tokenObject => {          
          this.setClientHeader(tokenObject.auth_token);
          resolve(tokenObject.auth_token);
        })
        .catch(error => {
          reject(error);
        });

      });    
    return promise;
  }

  setClientHeader(token) {
    this.http.configure(config => {
    config
       .withDefaults({        
        headers: {
          'Authorization': `token ${token}`
        }
      })
  });
  }

}
