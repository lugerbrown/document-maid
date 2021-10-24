import { Toast as BsToast } from 'bootstrap'
export class Toast {
  constructor(){    
  }
  activate(bindingContext){    
    this.item = bindingContext;    
    if(typeof(this.item) !== 'undefined' && this.item.show) {
      Array.from(document.querySelectorAll('.toast'))
      .forEach(toastNode => {
        var toast = new BsToast(toastNode);
        toast.show();
      });
    }
  }    
}
