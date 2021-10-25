import {inject} from 'aurelia-framework'
import {Router} from 'aurelia-router';
import {UserAuthentication} from '../services/userAuthentication'

@inject(Router, UserAuthentication, 'tokenKeyName')
export class Login {
  constructor(router, userService, tokenKeyName){    
    this.router = router;
    this.userService = userService;
    this.tokenKeyName = tokenKeyName;
    this.validPassword = true;
    this.validUser = true;
    this.password = '';
    this.username = '';
  }
    
  makeLogin() {        
    this.validPassword = this.password.length > 0;
    this.validUser = this.username.length > 0;

    if(this.validPassword && this.validUser){
      this.userService.getToken(this.username, this.password)
      .then(token => {        
        this.setTokenInSession(token);        
        this.router.navigate('files');
      }).catch(() => {
        this.clearUserNamePassword();
      });
    }  
  }

  clearUserNamePassword(){
    this.username = '';
    this.password = '';
    this.validPassword = false;
    this.validUser = false;

    this.toastMessage = {
      message: "UserName or Password provided are not correct.",
      title:"Log in failed",
      show:true
    };    
  }

  setTokenInSession(token) {
    window.sessionStorage.removeItem(this.tokenKeyName);
    window.sessionStorage.setItem(this.tokenKeyName, token);
  }
}
