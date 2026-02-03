import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";

interface MarketData {
  symbol: string;
  title: string;
  short: string;
  background: string;
  price: string;
  mark: string;
}

async function fetchMarketData(): Promise<MarketData[]> {
  const API_KEY = process.env.NEXT_PUBLIC_MASSIVE_API_KEY;
  const BASE_URL = 'https://api.massive.com/v1';
  const date = new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0];

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

  try {
    const promises = assetConfig.map(async (asset) => {
      try {
        const response = await fetch(
          `${BASE_URL}/open-close/${asset.symbol}/${date}?apiKey=${API_KEY}`,
          { 
            next: { revalidate: 3600 } // Revalidate every hour
          }
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

    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching market data:', error);
    return assetConfig.map(asset => ({
      ...asset,
      price: '$0.00',
      mark: '0.00%'
    }));
  }
}

const CardSlider = async () => {
  const priceData = await fetchMarketData();

  return (
    <div className="lg:-mt-16 mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {priceData.map((item, index) => (
          <div 
            key={index} 
            className="px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-5">
              <div className={`${item.background} p-2 rounded-full text-white text-xs font-bold`}>
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
        ))}
      </div>
    </div>
  );
};

export default CardSlider;