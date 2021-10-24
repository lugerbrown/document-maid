import {inject} from 'aurelia-framework'
import { Documents } from '../services/documents';

@inject(Documents, "apiEndPoint")
export class Files {
  constructor(documentService, apiEndPoint){
    this.documentService = documentService;
    this.apiEndPoint = apiEndPoint;
    this.getDocumentList(apiEndPoint);
  }

  getDocumentList() {
    return this.documentService.getUserDocuments().then(documents => {
      this.documents = documents;
      this.documents.forEach(element => {
        element.downloadUrl = `${this.apiEndPoint}documents/${element.name}/${element.revision}`;
      });
    });
  }
    
  doUpload(){    
    let revision = 1;
    const fileName = this.selectedFiles[0].name;
    this.documentService.getDocumentRevisions(fileName).then(data => 
    {      
      if(data.length > 0){
          data.sort((a, b) => parseFloat(a.revision) - parseFloat(b.revision));
          const currentRevision  = data[data.length-1];          
          revision = ++currentRevision.revision;
      }

      this.documentService.saveNewDocument(this.selectedFiles[0], fileName, revision)
        .then(() => {
          this.clearFiles();
          this.getDocumentList().then(()=>{            
            this.toastMessage = {
              message: `File ${fileName} Saved Successfully`,
              title:"File uploaded",
              show:true
            };    
          });
        }
      );
    });    
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
