import {UserAuthentication} from '../../src/services/userAuthentication'

  export class MockHttpClient {
    fetchExecuted = false;
    configureExecuted = false;
    jsonResponse = {auth_token:'TESTTOKEN'}
    fetchResponse = {
      json:() => {
        return this.jsonResponse;
      }
    }
    token;
  
    fetch(url, params) { 
      this.fetchExecuted = true;
      return Promise.resolve(this.fetchResponse); 
    }

    configure(config){
      this.configureExecuted = true;
      return config;
    }
  }

describe('userAuthentication Service',() => { 

  let mockHttp;
  let service;

  beforeEach(() => {
    mockHttp = new MockHttpClient();
    service = new UserAuthentication(mockHttp);
  });

  it('should get Token from rest Api', done => {
    service.getToken('admin','password').then(token=> {      
      expect(token).toBe('TESTTOKEN');
      expect(mockHttp.fetchExecuted).toBe(true);
      expect(mockHttp.configureExecuted).toBe(true);      
    });
    done();
  });

});
