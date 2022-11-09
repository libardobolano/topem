import {Item} from "./item";

export interface Order {
  id?:number,
  order_number?:string,
  order_value:number,
  order_iva:number,
  order_total:number,
  transmitter_id?:number,
  receiver_id?:number
  items?:Item[],
  customer_receiver?:any,
  customer_transmitter?:any
}
