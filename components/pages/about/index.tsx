"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";

const About: React.FC = () => {
  const { dictionary } = useLanguage();

  return (
    <>
      <PageHeader title={dictionary.about.title} />
      <Container className="flex flex-col gap-10 mb-10">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <Heading as="h2" label={dictionary.about.mission} />
          <p className="leading-[30px]">
            {dictionary.about.mission_description}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <Heading as="h2" label={dictionary.about.vision} />
          <p className="leading-[30px]">
            {dictionary.about.vision_description}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <Heading as="h2" label={dictionary.about.team} />
          <div className="grid grid-cols-1 gap-8 mt-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center bg-blue-100 rounded-[40px] p-8">
              <Image
                src="/assets/team/sergio.jpg"
                width={200}
                height={200}
                alt="Sergio Gregorutti"
                className="rounded-full"
              />
              <h3 className="font-bold text-2xl text-blue-900 mt-4">
                Sergio Gregorutti
              </h3>
              <span className="block text-lg text-gray-500">
                {dictionary.about.team_members.sergio.role}
              </span>
              <span className="font-poppins mt-2">
                {dictionary.about.team_members.sergio.professionalProfile}
              </span>
              <ul className="flex grow items-end justify-center gap-4 mt-4">
                <li>
                  <Link
                    href="https://github.com/sergiogregorutti"
                    target="_blank"
                    className="flex items-center gap-2"
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
                    className="flex items-center gap-2"
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
            <div className="flex flex-col items-center text-center bg-blue-100 rounded-[40px] p-8">
              <Image
                src="/assets/team/florencia.jpeg"
                width={200}
                height={200}
                alt="Florencia De Luca"
                className="rounded-full"
              />
              <h3 className="font-bold text-2xl text-blue-900 mt-4">
                Florencia De Luca
              </h3>
              <span className="block text-lg text-gray-500">
                {dictionary.about.team_members.florencia.role}
              </span>
              <span className="font-poppins mt-2">
                {dictionary.about.team_members.florencia.professionalProfile}
              </span>
              <ul className="flex grow items-end justify-center gap-4 mt-4">
                <li>
                  <Link
                    href="https://www.linkedin.com/in/florencia-de-luca-87573227/"
                    target="_blank"
                    className="flex items-center gap-2"
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
        </div>
      </Container>
    </>
  );
};

export default About;
