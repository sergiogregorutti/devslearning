"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/context/LanguageContext";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";

import "./styles.css";

const About: React.FC = () => {
  const { dictionary } = useLanguage();

  return (
    <>
      <PageHeader title={dictionary.about.title} />
      <Container className="about-page">
        <h2>{dictionary.about.mission}</h2>
        <p className="mb-6 leading-[30px]">
          {dictionary.about.mission_description}
        </p>
        <h2>{dictionary.about.vision}</h2>
        <p className="mb-6 leading-[30px]">
          {dictionary.about.vision_description}
        </p>
        <h2>{dictionary.about.team}</h2>
        <div className="team">
          <div className="card">
            <Image
              src="/assets/team/sergio.jpg"
              width={200}
              height={200}
              alt="Sergio Gregorutti"
              className="image"
            />
            <h3>Sergio Gregorutti</h3>
            <span className="position">
              {dictionary.about.team_members.sergio.role}
            </span>
            <span className="description">
              {dictionary.about.team_members.sergio.professionalProfile}
            </span>
            <ul className="contact-info">
              <li>
                <Link
                  href="https://github.com/sergiogregorutti"
                  target="_blank"
                >
                  <Image
                    src="/assets/icons/github.svg"
                    width={20}
                    height={20}
                    alt="GitHub"
                  />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/sergiogregorutti/"
                  target="_blank"
                >
                  <Image
                    src="/assets/icons/linkedin.svg"
                    width={20}
                    height={20}
                    alt="LinkedIn"
                  />
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
          <div className="card">
            <Image
              src="/assets/team/florencia.jpeg"
              width={200}
              height={200}
              alt="Florencia De Luca"
              className="image"
            />
            <h3>Florencia De Luca</h3>
            <span className="position">
              {dictionary.about.team_members.florencia.role}
            </span>
            <span className="description">
              {dictionary.about.team_members.florencia.professionalProfile}
            </span>
            <ul className="contact-info">
              <li>
                <Link
                  href="https://www.linkedin.com/in/florencia-de-luca-87573227/"
                  target="_blank"
                >
                  <Image
                    src="/assets/icons/linkedin.svg"
                    width={20}
                    height={20}
                    alt="LinkedIn"
                  />
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
