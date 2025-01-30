"use client";

import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Bottle {
  name: string;
  price: string;
  description: string;
  bgImage: string;
  image: string;
}

interface SlideProps {
  bottles: Bottle[];
}

const Slide: React.FC<SlideProps> = ({ bottles }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination, EffectFade],
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      speed: 1000,
    });

    swiper.on("slideChange", function (sld) {
      document.body.setAttribute("data-sld", sld.realIndex.toString());
    });

    return () => swiper.destroy();
  }, []);

  return (
    <div ref={swiperRef} className="swiper mySwiper">
      <div className="swiper-wrapper">
        {bottles.map((bottle, index) => (
          <div className="swiper-slide" key={index}>
            <div className="left-side">
              <h3 className="main-header">Closca Bottle</h3>
              <h1 className="main-title">{bottle.name}</h1>
              <h2 className="main-subtitle">{bottle.price}</h2>
              <div className="main-content">
                <div className="main-content__title">{bottle.description}</div>
                <div className="more-menu">Shop Now</div>
              </div>
            </div>
            <div className="center">
              <img className="bottle-bg" src={bottle.bgImage} alt="Background" />
              <img className="bottle-img" src={bottle.image} alt="Bottle" />
            </div>
          </div>
        ))}
      </div>
      <div className="button-wrapper">
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Slide;
