import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { GoalInput } from './components/GoalInput';
import { ProcessTracker } from './components/ProcessTracker';
import { GeneratedAgentView } from './components/GeneratedAgentView';
import { generateAgentConfiguration } from './services/geminiService';
import type { AgentConfig, ProcessStep } from './types';

const App: React.FC = () => {
  const [goal, setGoal] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [generatedAgent, setGeneratedAgent] = useState<AgentConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps: ProcessStep[] = [
    { name: 'Analyzing Goal', duration: 2000, substeps: ['Decomposing requirements', 'Estimating resources', 'Parsing data sources'] },
    { name: 'Designing Architecture', duration: 2500, substeps: ['Selecting agent pattern', 'Defining memory system', 'Matching model architecture'] },
    { name: 'Configuring Tools & Memory', duration: 2200, substeps: ['Integrating APIs', 'Setting up vector DB', 'Configuring task loops'] },
    { name: 'Generating Code & Deployment Specs', duration: 3000, substeps: ['Creating agent file', 'Building Docker container spec', 'Generating Kubernetes manifests'] },
    { name: 'Finalizing Agent Profile', duration: 1500, substeps: ['Setting up monitoring', 'Calculating performance predictions', 'Compiling final configuration'] },
  ];

  useEffect(() => {
    if (isGenerating && currentStep < steps.length) {
      const currentStepDuration = steps[currentStep].duration;
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, currentStepDuration);
      
      return () => clearTimeout(timer);
    }
  }, [isGenerating, currentStep, steps]);

  const handleGenerate = useCallback(async () => {
    if (!goal.trim()) {
      setError('Please enter a goal for your AI agent.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    setGeneratedAgent(null);
    setCurrentStep(0);

    try {
      const result = await generateAgentConfiguration(goal);
      setGeneratedAgent(result);
      setCurrentStep(steps.length); // Mark all steps as complete
    } catch (err) {
      console.error(err);
      setError('Failed to generate agent configuration. Please check your API key and try again.');
      // Stop the process on error
      setCurrentStep(steps.length + 1); // Go to a state beyond the last step
    } finally {
      setIsGenerating(false);
    }
  }, [goal, steps.length]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            Describe the high-level goal for your AI agent. Our meta-agent will autonomously design, configure, and generate a production-ready deployment plan.
          </p>
          
          <GoalInput 
            goal={goal}
            setGoal={setGoal}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg text-center">
              {error}
            </div>
          )}

          {(isGenerating || generatedAgent || error) && currentStep <= steps.length && (
             <ProcessTracker steps={steps} currentStep={currentStep} />
          )}

          {generatedAgent && !isGenerating && (
            <div className="mt-12">
              <GeneratedAgentView agentConfig={generatedAgent} />
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} myOnsite HealthCare, LLC. AI Agent Builder.</p>
      </footer>
    </div>
  );
};

export default App;
