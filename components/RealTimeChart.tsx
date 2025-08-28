import React, { useState, useEffect, useMemo } from 'react';

const CHART_POINTS = 30; // Number of data points to show
const UPDATE_INTERVAL = 2000; // Update every 2 seconds

export const RealTimeChart: React.FC = () => {
  const [data, setData] = useState<number[]>(() => 
    Array.from({ length: CHART_POINTS }, () => Math.random() * 25 + 10)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const lastValue = newData[newData.length - 1];
        const nextValue = lastValue + (Math.random() - 0.5) * 10;
        newData.push(Math.max(5, Math.min(95, nextValue))); // Clamp between 5 and 95
        return newData;
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const svgPath = useMemo(() => {
    const width = 300;
    const height = 150;
    const path = data
      .map((point, i) => {
        const x = (i / (CHART_POINTS - 1)) * width;
        const y = height - (point / 100) * height;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
    return path;
  }, [data]);
  
  const lastDataPoint = data[data.length - 1];

  return (
    <div className="w-full h-full relative">
       <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none" className="absolute top-0 left-0">
          {/* Gradient */}
          <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gradient-start, #06b6d4)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--gradient-end, #06b6d4)" stopOpacity="0" />
              </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path d={`${svgPath} L 300 150 L 0 150 Z`} fill="url(#chartGradient)" />
          
          {/* Line */}
          <path d={svgPath} fill="none" stroke="#06b6d4" strokeWidth="2" />

          {/* Current value marker */}
           <circle 
              cx={( (CHART_POINTS -1) / (CHART_POINTS - 1)) * 300} 
              cy={150 - (lastDataPoint / 100) * 150} 
              r="4" 
              fill="#06b6d4" 
              stroke="white" 
              strokeWidth="2"
            />
      </svg>
      <div className="absolute top-0 right-0 p-2 text-right">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{lastDataPoint.toFixed(1)}%</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
      </div>
    </div>
  );
};
