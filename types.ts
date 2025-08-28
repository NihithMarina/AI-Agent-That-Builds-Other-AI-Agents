
export interface ProcessStep {
  name: string;
  duration: number;
  substeps: string[];
}

export interface AgentConfig {
  agent_creation_id: string;
  goal_analysis: GoalAnalysis;
  agent_architecture: AgentArchitecture;
  deployment_config: DeploymentConfig;
  generated_code: GeneratedCode;
  monitoring_setup: MonitoringSetup;
  performance_predictions: PerformancePredictions;
}

export interface GoalAnalysis {
  original_goal: string;
  parsed_requirements: ParsedRequirements;
  resource_requirements: ResourceRequirements;
}

export interface ParsedRequirements {
  primary_tasks: string[];
  data_sources: string[];
  output_format: string;
  complexity_score: number;
  estimated_runtime: string;
}

export interface ResourceRequirements {
  cpu_cores: number;
  memory_gb: number;
  storage_gb: number;
  network_bandwidth: string;
}

export interface AgentArchitecture {
  agent_type: string;
  memory_system: MemorySystem;
  tool_configuration: ToolConfiguration[];
  task_loop: TaskLoop;
}

export interface MemorySystem {
  type: string;
  components: MemoryComponent[];
}

export interface MemoryComponent {
  type: string;
  purpose: string;
  size_limit?: string;
  retention_days?: number;
}

export interface ToolConfiguration {
  tool_name: string;
  version: string;
  config: Record<string, any>;
}

export interface TaskLoop {
  type: string;
  schedule: Record<string, string>;
  error_handling: string;
  failover: string;
}

export interface DeploymentConfig {
  container_spec: ContainerSpec;
  kubernetes_config: KubernetesConfig;
}

export interface ContainerSpec {
  base_image: string;
  dependencies: string[];
  environment_variables: Record<string, string>;
  resource_limits: ResourceLimits;
}

export interface ResourceLimits {
  cpu: string;
  memory: string;
  storage: string;
}

export interface KubernetesConfig {
  namespace: string;
  deployment_type: string;
  replicas: number;
  persistent_volumes: string[];
  secrets: string[];
  networking: Networking;
}

export interface Networking {
    internal_service: boolean;
    ingress_enabled: boolean;
    security_groups: string[];
}

export interface GeneratedCode {
  main_agent_file: string;
  config_files: string[];
  dockerfile: string;
  k8s_manifests: string[];
  total_lines_of_code: number;
  code_quality_score: number;
}

export interface MonitoringSetup {
  metrics_enabled: string[];
  alerting_rules: AlertingRule[];
  dashboard_url: string;
}

export interface AlertingRule {
  condition: string;
  action: string;
}

export interface PerformancePredictions {
  estimated_daily_mentions_processed: number;
  report_generation_time_minutes: number;
  monthly_cost_estimate: string;
  confidence_interval: number;
}