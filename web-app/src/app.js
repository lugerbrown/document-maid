
export class App {
    constructor() {      
    }
    
    configureRouter(config, router) {
    this.router = router;    
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
  