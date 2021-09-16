import { Utils } from "../code/utils";

export default class Note {
    constructor(pojo: any = null) {
        if(pojo) { 
            Utils.ShallowCopy(this, pojo);
            if(pojo.reminderOn){
                pojo.reminderOn = new Date(pojo.reminderOn);
               
                this.reminderOn =  this._toDateTime(pojo.reminderOn.getSeconds())
                console.log(this.reminderOn)
            } 
        }
    }
    public id: string = '';
    public title: string = '';
    public content: string = '';
    public color: string = '';
    public isPinned: boolean = false;
    public reminderOn?: Date;
    public createdOn: Date = new Date();


    private _toDateTime(seconds: number) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(seconds);
        return t;
    }
}