import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Slider} from "../../model/slider";
import {SliderService} from "../../services/slider.service";
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent implements OnInit {
  sliders: Array<Slider> = new Array<Slider>();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: false,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    autoplay: true,
    autoplayTimeout:5000,
    autoplayHoverPause:false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
    nav: true
  }

  constructor(private sl: SliderService) { }

  ngOnInit(): void {
    this.sl.getSlider().subscribe(res =>{
      this.sliders = res;
    })
  }

}
