export class Utils {

    public static ShallowCopy(target: any, source: any) {
      for(var i in source) {
        if(typeof source[i] == "object") continue;
        target[i] = source[i];
      }
    }
  
    constructor() { }
  }
  