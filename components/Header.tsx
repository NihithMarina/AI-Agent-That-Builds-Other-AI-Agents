
import React from 'react';

const Logo: React.FC = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" className="inline-block mr-3 text-cyan-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40c10.3 0 19.8-3.9 27.2-10.4-1.2-.8-2.4-1.7-3.5-2.6-6.4 4.8-14.3 7.6-22.7 7.6-18.2 0-33-14.8-33-33s14.8-33 33-33c11.6 0 21.8 6 27.6 15.1.3.6.6 1.1.9 1.7C88.2 36.3 90 42.9 90 50c0 4.1-0.6 8.1-1.8 11.9 1.4.3 2.9.5 4.3.5 1.7 0 3.3-0.2 4.9-0.6C98.9 57.5 100 53.8 100 50c0-14.5-6.8-27.4-17.6-35.4C73.4 3.9 62.1 0 50 0 22.4 0 0 22.4 0 50c0 23.4 16 43.1 38.1 48.4 2.8-1.5 5.5-3.3 7.9-5.4C40.6 89.1 35 80.4 35 70c0-10.3 6.1-19.2 15-23.2V50c0 8.3 6.7 15 15 15s15-6.7 15-15V32.3C68.9 22.6 59.8 17 50 17c-13.4 0-24.8 8.4-29.3 20.1-1.3-2.1-2.4-4.2-3.3-6.4C22 21.1 35.3 10 50 10z"/>
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-center">
        <Logo />
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            myOnsite<span className="text-cyan-500">HealthCare</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">AI Agent That Builds Other AI Agents</p>
        </div>
      </div>
    </header>
  );
};
