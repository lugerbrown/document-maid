import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM, DOM} from 'aurelia-pal';
import Login from '../../src/login/login'
import {UserAuthentication} from '../../src/services/userAuthentication'
import {Router} from 'aurelia-router';

  export class MockUserService {
    getTokenExecuted = false;
    token;
  
    getToken(username, password) { 
      this.getTokenExecuted = true;
      return Promise.resolve(this.token); 
    }
  }

  export class MockRouter{
    getNavigateExecuted = false;
    navigate(path){
      this.getNavigateExecuted = true;
      return path;
    }
  }

describe('Login Screen', () => {
  let component;
   let service = new MockUserService();
   let router = new MockRouter();

    beforeEach(() => {
    service.token = 'TESTTOKEN';

    component = StageComponent
      .withResources(PLATFORM.moduleName(Login))
      .inView('<compose view-model="../../src/login/login"></compose>');

      component.bootstrap(aurelia => {
        aurelia.use.standardConfiguration();  
        aurelia.container.registerInstance(UserAuthentication, service);
        aurelia.container.registerInstance(Router, router);
      });
  });
  
   it('should render form', done => {
    component.manuallyHandleLifecycle().create(bootstrap)
    .then(() => component.bind())
    .then(() => component.attached())
    .then(() => component.bind())
    .then(() => {      
      const nameElement = document.querySelector('#floatingInput');      
      expect(nameElement.getAttribute("placeholder")).toBe('Username');
      const passwordElement = document.querySelector('#floatingPassword');      
      expect(passwordElement.getAttribute("placeholder")).toBe('Password');
    })
    .then(done)
    .catch(e => { console.log(e.toString()) });
  });

  it('should validate user input when no user and password provided', done => {
   component.manuallyHandleLifecycle().create(bootstrap)
    .then(() => component.bind())
    .then(() => component.attached())
    .then(() => component.bind())
    .then(() => {                  
      const buttonElement = document.querySelector('button');
      buttonElement.click();            
    })
    .then(() => component.bind())
    .then(() => {            
      const nameElement = document.querySelector('#floatingInput.is-invalid');      
      expect(nameElement.getAttribute("placeholder")).toBe('Username');
      const passwordElement = document.querySelector('#floatingPassword.is-invalid');      
      expect(passwordElement.getAttribute("placeholder")).toBe('Password');
    })
    .then(done)
    .catch(e => { console.log(e.toString()) }); 
  });

  it('should get the user token from the service and redirect when logged in', done =>{
    component.manuallyHandleLifecycle().create(bootstrap)
    .then(() => component.bind())
    .then(() => component.attached())
    .then(() => component.bind())
    .then(() => {                        
      const nameElement = DOM.getElementById('floatingInput');
      const passwordElement = DOM.getElementById('floatingPassword');
      nameElement.value = "admin";
      passwordElement.value = "password";
      nameElement.dispatchEvent(DOM.createCustomEvent('change'));
      passwordElement.dispatchEvent(DOM.createCustomEvent('change'));      
      const buttonElement = DOM.querySelector('button');
      buttonElement.click();
      setTimeout(() => {        
        done();
      }, 50)
    })
    .then(() => component.bind())
    .then(() => {                  
      expect(service.getTokenExecuted).toBe(true);      
      expect(router.getNavigateExecuted).toBe(true);      
    })
    .then(done)    
  });
   
  afterEach(() => {
    component.dispose();
  });
});
