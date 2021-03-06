 import {Documents} from '../../src/services/documents'

   export class MockHttpClient {
    fetchExecuted = false;
    configureExecuted = false;
    usedUrl = '';
    jsonResponse = [
      {id:"9b08305a-48bd-4c5f-ac0f-789c8c30d5a6",name:"documentTest.pdf",revision:1},
      {id:"11e996c6-9b53-47c8-b99b-a75d1e4eaa27",name:"test.pdf",revision:1}
    ]
    fetchResponse = {
      json:() => {
        return this.jsonResponse;
      }
    }
    
    fetch(url, params) { 
      this.usedUrl = url;
      this.fetchExecuted = true;
      return Promise.resolve(this.fetchResponse); 
    }

    configure(config){
      this.configureExecuted = true;
      return config;
    }
  }

  describe('Document Service',() => { 
  let mockHttp;
  let service;
  beforeEach(() => {
    mockHttp = new MockHttpClient();
    service = new Documents(mockHttp);
  });

  it('should get documents list from api', done => {
    service.getUserDocuments().then(response=> {                  
      expect(response.length).toBe(2);
      expect(response[0].id).toBe('9b08305a-48bd-4c5f-ac0f-789c8c30d5a6');
      expect(response[0].name).toBe('documentTest.pdf');      
      expect(response[0].revision).toBe(1);      
      expect(response[1].id).toBe('11e996c6-9b53-47c8-b99b-a75d1e4eaa27');
      expect(response[1].name).toBe('test.pdf');
      expect(response[1].revision).toBe(1);
      expect(mockHttp.usedUrl).toBe('documents');
      expect(mockHttp.fetchExecuted).toBe(true);
    });
    done();
  });  

  it('should get documents revisions list from api', done => {    
    service.getDocumentRevisions('revisions').then(response=> {                        
      expect(response[0].id).toBe('9b08305a-48bd-4c5f-ac0f-789c8c30d5a6');
      expect(response[0].name).toBe('documentTest.pdf');      
      expect(response[0].revision).toBe(1);      
      expect(response[1].id).toBe('11e996c6-9b53-47c8-b99b-a75d1e4eaa27');
      expect(response[1].name).toBe('test.pdf');
      expect(response[1].revision).toBe(1);
      expect(mockHttp.usedUrl).toBe('documents/revisions');
      expect(mockHttp.fetchExecuted).toBe(true);
      done();
    });    
  });

  it('should delete documents using document id', done => {
    service.deleteDocumentById('9b08305a-48bd-4c5f-ac0f-789c8c30d5a6').then(response=> {
      expect(mockHttp.usedUrl).toBe('documents/9b08305a-48bd-4c5f-ac0f-789c8c30d5a6');
      expect(mockHttp.fetchExecuted).toBe(true);
      done();
    });
  });

  it('should post new documents using document name and revision', done => {
    service.saveNewDocument({},'testFIleName.txt',1).then(response=> {
      expect(mockHttp.usedUrl).toBe('documents/testFIleName.txt/1');
      expect(mockHttp.fetchExecuted).toBe(true);
      done();
    });
  });

});
