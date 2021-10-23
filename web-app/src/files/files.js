import {inject} from 'aurelia-framework'

@inject("httpClient")
export class Files {
  constructor(http){
    console.log('files constructor');
  }
  activate(){
    console.log('files activate');
  }
}
