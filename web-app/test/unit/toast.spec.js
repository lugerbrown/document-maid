import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';
import Toast from '../../src/components/toast/toast'


describe('Toast Component',() => {
  let component;
  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName(Toast))
      .inView('<compose model.bind="model" view="../../src/components/toast/toast.html" view-model="../../src/components/toast/toast"></compose>')      
      .boundTo({toastMessage:{message:'Test Message', show:'true', title:'Unit Tests'}});
  });

  it('should render element', done => {
    component.manuallyHandleLifecycle().create(bootstrap)    
    .then(() => component.bind())
    .then(() => component.attached())
    .then(() => component.bind())
    .then(() => {      
      var messageElement = document.querySelector('.toast-body');
      var titleElement = document.querySelector('small');            
      expect(messageElement.innerHTML).toBe('Test Message');
      expect(titleElement.innerHTML).toBe('Unit Tests');
    })    
    .then(() => component.bind({ toastMessage: {message:'Saved successfully', title:'File uploaded'} }))
    .then(() => {
      var messageElement = document.querySelector('.toast-body');
      var titleElement = document.querySelector('small');
      expect(messageElement.innerHTML).toBe('Saved successfully');
      expect(titleElement.innerHTML).toBe('File uploaded');
    })
    .then(done)    
   });
});
