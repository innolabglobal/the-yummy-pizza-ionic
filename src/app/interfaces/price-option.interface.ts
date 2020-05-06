import { MenuInterface } from './menu.interface';

export declare interface PriceOptionInterface {
  id: number;
  name: string;
  value: number;
  menu_id: number;
  menu: MenuInterface;
}
