import React, { useState, useEffect } from 'react';
import { CheckIcon } from './icons/CheckIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import type { ProcessStep } from '../types';

interface ProcessTrackerProps {
  steps: ProcessStep[];
  currentStep: number;
}

const Step: React.FC<{ step: ProcessStep; index: number; currentStep: number }> = ({ step, index, currentStep }) => {
  const [progress, setProgress] = useState(0);
  const [substepIndex, setSubstepIndex] = useState(0);

  const isActive = index === currentStep;
  const isCompleted = index < currentStep;

  useEffect(() => {
    if (isActive) {
      // Animate progress bar
      setProgress(0); // Reset progress on new step
      const progressTimer = setTimeout(() => setProgress(100), 50); // Start animation

      // Cycle through substeps
      const substepInterval = step.duration / step.substeps.length;
      const substepTimer = setInterval(() => {
        setSubstepIndex(prev => (prev < step.substeps.length - 1 ? prev + 1 : prev));
      }, substepInterval);
      
      return () => {
        clearTimeout(progressTimer);
        clearInterval(substepTimer);
      };
    }
  }, [isActive, step.duration, step.substeps.length]);

  const getStatusClasses = () => {
    if (isCompleted) return 'bg-green-100 dark:bg-green-900/40';
    if (isActive) return 'bg-cyan-100 dark:bg-cyan-900/40 scale-105 shadow-lg';
    return 'bg-gray-100 dark:bg-gray-800';
  };

  const getIcon = () => {
    if (isCompleted) return <CheckIcon className="w-5 h-5" />;
    if (isActive) return <SpinnerIcon className="w-5 h-5 animate-spin" />;
    return <span className="font-bold">{index + 1}</span>;
  };
  
  const getIconBg = () => {
    if (isCompleted) return 'bg-green-500 text-white';
    if (isActive) return 'bg-cyan-500 text-white';
    return 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300';
  }

  const getTextColor = () => {
    if (isCompleted) return 'text-green-800 dark:text-green-300';
    if (isActive) return 'text-cyan-800 dark:text-cyan-300';
    return 'text-gray-600 dark:text-gray-400';
  }

  return (
    <div className={`p-4 rounded-lg transition-all duration-500 ${getStatusClasses()}`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 ${getIconBg()}`}>
          {getIcon()}
        </div>
        <div className="flex-grow">
          <p className={`font-medium ${getTextColor()}`}>{step.name}</p>
          {isActive && (
            <div className="mt-2 text-sm text-cyan-700 dark:text-cyan-400">
              {step.substeps.map((sub, i) => (
                 <p key={sub} className={`transition-opacity duration-300 ${i === substepIndex ? 'font-semibold opacity-100' : 'opacity-60'}`}>
                   - {sub}
                 </p>
              ))}
            </div>
          )}
        </div>
      </div>
       {isActive && (
        <div className="mt-3 ml-12 bg-cyan-200 dark:bg-cyan-800/60 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-cyan-500 h-1.5 rounded-full" 
              style={{ width: `${progress}%`, transition: `width ${step.duration}ms linear` }}
            />
        </div>
      )}
    </div>
  );
};

export const ProcessTracker: React.FC<ProcessTrackerProps> = ({ steps, currentStep }) => {
  return (
    <div className="mt-12 w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-center mb-6 text-gray-700 dark:text-gray-300">Generation Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Step key={step.name} step={step} index={index} currentStep={currentStep} />
        ))}
      </div>
    </div>
  );
};