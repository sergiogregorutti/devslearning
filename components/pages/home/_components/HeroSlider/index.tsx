"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import StatsSection from "../StatsSection";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const { lang, dictionary } = useLanguage();

  return (
    <div className="bg-blue-300 pb-2 md:py-0">
      <Container>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          className="home-hero-slider !pb-6 !py-3 lg:!pb-6 lg:!py-0"
        >
          {dictionary.home.heroSlider.map((slide: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 md:grid-cols-[55%_45%]">
                <div className="flex flex-col items-start justify-center order-2 md:order-1 pb-6 md:pb-0 lg:pr-[10%]">
                  <span className="text-blue-800 text-4xl md:text-5xl lg:text-6xl font-bold leading-[34px] md:leading-[50px] mb-3 pr-[15%]">
                    {slide.title}
                  </span>
                  <p className="mb-3">{slide.subtitle}</p>
                  {slide.cta && (
                    <Button
                      label={slide.cta}
                      href={getLocalizedPathFromPrefix(lang, slide.link)}
                    />
                  )}
                  {slide.showStats && <StatsSection />}
                </div>
                <div className="flex flex-col items-center justify-center order-1 md:order-2 pb-6 md:py-0">
                  <Image
                    src={`/assets/${slide.image}`}
                    width={555}
                    height={286}
                    alt="Devs Learning"
                    priority={true}
                    className={`${
                      slide.imageNoMaxHeigh ? "" : "max-h-[100%] md:max-h-[80%]"
                    }`}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}
