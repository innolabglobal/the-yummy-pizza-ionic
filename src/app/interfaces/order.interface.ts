import { OrderItemInterface } from './order-item.interface';

export declare interface OrderInterface {
  id: number;
  order_number: string;
  user_id: number;
  status: string;
  grand_total: number;
  item_count: number;
  payment_status: boolean;
  payment_method: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  country: string;
  post_code: string;
  phone_number: string;
  notes: string;
  created_at: string;
  items: OrderItemInterface[];
}
