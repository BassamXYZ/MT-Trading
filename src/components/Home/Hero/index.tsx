import Image from "next/image";
import CardSlider from "./slider";
import { getImagePrefix } from "@/utils/utils";

const Hero = async () => {
  return (
    <section
      className="relative md:pt-40 md:pb-28 py-20 overflow-hidden z-1"
      id="about" dir="rtl"
    >
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-5 col-span-12 animate-slide-in-left">
            <div className="flex gap-6 items-center lg:justify-start justify-center mb-5 mt-24">
              <Image
                src={`${getImagePrefix()}images/icons/icon-bag.svg`}
                alt="icon"
                width={40}
                height={40}
              />
              <p className="text-white sm:text-28 text-18 mb-0">
                شركتك الرائدة في <span className="text-primary">سوريا</span>
              </p>
            </div>
            <h1 className="font-medium lg:text-76 md:text-70 text-54 lg:text-start text-center text-white mb-10">
              للإستثمار والتداول في <span className="text-primary">سوق الفوركس</span> والعملات{" "}
              <span className="text-primary">الرقمية</span>
            </h1>
            <div className="flex items-center md:justify-start justify-center gap-8">
              <a href="#services"
                className="bg-primary border border-primary rounded-lg text-21 font-medium hover:bg-transparent hover:text-primary text-darkmode py-2 px-7 z-50 transition-all duration-300"
              >
                تعرف على المزيد
              </a>
            </div>
          </div>

          <div className="col-span-7 lg:block hidden animate-slide-in-right">
            <div className="-mr-40 -ml-20">
              <Image
                src={`${getImagePrefix()}images/hero/banner-image.png`}
                alt="Banner"
                width={1150}
                height={1150}
              />
            </div>
          </div>
        </div>
        <CardSlider />
      </div>
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>
    </section>
  );
};

export default Hero;