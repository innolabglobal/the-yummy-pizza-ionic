import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const DUMMY_MENU = [
  {
    image: 'https://cache.dominos.com/olo/6_19_3/assets/build/market/MY/_en/images/img/products/thumbnails/S_AM.jpg',
    name: 'CHICKENSAURUS',
    description: 'Roasted Chicken, Chicken Pepperoni and Mushroom Slices on our awesome Smoky Blended BBQ Sauce (Surcharge Applies).',
    price: {
      usd: '10',
      euro: '12',
    }
  },
  {
    image: 'https://cache.dominos.com/olo/6_19_3/assets/build/market/MY/_en/images/img/products/thumbnails/S_UH.jpg',
    name: 'ULTIMATE HAWAIIAN',
    description: 'Loads of delicious roasted chicken, shredded chicken juicy pineapples and fresh mushrooms on our brand new pizza.',
    price: {
      usd: '10',
      euro: '12',
    }
  },
  {
    image: 'https://cache.dominos.com/olo/6_19_3/assets/build/market/MY/_en/images/img/products/thumbnails/S_MT.jpg',
    name: 'MEATASAURUS',
    description: 'Generous portions of everyone\'s favorite beef pepperoni, ground beef and fresh mushrooms on our new blended smoky BBQ sauce (Surcharge Applies)',
    price: {
      usd: '10',
      euro: '12',
    }
  },
  {
    image: 'https://cache.dominos.com/olo/6_19_3/assets/build/market/MY/_en/images/img/products/thumbnails/S_GF.jpg',
    name: 'CHICKEN CONFIDENTIAL',
    description: 'Onions, cherry tomatoes, pineapple, chicken potpourri, roasted chicken and shredded chicken on our delicious Top Secret Sauce',
    price: {
      usd: '10',
      euro: '12',
    }
  },
  {
    image: 'https://cache.dominos.com/olo/6_19_3/assets/build/market/MY/_en/images/img/products/thumbnails/S_ST.jpg',
    name: 'SAMBAL SURF &amp; TURF',
    description: 'Succulent Prawns marinated in herbs &amp; spices, Shredded Chicken, Juicy Pineapples and Green Peppers on our new and authentic sambal sauce. (Surcharge Applies)',
    price: {
      usd: '10',
      euro: '12',
    }
  },
  {
    image: 'https://cache.dominos.com/olo/6_19_3/assets/build/market/MY/_en/images/img/products/thumbnails/S_PU.jpg',
    name: 'PRAWN SENSATION',
    description: 'Succulent Prawns marinated in Italian herbs &amp; spices, imported Belgian spinach, juicy cherry tomatoes &amp; onions with our brand new pizza sauce! (Surcharge Applie',
    price: {
      usd: '10',
      euro: '12',
    }
  },
  {
    image: 'https://cache.dominos.com/olo/6_19_3/assets/build/market/MY/_en/images/img/products/thumbnails/S_SU.jpg',
    name: 'TROPICAL SAMBAL PRAWN',
    description: 'Succulent Prawns marinated in herbs &amp; spices, Fresh Onions, juicy Pineapples, Red Chillies on our new and authentic sambal sauce.',
    price: {
      usd: '10',
      euro: '12',
    }
  },
  {
    image: 'https://cache.dominos.com/olo/6_19_3/assets/build/market/MY/_en/images/img/products/thumbnails/S_PP.jpg',
    name: 'PRAWN PASSION',
    description: 'Succulent prawns, marinated in Italian herbs and spices, juicy cherry tomatoes &amp; onions on our new pesto passion sauce! (Surcharge Applies)',
    price: {
      usd: '10',
      euro: '12',
    }
  },
];

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu(id: number) {
    const result = DUMMY_MENU.filter(item => item.id === id);

    console.log(result);

    return of(result.length ? result[0] : {});
  }

  getAllMenu() {
    return of(DUMMY_MENU);
  }
}
