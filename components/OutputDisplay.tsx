
import React, { useState } from 'react';
import type { AgentConfig } from '../types';
import { CodeBlock } from './CodeBlock';

interface OutputDisplayProps {
  agentConfig: AgentConfig;
}

type TabKey = 'goal' | 'architecture' | 'deployment' | 'code' | 'monitoring' | 'predictions';

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ agentConfig }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('goal');

  const tabs: { key: TabKey, label: string, data: object }[] = [
    { key: 'goal', label: 'Goal Analysis', data: agentConfig.goal_analysis },
    { key: 'architecture', label: 'Architecture', data: agentConfig.agent_architecture },
    { key: 'deployment', label: 'Deployment', data: agentConfig.deployment_config },
    { key: 'code', label: 'Generated Code', data: agentConfig.generated_code },
    { key: 'monitoring', label: 'Monitoring', data: agentConfig.monitoring_setup },
    { key: 'predictions', label: 'Predictions', data: agentConfig.performance_predictions },
  ];

  const TabButton: React.FC<{ tabKey: TabKey; label: string }> = ({ tabKey, label }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        activeTab === tabKey
          ? 'bg-cyan-600 text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <TabButton key={tab.key} tabKey={tab.key} label={tab.label} />
          ))}
        </div>
      </div>
      <div className="p-2 md:p-4">
        {tabs.map(tab => (
          <div key={tab.key} className={activeTab === tab.key ? 'block' : 'hidden'}>
            <CodeBlock content={JSON.stringify(tab.data, null, 2)} />
          </div>
        ))}
      </div>
    </div>
  );
};
