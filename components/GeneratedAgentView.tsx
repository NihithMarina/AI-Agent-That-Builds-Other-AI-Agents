import React, { useState } from 'react';
import type { AgentConfig } from '../types';
import { OutputDisplay } from './OutputDisplay';
import { AgentLifecycleDashboard } from './AgentLifecycleDashboard';

interface GeneratedAgentViewProps {
  agentConfig: AgentConfig;
}

type ViewTab = 'details' | 'dashboard';

export const GeneratedAgentView: React.FC<GeneratedAgentViewProps> = ({ agentConfig }) => {
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');

  const TabButton: React.FC<{ tabKey: ViewTab; label: string }> = ({ tabKey, label }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-cyan-500 ${
        activeTab === tabKey
          ? 'bg-cyan-600 text-white shadow'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="flex items-center justify-center space-x-2 mb-6">
        <TabButton tabKey="dashboard" label="Live Dashboard" />
        <TabButton tabKey="details" label="Configuration Details" />
      </div>

      <div>
        {activeTab === 'dashboard' && <AgentLifecycleDashboard agentConfig={agentConfig} />}
        {activeTab === 'details' && (
           <div>
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                Generated Agent Configuration
              </h2>
              <OutputDisplay agentConfig={agentConfig} />
            </div>
        )}
      </div>
    </div>
  );
};
