"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { getLocalizedPathFromPrefix } from "@/lib/language";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

export default function HeroSlider({
  dictionary,
  lang,
}: {
  dictionary: { [key: string]: any };
  lang: string;
}) {
  var sliderSettings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="hero-slider bg-blue-300 pb-10">
      <Container>
        <Slider {...sliderSettings}>
          <div>
            <div className="content">
              <div className="col-text">
                <span className={`title ${lang}`}>
                  {dictionary.home.heroSlider[0].title}
                </span>
                <span className={`title2 ${lang}`}>
                  {dictionary.home.heroSlider[0].title2}
                </span>
                <p>{dictionary.home.heroSlider[0].subtitle}</p>
              </div>
              <div className="col-image">
                <Image
                  src="/assets/boy.svg"
                  width={555}
                  height={286}
                  alt="Devs Learning"
                  priority={true}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="content">
              <div className="col-text">
                <span className={`title ${lang}`}>
                  {dictionary.home.heroSlider[1].title}
                </span>
                <span className={`title2 ${lang}`}>
                  {dictionary.home.heroSlider[1].title2}
                </span>
                <p>{dictionary.home.heroSlider[1].subtitle}</p>
                <Button
                  label={dictionary.home.heroSlider[1].cta}
                  href={getLocalizedPathFromPrefix(lang, `/courses`)}
                />
              </div>
              <div className="col-image">
                <Image
                  src="/assets/boy2.svg"
                  width={555}
                  height={286}
                  alt="Devs Learning"
                  priority={true}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="content">
              <div className="col-text">
                <span className={`title ${lang}`}>
                  {dictionary.home.heroSlider[2].title}
                </span>
                <span className={`title2 ${lang}`}>
                  {dictionary.home.heroSlider[2].title2}
                </span>
                <p>{dictionary.home.heroSlider[2].subtitle}</p>
                <Button
                  label={dictionary.home.heroSlider[2].cta}
                  href={getLocalizedPathFromPrefix(lang, `/technologies`)}
                />
              </div>
              <div className="col-image">
                <Image
                  src="/assets/man_working.svg"
                  width={555}
                  height={286}
                  alt="Devs Learning"
                  priority={true}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="content">
              <div className="col-text">
                <span className={`title ${lang}`}>
                  {dictionary.home.heroSlider[3].title}
                </span>
                <span className={`title2 ${lang}`}>
                  {dictionary.home.heroSlider[3].title2}
                </span>
                <p>{dictionary.home.heroSlider[3].subtitle}</p>
                <Button
                  label={dictionary.home.heroSlider[3].cta}
                  href={getLocalizedPathFromPrefix(lang, `/roadmaps`)}
                />
              </div>
              <div className="col-image">
                <Image
                  src="/assets/girl.svg"
                  width={555}
                  height={286}
                  alt="Devs Learning"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </Slider>
      </Container>
    </div>
  );
}
