import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {HttpClient} from 'aurelia-fetch-client';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import { UserAuthentication } from './services/userAuthentication';
import '../style/app.scss'

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()    
    .feature(PLATFORM.moduleName('resources/index'));
    
  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  let http = new HttpClient();

  http.fetch("config/config.json",)
      .then(response => response.json())
      .then(data => {
        
        http.configure(config => {
          config
          .useStandardConfiguration()
          .withBaseUrl(data.api.endpoint)
        });
        
        aurelia.use.instance("apiEndPoint", data.api.endpoint);
        aurelia.use.instance("tokenKeyName", data.userTokenKeyName);

        const token = window.sessionStorage.getItem(data.userTokenKeyName);
        if(token){
          let userService = new UserAuthentication(http);
          userService.setClientHeader(token);
        }
      })
      .then(() =>{
        aurelia.use.instance("httpClient", http);                    
        aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
      });
}
