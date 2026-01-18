import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";

const CardSlider = () => {
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Configuration for the assets we want to display
  const assetConfig = [
    {
      symbol: 'C:XAUUSD',
      title: 'Gold',
      short: 'XAU',
      icon: '/path/to/gold-icon.svg', // Update with your actual icon path
      background: 'bg-yellow-500',
      padding: 'p-2',
      width: 24,
      height: 24
    },
    {
      symbol: 'EUR/USD',
      title: 'Euro',
      short: 'EUR',
      icon: '/path/to/euro-icon.svg', // Update with your actual icon path
      background: 'bg-blue-500',
      padding: 'p-2',
      width: 24,
      height: 24
    },
    {
      symbol: 'GBP/USD', // Replacing Oil with GBP/USD
      title: 'British Pound',
      short: 'GBP',
      icon: '/path/to/gbp-icon.svg', // Update with your actual icon path
      background: 'bg-red-500',
      padding: 'p-2',
      width: 24,
      height: 24
    },
    {
      symbol: 'C:XAGUSD',
      title: 'Silver',
      short: 'XAG',
      icon: '/path/to/silver-icon.svg', // Update with your actual icon path
      background: 'bg-gray-400',
      padding: 'p-2',
      width: 24,
      height: 24
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

  // Function to fetch data from Massive API
  const fetchMarketData = async () => {
    setIsLoading(true);
    const API_KEY = process.env.NEXT_PUBLIC_MASSIVE_API_KEY || 'YOUR_API_KEY_HERE';
    const BASE_URL = 'https://api.massive.com/v1';

    try {
      const promises = assetConfig.map(async (asset) => {
        try {
          const response = await fetch(
            `${BASE_URL}/quotes/${asset.symbol}?apiKey=${API_KEY}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch ${asset.symbol}`);
          }

          const data = await response.json();

          // Format the data to match your component structure
          return {
            ...asset,
            price: `$${data.last?.bid?.toFixed(2) || 'N/A'}`,
            mark: data.change_percent >= 0
              ? `+${data.change_percent?.toFixed(2) || '0.00'}%`
              : `${data.change_percent?.toFixed(2) || '0.00'}%`
          };
        } catch (error) {
          console.error(`Error fetching ${asset.symbol}:`, error);
          // Return asset with placeholder data if API call fails
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
      // Fallback to static data if all API calls fail
      const fallbackData = assetConfig.map(asset => ({
        ...asset,
        price: '$0.00',
        mark: '0.00%'
      }));
      setPriceData(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount and set up refresh interval
  useEffect(() => {
    fetchMarketData();

    // Refresh data every 30 seconds
    const intervalId = setInterval(fetchMarketData, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="lg:-mt-16 mt-16">
        <Slider {...settings}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="pr-6">
              <div className="px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl animate-pulse">
                <div className="flex items-center gap-5">
                  <div className="bg-gray-700 rounded-full w-12 h-12"></div>
                  <div className="h-4 bg-gray-700 rounded w-24"></div>
                </div>
                <div className="flex justify-between mt-7">
                  <div className="h-6 bg-gray-700 rounded w-16"></div>
                  <div className="h-4 bg-gray-700 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <div className="lg:-mt-16 mt-16">
      <Slider {...settings}>
        {priceData.map((item, index) => (
          <div key={index} className="pr-6">
            <div className="px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl">
              <div className="flex items-center gap-5">
                <div
                  className={`${item.background} ${item.padding} rounded-full`}
                >
                  <Image
                    src={`${getImagePrefix()}${item.icon}`}
                    alt="icon"
                    width={item.width}
                    height={item.height}
                  />
                </div>
                <p className="text-white text-xs font-normal ">
                  <span className="text-16 font-bold mr-2">{item.title}</span>
                  {item.short}
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