import Link from "next/link";
import Image from "next/image";

interface CardLinkProps {
  title: string;
  href: string;
  subtitle?: any;
  imageSrc?: string;
  layout?: "horizontal" | "vertical";
}

const CardLink: React.FC<CardLinkProps> = ({
  title,
  href,
  subtitle,
  imageSrc,
  layout = "horizontal",
}) => {
  return (
    <Link
      href={href}
      className={`flex ${
        layout === "vertical"
          ? "flex-row md:flex-col items-center md:items-start"
          : "flex-row items-center"
      } font-poppins text-white bg-blue-500 rounded-2xl text-[22px] px-[20px] py-[15px] min-h-[100px] transition-all duration-300 hover:bg-blue-600`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={title}
          width={layout === "vertical" ? 80 : 60}
          height={layout === "vertical" ? 60 : 70}
          className={`${
            layout === "vertical"
              ? "w-[50px] md:w-auto h-auto md:h-[60px] mr-4 md:mb-4"
              : "h-[70px] mr-4"
          }`}
        />
      )}
      <div
        className={`w-full ${
          layout === "vertical"
            ? "text-right md:text-left"
            : imageSrc
            ? "text-right"
            : "text-center"
        }`}
      >
        <span>{title}</span>
        {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
      </div>
    </Link>
  );
};

export default CardLink;
