
import React from 'react';
import { BotIcon } from './icons/BotIcon';

interface GoalInputProps {
  goal: string;
  setGoal: (goal: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const GoalInput: React.FC<GoalInputProps> = ({ goal, setGoal, onGenerate, isGenerating }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="e.g., Create an agent that monitors social media for brand mentions and generates daily sentiment reports."
        className="w-full h-32 p-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 resize-none"
        disabled={isGenerating}
      />
      <button
        onClick={onGenerate}
        disabled={isGenerating || !goal.trim()}
        className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        <BotIcon className="w-6 h-6 mr-2" />
        {isGenerating ? 'Generating Agent...' : 'Generate Agent'}
      </button>
    </div>
  );
};
