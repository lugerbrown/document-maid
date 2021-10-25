import {inject} from 'aurelia-framework'
const serviceRoot = 'documents';

@inject("httpClient")
export class Documents {
  
  
  constructor(http){
    this.http = http;
  }

  getUserDocuments(){
    var promise = new Promise((resolve, reject) => {
        this.http.fetch(serviceRoot)
        .then(response => response.json())
        .then(data => {                             
          resolve(data); 
        })
        .catch(error => {
          reject(error);
        });
    });
    return promise;
  }

  getDocumentRevisions(name){
    var promise = new Promise((resolve, reject) => {
      this.http.fetch(`${serviceRoot}/${name}`)
      .then(response => response.json())
      .then(data => {             
          resolve(data); 
      })
      .catch(error => {          
          reject(error);
      });

    });
    return promise;
  }

  deleteDocumentById(id){
    var promise = new Promise((resolve, reject) => {
      this.http.fetch(`${serviceRoot}/${id}`,{
        method: "DELETE",        
      })
      .then(response => resolve(response))
      .catch(error => {
            reject(error);
      });
    });
    return promise;
  }

  saveNewDocument(file, name, revision) {    
    var formData = new FormData();        
    formData.append(`file_uploaded`, file);
    
    var promise = new Promise((resolve, reject) => {
      this.http.fetch(`${serviceRoot}/${name}/${revision}`,{
        method: "POST",
        body:formData
      })      
      .then(data => resolve(data))
      .catch(error => {
            reject(error);
      });
    });
    return promise;
  }

}
