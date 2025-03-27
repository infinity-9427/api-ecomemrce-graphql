"use client";
import Link from "./NavigationLink"
import { useTranslations } from "next-intl";
import {
  RiGithubFill as Github,
  RiLinkedinBoxFill as Linkedin,
  RiWhatsappLine as Whatsapp,
} from "@remixicon/react";
import { Menu } from "@/utils/Menu"

const year = new Date().getFullYear();

const Footer = () => {
  const t = useTranslations("Footer");
  const menuOptions = Menu();
  const whatsappMessage = encodeURIComponent(t("whatsappMessage"));

  return (
    <footer className="bg-black backdrop-blur-md border-b border-gray-800 text-[#F5F1E3] py-2">
      <div className="container mx-auto px-2 md:px-2 flex flex-col items-center md:flex-row md:justify-between text-center md:text-left">
        {/* Logo and Quick Links */}
        <div className="mb-2 md:mb-0">
          <h2 className="text-2xl font-bold text-cyan-400">Infinity Dev</h2>
          <p className="text-gray-400 text-sm mt-1 flex justify-center">{" </> "}</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:space-x-3 text-cyan-100 text-sm mb-2 md:mb-0">
          {menuOptions.map((option) => (
            <Link key={option.path} href={option.path} className="hover:text-blue-500 transition-colors">
              {option.item}
            </Link>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <Link
            href="https://github.com/infinity-9427?tab=repositories"
            target="_blank"
            className="hover:text-blue-400 transition-colors"
          >
            <Github size={24} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/arley-tarifa/"
            target="_blank"
            className="hover:text-blue-400 transition-colors"
          >
            <Linkedin size={24} />
          </Link>
          <Link
            href={`https://wa.me/573208613489?text=${whatsappMessage}`}
            target="_blank"
            className="hover:text-blue-400 transition-colors"
          >
            <Whatsapp size={24} />
          </Link>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-2 text-center text-cyan-200 text-sm">
        <p>
          {t("copyright", { year })} | {t("poweredBy")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;