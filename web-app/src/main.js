import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {HttpClient} from 'aurelia-fetch-client';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import { UserAuthentication } from './services/userAuthentication';

//TODO: to move to a config file.
const tokenKeyName = 'userToken';
const apiBaseURl = 'http://localhost:8000/';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  let http = new HttpClient();
  http.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(apiBaseURl)
  });
  aurelia.use.instance("httpClient", http);
  aurelia.use.instance("tokenKeyName", tokenKeyName);

  const token = window.sessionStorage.getItem(tokenKeyName);
  if(token){
    let userService = new UserAuthentication(http);
    userService.setClientHeader(token);
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
