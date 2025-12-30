import React, { useState, useEffect } from 'react';
import { AlertCircle, Volume2, VolumeX } from 'lucide-react';

interface NewsTickerProps {
  items: string[];
  speed?: number;
}

const NewsTicker: React.FC<NewsTickerProps> = ({ items, speed = 50 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length, isPlaying]);

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full mr-4 flex-shrink-0">
            <AlertCircle className="h-4 w-4 mr-2 animate-pulse" />
            <span className="text-sm font-bold">BREAKING</span>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center">
              <div className="animate-marquee whitespace-nowrap">
                <span className="text-sm font-medium">
                  {items[currentIndex]}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-4 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            title={isPlaying ? 'Pause ticker' : 'Play ticker'}
          >
            {isPlaying ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;