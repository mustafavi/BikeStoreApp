export interface IProduct {
  product_id:number;
  product_name:string;
  brand_id:number;
  brand?:string;
  category_id:number;
  category?:string;
  model_year:number;
  list_price:number;
  searchKey:string[];
}
