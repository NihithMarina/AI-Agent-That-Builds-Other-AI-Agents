import React from 'react';
import type { AgentConfig } from '../types';
import { RealTimeChart } from './RealTimeChart';
import { ArrowPathIcon } from './icons/ArrowPathIcon';
import { StopIcon } from './icons/StopIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CogIcon } from './icons/CogIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
    </div>
    <div className="p-4 flex-grow">{children}</div>
  </div>
);

export const AgentLifecycleDashboard: React.FC<{ agentConfig: AgentConfig }> = ({ agentConfig }) => {
  const evolutionLogs = [
    { time: '2m ago', type: 'EVOLVE', message: "Model 'roberta-base-sentiment' updated to v1.3. Accuracy +4%." },
    { time: '15m ago', type: 'HEAL', message: 'Agent restarted due to API error rate exceeding 15%.' },
    { time: '1h ago', type: 'OPTIMIZE', message: 'Scaled memory resources down by 10% during off-peak hours.' },
    { time: '3h ago', type: 'HEAL', message: 'Cleared task queue backlog after dependency resolution.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Agent Live Management
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lifecycle Management */}
        <DashboardCard title="Lifecycle Management" icon={<CogIcon className="w-6 h-6 mr-3 text-cyan-500" />}>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Agent ID</p>
              <p className="font-mono text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">{agentConfig.agent_creation_id}</p>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">Status:</p>
              <span className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Running
              </span>
            </div>
            <div className="flex space-x-2 pt-2">
              <button disabled className="flex-1 flex items-center justify-center p-2 text-sm bg-red-500 text-white rounded-lg opacity-50 cursor-not-allowed"><StopIcon className="w-4 h-4 mr-1" /> Stop</button>
              <button disabled className="flex-1 flex items-center justify-center p-2 text-sm bg-blue-500 text-white rounded-lg opacity-50 cursor-not-allowed"><ArrowPathIcon className="w-4 h-4 mr-1" /> Restart</button>
              <button disabled className="flex-1 flex items-center justify-center p-2 text-sm bg-gray-600 text-white rounded-lg opacity-50 cursor-not-allowed"><TrashIcon className="w-4 h-4 mr-1" /> Delete</button>
            </div>
          </div>
        </DashboardCard>

        {/* Real-time Monitoring */}
        <DashboardCard title="Real-time Monitoring" icon={<ChartBarIcon className="w-6 h-6 mr-3 text-cyan-500" />}>
           <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">CPU Usage (%)</p>
           <div className="h-48">
             <RealTimeChart />
           </div>
        </DashboardCard>

        {/* Performance & Optimization */}
        <DashboardCard title="Performance & Optimization" icon={<CogIcon className="w-6 h-6 mr-3 text-cyan-500" />}>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Cost Estimate</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{agentConfig.performance_predictions.monthly_cost_estimate}</p>
                </div>
                 <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Report Time</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{agentConfig.performance_predictions.report_generation_time_minutes} min</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Auto-Optimization</p>
                     <label className="inline-flex items-center cursor-pointer opacity-50 cursor-not-allowed">
                        <input type="checkbox" value="" className="sr-only peer" disabled/>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                    </label>
                </div>
            </div>
        </DashboardCard>

        {/* Self-Evolution Log */}
        <DashboardCard title="Self-Evolution Log" icon={<CogIcon className="w-6 h-6 mr-3 text-cyan-500" />}>
            <div className="space-y-3 text-sm h-48 overflow-y-auto pr-2">
                {evolutionLogs.map(log => (
                    <div key={log.message} className="flex items-start">
                         <p className="w-16 flex-shrink-0 text-gray-400 dark:text-gray-500 text-xs">{log.time}</p>
                         <p>
                             <span className={`font-semibold mr-2 ${
                                 log.type === 'EVOLVE' ? 'text-purple-500' :
                                 log.type === 'HEAL' ? 'text-orange-500' : 'text-blue-500'
                             }`}>{log.type}</span>
                             <span className="text-gray-600 dark:text-gray-300">{log.message}</span>
                         </p>
                    </div>
                ))}
            </div>
        </DashboardCard>
      </div>
    </div>
  );
};
