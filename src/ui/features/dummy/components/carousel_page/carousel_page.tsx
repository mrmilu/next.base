import type { ReactElement } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselPageStyled, CarouselSlideStyled } from "@/src/ui/features/dummy/components/carousel_page/carousel_page.styled";

import "swiper/css";

export function CarouselPage() {
  return (
    <CarouselPageStyled>
      <h1>Carousel</h1>
      <p>
        Made with{" "}
        <a href="https://swiperjs.com/react" target="_blank" rel="noopener noreferrer">
          Swiper.js library
        </a>
      </p>
      <Swiper grabCursor loop spaceBetween={50} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
        {Array.from({ length: 4 }).map((_, index) => (
          <SwiperSlide key={index}>
            <CarouselSlideStyled>Slide {index + 1}</CarouselSlideStyled>
          </SwiperSlide>
        ))}
      </Swiper>
    </CarouselPageStyled>
  );
}

CarouselPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
