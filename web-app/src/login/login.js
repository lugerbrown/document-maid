import {inject} from 'aurelia-framework'
import {Router} from 'aurelia-router';
import {UserAuthentication} from '../services/userAuthentication'
import {Toast} from 'bootstrap';

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

    //adding "fade show" along with the toast class  in html will show them too.
    Array.from(document.querySelectorAll('.toast'))
    .forEach(toastNode => {
      var toast = new Toast(toastNode);
      toast.show();
    });    
  }

  setTokenInSession(token) {
    window.sessionStorage.removeItem(this.tokenKeyName);
    window.sessionStorage.setItem(this.tokenKeyName, token);
  }
}
