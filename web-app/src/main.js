import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

 import {HttpClient} from 'aurelia-fetch-client';

import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';

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
      .withBaseUrl('http://localhost:8000/')
  });
  aurelia.use.instance("httpClient", http);

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
