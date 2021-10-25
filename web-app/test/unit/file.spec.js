import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM, } from 'aurelia-pal';
import File from '../../src/files/file'

describe('File Component',() => {  
  let component;
  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName(File))
      .inView('<compose model.bind="document" view="../../src/files/file.html" view-model="../../src/files/file"></compose>')      
      .boundTo({
        document:{
          name:'FIleName.txt',
          downloadUrl:'http://localhost:8000/download',
          revision:1
        }});
  });

  it('should render element', done => {
    component.manuallyHandleLifecycle().create(bootstrap)    
    .then(() => component.bind())
    .then(() => component.attached())
    .then(() => component.bind())
    .then(() => {            
      var titleElement = document.querySelector('.fw-bold');
      var downloadLink = document.querySelector('a.delete-link');
      var revisionBadge =  document.querySelector('span.badge');
      expect(titleElement.innerHTML).toBe('FIleName.txt');
      expect(downloadLink.getAttribute("href")).toBe('http://localhost:8000/download');      
      expect(revisionBadge.innerHTML).toBe('Rev.1');      
    })
    .then(done);
  });
});
