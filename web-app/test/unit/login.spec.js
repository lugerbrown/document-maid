import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';
import Login from '../../src/login/login'

describe('Login Screen', () => {
  let component;

    beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName(Login))
      .inView('<compose view-model="../../src/login/login"></compose>');
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

  it('should validate user input when no user and password provided', done =>{
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
   
  afterEach(() => {
    component.dispose();
  });

});
