import {inject} from 'aurelia-framework'
import {Router} from 'aurelia-router';
import {UserAuthentication} from '../services/userAuthentication'

@inject(Router, UserAuthentication, 'tokenKeyName')
export class Login {
  constructor(router, userService, tokenKeyName){    
    this.router = router;
    this.userService = userService;
    this.tokenKeyName = tokenKeyName;
  }
    
  makeLogin() {
      this.userService.getToken(this.username, this.password).then(token => {        
        this.setTokenInSession(token);        
        this.router.navigate('files');
      });
  }

  setTokenInSession(token) {
    window.sessionStorage.removeItem(this.tokenKeyName);
    window.sessionStorage.setItem(this.tokenKeyName, token);
  }
}
