import { GoogleGenAI, Type } from "@google/genai";
import type { AgentConfig } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const agentConfigSchema = {
  type: Type.OBJECT,
  properties: {
    agent_creation_id: { type: Type.STRING, description: "A unique identifier for the agent creation job." },
    goal_analysis: {
      type: Type.OBJECT,
      properties: {
        original_goal: { type: Type.STRING },
        parsed_requirements: {
          type: Type.OBJECT,
          properties: {
            primary_tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
            data_sources: { type: Type.ARRAY, items: { type: Type.STRING } },
            output_format: { type: Type.STRING },
            complexity_score: { type: Type.NUMBER },
            estimated_runtime: { type: Type.STRING },
          },
          required: ['primary_tasks', 'data_sources', 'output_format', 'complexity_score', 'estimated_runtime'],
        },
        resource_requirements: {
          type: Type.OBJECT,
          properties: {
            cpu_cores: { type: Type.INTEGER },
            memory_gb: { type: Type.INTEGER },
            storage_gb: { type: Type.INTEGER },
            network_bandwidth: { type: Type.STRING },
          },
          required: ['cpu_cores', 'memory_gb', 'storage_gb', 'network_bandwidth'],
        },
      },
      required: ['original_goal', 'parsed_requirements', 'resource_requirements'],
    },
    agent_architecture: {
      type: Type.OBJECT,
      properties: {
        agent_type: { type: Type.STRING },
        memory_system: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            components: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  purpose: { type: Type.STRING },
                  size_limit: { type: Type.STRING },
                  retention_days: { type: Type.INTEGER },
                },
                required: ['type', 'purpose'],
              },
            },
          },
          required: ['type', 'components'],
        },
        tool_configuration: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tool_name: { type: Type.STRING },
              version: { type: Type.STRING },
              // 'config' is a free-form object and causes schema validation errors.
              // It is removed from the schema; the model will generate it based on the system prompt.
            },
            required: ['tool_name', 'version'],
          },
        },
        task_loop: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            // 'schedule' is a free-form object and causes schema validation errors.
            // It is removed from the schema; the model will generate it based on the system prompt.
            error_handling: { type: Type.STRING },
            failover: { type: Type.STRING },
          },
          required: ['type', 'error_handling', 'failover'],
        },
      },
      required: ['agent_type', 'memory_system', 'tool_configuration', 'task_loop'],
    },
    deployment_config: {
      type: Type.OBJECT,
      properties: {
        container_spec: {
          type: Type.OBJECT,
          properties: {
            base_image: { type: Type.STRING },
            dependencies: { type: Type.ARRAY, items: { type: Type.STRING } },
            environment_variables: {
              type: Type.OBJECT,
              description: "Environment variables for the container.",
              properties: {
                LOG_LEVEL: { 
                  type: Type.STRING,
                  description: "The logging level, e.g., 'INFO', 'DEBUG'."
                },
                MONITORING_INTERVAL: { 
                  type: Type.STRING,
                  description: "The interval in seconds for monitoring, e.g., '300'."
                },
              },
            },
            resource_limits: {
              type: Type.OBJECT,
              properties: {
                cpu: { type: Type.STRING },
                memory: { type: Type.STRING },
                storage: { type: Type.STRING },
              },
              required: ['cpu', 'memory', 'storage'],
            },
          },
          required: ['base_image', 'dependencies', 'environment_variables', 'resource_limits'],
        },
        kubernetes_config: {
          type: Type.OBJECT,
          properties: {
            namespace: { type: Type.STRING },
            deployment_type: { type: Type.STRING },
            replicas: { type: Type.INTEGER },
            persistent_volumes: { type: Type.ARRAY, items: { type: Type.STRING } },
            secrets: { type: Type.ARRAY, items: { type: Type.STRING } },
            networking: {
              type: Type.OBJECT,
              properties: {
                internal_service: { type: Type.BOOLEAN },
                ingress_enabled: { type: Type.BOOLEAN },
                security_groups: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['internal_service', 'ingress_enabled', 'security_groups'],
            },
          },
          required: ['namespace', 'deployment_type', 'replicas', 'persistent_volumes', 'secrets', 'networking'],
        },
      },
      required: ['container_spec', 'kubernetes_config'],
    },
    generated_code: {
      type: Type.OBJECT,
      properties: {
        main_agent_file: { type: Type.STRING },
        config_files: { type: Type.ARRAY, items: { type: Type.STRING } },
        dockerfile: { type: Type.STRING },
        k8s_manifests: { type: Type.ARRAY, items: { type: Type.STRING } },
        total_lines_of_code: { type: Type.INTEGER },
        code_quality_score: { type: Type.NUMBER },
      },
      required: ['main_agent_file', 'config_files', 'dockerfile', 'k8s_manifests', 'total_lines_of_code', 'code_quality_score'],
    },
    monitoring_setup: {
      type: Type.OBJECT,
      properties: {
        metrics_enabled: { type: Type.ARRAY, items: { type: Type.STRING } },
        alerting_rules: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              condition: { type: Type.STRING },
              action: { type: Type.STRING },
            },
            required: ['condition', 'action'],
          },
        },
        dashboard_url: { type: Type.STRING },
      },
      required: ['metrics_enabled', 'alerting_rules', 'dashboard_url'],
    },
    performance_predictions: {
      type: Type.OBJECT,
      properties: {
        estimated_daily_mentions_processed: { type: Type.INTEGER },
        report_generation_time_minutes: { type: Type.NUMBER },
        monthly_cost_estimate: { type: Type.STRING },
        confidence_interval: { type: Type.NUMBER },
      },
      required: ['estimated_daily_mentions_processed', 'report_generation_time_minutes', 'monthly_cost_estimate', 'confidence_interval'],
    },
  },
  required: ['agent_creation_id', 'goal_analysis', 'agent_architecture', 'deployment_config', 'generated_code', 'monitoring_setup', 'performance_predictions'],
};


export const generateAgentConfiguration = async (goal: string): Promise<AgentConfig> => {
  const systemInstruction = `You are an expert AI software architect for a production-grade meta-AI agent platform. Your task is to autonomously design, configure, and generate deployment specifications for specialized AI agents based on a high-level goal provided by the user.

  Follow these steps:
  1.  **Goal Analysis**: Decompose the user's goal into specific, actionable requirements. Estimate resource needs (CPU, memory, etc.).
  2.  **Architecture Design**: Select an optimal agent architecture, memory system (vector, episodic, hybrid), and a task loop pattern (e.g., scheduled, event-driven).
  3.  **Tool Selection**: Choose and configure the necessary tools (APIs, databases, ML models) for the agent to function.
  4.  **Container & Orchestration**: Define the Docker container specifications and Kubernetes deployment manifests.
  5.  **Code & Monitoring**: Outline the generated code files and set up monitoring metrics and alerts.
  6.  **Performance Prediction**: Estimate key performance metrics and operational costs.
  
  You MUST generate a response in a single, valid JSON object that strictly adheres to the provided schema. The 'original_goal' in the response should be the user's input. Create a plausible and detailed configuration based on the user's goal.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: goal,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: agentConfigSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate agent configuration from the API.");
  }
};