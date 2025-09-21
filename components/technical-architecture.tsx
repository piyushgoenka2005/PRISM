"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  Brain,
  Cpu,
  Network,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
  Layers,
  GitBranch,
} from "lucide-react"
import { cn } from "@/lib/utils"

const architectureComponents = [
  {
    id: "data-ingestion",
    name: "Data Ingestion Layer",
    icon: Database,
    description: "SAR imagery preprocessing and validation pipeline",
    technologies: ["Apache Kafka", "MinIO", "GDAL", "Sentinel-1 API"],
    metrics: { throughput: "500 GB/hour", latency: "< 2 seconds", accuracy: "99.9%" },
  },
  {
    id: "preprocessing",
    name: "Preprocessing Engine",
    icon: Zap,
    description: "Noise reduction, calibration, and geometric correction",
    technologies: ["OpenCV", "NumPy", "SNAP Toolbox", "Custom Filters"],
    metrics: { throughput: "200 images/min", latency: "< 5 seconds", accuracy: "98.5%" },
  },
  {
    id: "feature-extraction",
    name: "Feature Extraction",
    icon: Layers,
    description: "Multi-scale texture and geometric feature analysis",
    technologies: ["Scikit-image", "Mahotas", "PyRadiomics", "Custom Kernels"],
    metrics: { throughput: "150 features/s", latency: "< 3 seconds", accuracy: "97.8%" },
  },
  {
    id: "deep-learning",
    name: "Deep Learning Core",
    icon: Brain,
    description: "Neural network classification and segmentation",
    technologies: ["PyTorch", "CUDA", "TensorRT", "Custom U-Net"],
    metrics: { throughput: "50 images/min", latency: "< 10 seconds", accuracy: "99.2%" },
  },
  {
    id: "post-processing",
    name: "Post-Processing",
    icon: Cpu,
    description: "Morphological operations and result refinement",
    technologies: ["OpenCV", "SciPy", "Skimage", "Custom Algorithms"],
    metrics: { throughput: "300 results/min", latency: "< 2 seconds", accuracy: "98.9%" },
  },
  {
    id: "api-layer",
    name: "API & Orchestration",
    icon: Network,
    description: "RESTful APIs and workflow orchestration",
    technologies: ["FastAPI", "Celery", "Redis", "Docker"],
    metrics: { throughput: "1000 req/s", latency: "< 100 milliseconds", accuracy: "99.9%" },
  },
]

const performanceMetrics = [
  { name: "Overall Accuracy", value: 99.2, target: 95, color: "text-primary" },
  { name: "F1 Score", value: 96.8, target: 90, color: "text-secondary" },
  { name: "IoU Score", value: 89.4, target: 85, color: "text-accent" },
  { name: "Processing Speed", value: 94.5, target: 80, color: "text-chart-1" },
  { name: "Memory Efficiency", value: 87.2, target: 75, color: "text-chart-2" },
  { name: "Scalability", value: 91.8, target: 85, color: "text-chart-3" },
]

const dataFlowSteps = [
  { id: 1, name: "SAR Data Input", status: "active" },
  { id: 2, name: "Preprocessing", status: "processing" },
  { id: 3, name: "Feature Extraction", status: "pending" },
  { id: 4, name: "Neural Network", status: "pending" },
  { id: 5, name: "Post-Processing", status: "pending" },
  { id: 6, name: "Results Output", status: "pending" },
]

