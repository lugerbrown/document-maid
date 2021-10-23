import {inject} from 'aurelia-framework'
import { Documents } from '../services/documents';

@inject(Documents)
export class Files {
  constructor(documentService){
    this.documentService = documentService;
    
    this.documentService.getUserDocuments().then(documents =>{
      this.documents = documents;
      this.documents.forEach(element => {
        //TODO: to move this value to a config file. and inject.
        element.downloadUrl = `http://localhost:8000/documents/${element.name}/${element.revision}`
      });
    });

  }

  doUpload(){
    console.log('uploading file', this.selectedFiles[0].name);
    this.documentService.saveNewDocument(this.selectedFiles[0], this.selectedFiles[0].name, 1)
    .then(() => this.clearFiles());
  }

   clearFiles() {
        document.getElementById("file").value = "";
    }
  
  canActivate(params, routeConfig, navigationInstructions){    
    const token = window.sessionStorage.getItem('userToken');
    if(token){
      return true
    }
    return false;
  }
}
