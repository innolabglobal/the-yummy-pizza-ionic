import { MenuInterface } from './menu.interface';
import { PriceOptionInterface } from './price-option.interface';

export declare interface OrderItemInterface {
  id: number;
  order_id: number;
  menu_id: number;
  quantity: number;
  price: number;
  price_option_id: number;
  menu: MenuInterface;
  price_option: PriceOptionInterface;
}
