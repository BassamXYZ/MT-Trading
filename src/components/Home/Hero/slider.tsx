import { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";

const CardSlider = () => {
  const [priceData, setPriceData] = useState([]);
  const hasFetchedRef = useRef(false);


  const assetConfig = [
    {
      symbol: 'C:XAUUSD',
      title: 'Gold',
      short: 'XAU',
      background: 'bg-yellow-500',
    },
    {
      symbol: 'C:EUR-USD',
      title: 'Euro',
      short: 'EUR',
      background: 'bg-blue-500',
    },
    {
      symbol: 'C:GBP-USD',
      title: 'British Pound',
      short: 'GBP',
      background: 'bg-red-500',
    },
    {
      symbol: 'C:XAGUSD',
      title: 'Silver',
      short: 'XAG',
      background: 'bg-gray-400',
    }
  ];

  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 1500,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };


  const fetchMarketData = async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const API_KEY = process.env.NEXT_PUBLIC_MASSIVE_API_KEY;
    const BASE_URL = 'https://api.massive.com/v1';
    const date = new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0];

    try {
      const promises = assetConfig.map(async (asset) => {
        try {
          const response = await fetch(
            `${BASE_URL}/open-close/${asset.symbol}/${date}?apiKey=${API_KEY}`
          );

          const data = await response.json();
          return {
            ...asset,
            price: `$${data.close?.toFixed(2) || 'N/A'}`,
            mark: (data.close / data.open - 1) * 100 >= 0
              ? `+${((data.close / data.open - 1) * 100)?.toFixed(2) || '0.00'}%`
              : `${((data.close / data.open - 1) * 100)?.toFixed(2) || '0.00'}%`
          };
        } catch (error) {
          console.error(`Error fetching ${asset.symbol}:`, error);
          return {
            ...asset,
            price: '$0.00',
            mark: '0.00%'
          };
        }
      });

      const results = await Promise.all(promises);
      setPriceData(results);
    } catch (error) {
      console.error('Error fetching market data:', error);
      const fallbackData = assetConfig.map(asset => ({
        ...asset,
        price: '$0.00',
        mark: '0.00%'
      }));
      setPriceData(fallbackData);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <div className="lg:-mt-16 mt-16">
      <Slider {...settings}>
        {priceData.map((item, index) => (
          <div key={index} className="pr-6">
            <div className="px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl">
              <div className="flex items-center gap-5">
                <div
                  className={`${item.background} p-2 rounded-full`}
                >
                  {item.short}
                </div>
                <p className="text-white text-xs font-normal ">
                  <span className="text-16 font-bold mr-2">{item.title}</span>
                </p>
              </div>
              <div className="flex justify-between mt-7">
                <div className="">
                  <p className="text-16 font-bold text-white mb-0 leading-none">
                    {item.price}
                  </p>
                </div>
                <div className="">
                  <span className={`text-xs ${item.mark.startsWith('+') ? 'text-green-500' : 'text-error'}`}>
                    {item.mark}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;