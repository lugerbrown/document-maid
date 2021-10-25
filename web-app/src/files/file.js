export class File {
  activate(bindingContext){
    console.log(bindingContext);
    this.item = bindingContext;
  }
}
