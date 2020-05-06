import { PriceOptionInterface } from './price-option.interface';

export declare interface MenuInterface {
  id: number;
  name: string;
  description: string;
  image: string;
  price_option: PriceOptionInterface[];
}
