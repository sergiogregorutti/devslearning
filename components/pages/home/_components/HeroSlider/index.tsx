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
    <div className="bg-blue-300 py-6 md:py-12">
      <Container>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 6000 }}
          pagination={{ clickable: true }}
          className="home-hero-slider !pb-3"
        >
          {dictionary.home.heroSlider.map((slide: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 md:grid-cols-[55%_45%] md:gap-3">
                <div className="flex flex-col items-center md:items-start justify-center order-2 md:order-1 lg:pr-[10%]">
                  <span className="text-blue-800 text-center md:text-left text-4xl md:text-5xl lg:text-6xl font-bold leading-[34px] md:leading-[50px] mb-3 px-[10%] md:pl-0 md:pr-[15%]">
                    {slide.title}
                  </span>
                  <p className="mb-4 text-center md:text-left">
                    {slide.subtitle}
                  </p>
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
                    className="max-h-[250px]"
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
