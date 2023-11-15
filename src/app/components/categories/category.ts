import { ICategory } from "src/app/interfaces/ICategory";

export class Category implements ICategory{

  constructor(
    public category_id=0,
    public category_name = ''
  ){}


    // public firstName = '',
    // public lastName = '',
    // public email = '',
    // public sendCatalog = false,
    // public addressType = 'home',
    // public street1?: string,
    // public street2?: string,
    // public city?: string,
    // public state = '',
    // public zip?: string) { }



}