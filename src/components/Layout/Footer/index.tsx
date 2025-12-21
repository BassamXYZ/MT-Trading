import React, { FC } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { footerlabels } from "@/app/api/data";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";

const Footer: FC = () => {
  return (
    <footer className="pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 lg:gap-20 md:gap-6 sm:gap-12 gap-6  pb-16">
          <div className="lg:col-span-4 md:col-span-6 col-span-6">
            <Logo />
            <div className="flex gap-6 items-center mt-6">
              <Link href="#" className="group">
                <Icon
                  icon="fa6-brands:facebook-f"
                  width="24"
                  height="24"
                  className="text-white group-hover:text-primary"
                />
              </Link>
              <Link href="https://www.instagram.com/m.ttrading/" className="group" target="_blank" rel="noopener noreferrer">
                <Icon
                  icon="fa6-brands:instagram"
                  width="24"
                  height="24"
                  className="text-white group-hover:text-primary"
                />
              </Link>
              <Link href="#" className="group">
                <Icon
                  icon="fa6-brands:x-twitter"
                  width="24"
                  height="24"
                  className="text-white group-hover:text-primary"
                />
              </Link>
            </div>
            <h3 className="text-white text-18 font-medium mt-6">
              2025 Copright | Crypgo
            </h3>
            <h3 className="text-white text-18 font-medium mt-6">
              Distributed by <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
            </h3>
          </div>
          <div className="lg:col-span-2 md:col-span-6 col-span-6">
            <h4 className="text-white mb-4 font-medium text-24">Links</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link
                    href={item.href}
                    className="text-white hover:text-primary text-17"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 md:col-span-6 col-span-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204.53206562229303!2d35.88732204285359!3d34.89359264968918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15217ddb774b8ff7%3A0xfce69f862b58decf!2zVlZWUCtDVk3YjCDYt9ix2LfZiNiz2Iwg2LPZiNix2YrYpw!5e0!3m2!1sar!2s!4v1766328100840!5m2!1sar!2s" width="300" height="250" className="mx-auto" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
