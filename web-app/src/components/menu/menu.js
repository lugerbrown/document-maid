import {inject} from 'aurelia-framework'
import {Router} from 'aurelia-router';


@inject(Router, 'tokenKeyName')
export class Menu{
  constructor(router, tokenKeyName){    
    this.router = router;
    this.tokenKeyName = tokenKeyName;
  }

  signOutUser(){
    window.sessionStorage.removeItem(this.tokenKeyName);
    this.router.navigate('LogIn');    
  }
}
