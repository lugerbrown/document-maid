import {inject} from 'aurelia-framework'
import { json } from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject("httpClient", Router)
export class Login {
  constructor(http, router){
    this.http = http;
    this.router = router;
  }
  activate(){

  }

  getToken(){
    var promise = new Promise((resolve, reject) => {
        this.http
        .fetch("auth/token/login",{
          method:'post',
          body:json({'username':this.username, 'password':this.password})
        })
        .then(response => response.json())
        .then(tokenObject => {          
          resolve(tokenObject.auth_token);
        })
        .catch(error => {
          reject(error);
        });

      });    
    return promise;
  }

  setClientHeader(){
    this.http.configure(config => {
    config
       .withDefaults({        
        headers: {
          'Authorization': `token ${this.token}`
        }
      })
  });
  }

  makeLogin() {
      this.getToken().then(token => {
        this.token = token;
        this.setTokenInSession();
        this.setClientHeader();
        this.router.navigate('files');
      });
  }

  setTokenInSession() {
    window.sessionStorage.removeItem('userToken');
    window.sessionStorage.setItem('userToken', this.token);
  }
}