export function TechnicalArchitecture() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [dataFlowAnimation, setDataFlowAnimation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlowAnimation((prev) => (prev + 1) % dataFlowSteps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="technical" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Technical Excellence
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            PRISM{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Architecture
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore the sophisticated deep learning pipeline and distributed architecture powering our SAR imagery
            analysis platform.
          </p>
        </div>

        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="pipeline">Data Pipeline</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="space-y-8">
            {/* Architecture Overview */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5" />
                      System Architecture
                    </CardTitle>
                    <CardDescription>Interactive component diagram</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {architectureComponents.map((component) => {
                        const Icon = component.icon
                        const isSelected = selectedComponent === component.id
                        return (
                          <Card
                            key={component.id}
                            className={cn(
                              "cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105",
                              isSelected && "ring-2 ring-primary shadow-lg scale-105",
                            )}
                            onClick={() =>
                              setSelectedComponent(selectedComponent === component.id ? null : component.id)
                            }
                          >
                            <CardContent className="p-4 text-center">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <h4 className="font-semibold text-sm mb-1">{component.name}</h4>
                              <p className="text-xs text-muted-foreground">{component.description}</p>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {selectedComponent ? (
                  (() => {
                    const component = architectureComponents.find((c) => c.id === selectedComponent)
                    if (!component) return null

                    const Icon = component.icon
                    return (
                      <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Icon className="w-5 h-5 text-primary" />
                            {component.name}
                          </CardTitle>
                          <CardDescription>{component.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h5 className="font-semibold mb-2">Technologies</h5>
                            <div className="flex flex-wrap gap-1">
                              {component.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2">Performance</h5>
                            <div className="space-y-2">
                              {Object.entries(component.metrics).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-sm">
                                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                                  <span className="font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })()
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Cpu className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">Click on a component to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Data Flow Pipeline
                </CardTitle>
                <CardDescription>Real-time processing workflow visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Animated Data Flow */}
                  <div className="flex items-center justify-between">
                    {dataFlowSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                            index <= dataFlowAnimation
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                            index === dataFlowAnimation && "animate-pulse",
                          )}
                        >
                          {index <= dataFlowAnimation ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Clock className="w-6 h-6" />
                          )}
                        </div>
                        {index < dataFlowSteps.length - 1 && (
                          <div
                            className={cn(
                              "w-16 h-1 mx-2 transition-all duration-500",
                              index < dataFlowAnimation ? "bg-primary" : "bg-muted",
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {dataFlowSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={cn(
                          "text-center p-3 rounded-lg transition-all duration-300",
                          index <= dataFlowAnimation ? "bg-primary/10 border border-primary/20" : "bg-muted/50",
                        )}
                      >
                        <div className="text-sm font-medium">{step.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {index <= dataFlowAnimation ? "Complete" : "Pending"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>Real-time system performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span className={cn("text-sm font-bold", metric.color)}>{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: {metric.target}%</span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />+{(metric.value - metric.target).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Benchmark Results</CardTitle>
                  <CardDescription>Comparison with state-of-the-art methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <div className="text-2xl font-bold text-primary">99.2%</div>
                        <div className="text-xs text-muted-foreground">PRISM Accuracy</div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-muted-foreground">94.8%</div>
                        <div className="text-xs text-muted-foreground">Traditional CNN</div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-muted-foreground">91.3%</div>
                        <div className="text-xs text-muted-foreground">Classical Methods</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Processing Speed</span>
                        <Badge variant="secondary">5x Faster</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Memory Usage</span>
                        <Badge variant="secondary">40% Less</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Model Size</span>
                        <Badge variant="secondary">60% Smaller</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cloud Infrastructure</CardTitle>
                  <CardDescription>Scalable deployment architecture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">AWS</div>
                      <div className="text-sm text-muted-foreground">Primary Cloud</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">Kubernetes</div>
                      <div className="text-sm text-muted-foreground">Orchestration</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">Docker</div>
                      <div className="text-sm text-muted-foreground">Containerization</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">Terraform</div>
                      <div className="text-sm text-muted-foreground">Infrastructure</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monitoring & Observability</CardTitle>
                  <CardDescription>Real-time system monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">System Uptime</span>
                      <span className="text-sm font-bold text-secondary">99.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Response Time</span>
                      <span className="text-sm font-bold text-primary">&lt; 100 milliseconds</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Error Rate</span>
                      <span className="text-sm font-bold text-accent">&lt; 0.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Throughput</span>
                      <span className="text-sm font-bold text-chart-1">1000 req/s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
