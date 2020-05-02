import { Component, OnInit, Renderer2 } from '@angular/core';

const SLIDES = [
  {
    image: 'assets/images/home-slider-1.jpg',
    title: 'Do you like Pizza?'
  },
  {
    image: 'assets/images/home-slider-2.jpg',
    title: 'We use fresh ingredient'
  },
  {
    image: 'assets/images/home-slider-3.jpg',
    title: 'Various type of Pizza'
  },
  {
    image: 'assets/images/home-slider-4.jpg',
    title: 'Our Pizza is Yummy!'
  },
  {
    image: 'assets/images/home-slider-5.jpg',
    title: 'Enjoy The Yummy Pizza!'
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  sliderOptions = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000,
    },
  };
  slides = SLIDES;

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
  }

  setBackgroundImage(slide, elem) {
    this.renderer.setStyle(elem.el, 'background', `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${slide.image})`);
  }
}
