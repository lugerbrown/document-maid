import '../style/app.scss'
export class App {
    constructor() {
      console.log('ctor called');
      window.sessionStorage.setItem('token', 'something');;
    }
    activate(){
      console.log('activate called');
    }

    configureRouter(config, router){
    this.router = router;
    config.title = "Home Page For Demo";
    config.map([
      {
        route:['','login'], 
        moduleId: PLATFORM.moduleName("login/login"), //module id used in import statements.
        name:"LogIn",
        title:"Sign In",        
      },
      {
        route:'files', 
        moduleId: PLATFORM.moduleName("files/files"), //module id used in import statements.
        name:"files",
        title:"Documents",        
      }
    ]);
  }

  }
  