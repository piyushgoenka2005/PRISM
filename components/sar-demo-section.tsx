"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Play, Download, Zap, Brain, Target, Layers, BarChart3, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const pipelineStages = [
  { id: 1, name: "Data Ingestion", icon: Upload, description: "SAR imagery preprocessing and validation" },
  { id: 2, name: "Noise Reduction", icon: Zap, description: "Advanced filtering and speckle removal" },
  { id: 3, name: "Feature Extraction", icon: Target, description: "Multi-scale texture and geometric analysis" },
  { id: 4, name: "Deep Learning", icon: Brain, description: "Neural network classification and segmentation" },
  { id: 5, name: "Post-Processing", icon: Layers, description: "Morphological operations and refinement" },
  { id: 6, name: "Validation", icon: CheckCircle, description: "Quality assessment and confidence scoring" },
  { id: 7, name: "Output Generation", icon: BarChart3, description: "Results visualization and export" },
]

export function SarDemoSection() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [results, setResults] = useState<any>(null)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setResults(null)
      setCurrentStage(0)
      setProgress(0)
    }
  }, [])

  const startProcessing = useCallback(() => {
    if (!uploadedFile) return

    setIsProcessing(true)
    setCurrentStage(0)
    setProgress(0)

    // Simulate processing pipeline
    const processStage = (stage: number) => {
      setTimeout(() => {
        setCurrentStage(stage)
        setProgress(((stage + 1) / pipelineStages.length) * 100)

        if (stage < pipelineStages.length - 1) {
          processStage(stage + 1)
        } else {
          // Processing complete
          setTimeout(() => {
            setIsProcessing(false)
            setResults({
              accuracy: 99.2,
              detectedFeatures: 47,
              processingTime: "2.3s",
              confidence: 0.94,
              segmentationMap: "/sar-segmentation-map-with-detected-features.jpg",
            })
          }, 1000)
        }
      }, 800)
    }

    processStage(0)
  }, [uploadedFile])

  return (
    <section id="demos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Interactive Demo
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Experience PRISM's{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SAR Analysis
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Upload your SAR imagery and watch our 7-stage deep learning pipeline detect and classify rare land cover
            features in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Upload and Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  SAR Image Upload
                </CardTitle>
                <CardDescription>
                  Upload Sentinel-1 SAR imagery or use our sample datasets for demonstration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".tif,.tiff,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="sar-upload"
                  />
                  <label htmlFor="sar-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">Drop SAR imagery here</p>
                    <p className="text-sm text-muted-foreground">Supports TIFF, PNG, JPG formats up to 50MB</p>
                  </label>
                </div>

                {uploadedFile && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        <Upload className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={startProcessing}
                      disabled={isProcessing}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                          Processing
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Sample Dataset 1
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Sample Dataset 2
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Processing Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Pipeline</CardTitle>
                <CardDescription>7-stage deep learning workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />

                  <div className="space-y-3">
                    {pipelineStages.map((stage, index) => {
                      const Icon = stage.icon
                      const isActive = index === currentStage && isProcessing
                      const isCompleted = index < currentStage || (!isProcessing && results)
                      const isUpcoming = index > currentStage

                      return (
                        <div
                          key={stage.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-all",
                            isActive && "bg-primary/10 border border-primary/20",
                            isCompleted && "bg-secondary/10 border border-secondary/20",
                            isUpcoming && "bg-muted/50",
                          )}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              isActive && "bg-primary text-primary-foreground animate-pulse",
                              isCompleted && "bg-secondary text-secondary-foreground",
                              isUpcoming && "bg-muted-foreground/20 text-muted-foreground",
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className={cn("font-medium text-sm", isActive && "text-primary")}>{stage.name}</p>
                            <p className="text-xs text-muted-foreground">{stage.description}</p>
                          </div>
                          {isCompleted && <CheckCircle className="w-4 h-4 text-secondary" />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results and Visualization */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>Real-time SAR imagery analysis and feature detection</CardDescription>
              </CardHeader>
              <CardContent>
                {!results ? (
                  <div className="h-64 flex items-center justify-center text-center">
                    <div>
                      <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                        <Target className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">Upload and process SAR imagery to see results</p>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="visualization" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="visualization">Visualization</TabsTrigger>
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      <TabsTrigger value="export">Export</TabsTrigger>
                    </TabsList>

                    <TabsContent value="visualization" className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={results.segmentationMap || "/placeholder.svg"}
                          alt="SAR Segmentation Results"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{results.detectedFeatures}</div>
                          <div className="text-sm text-muted-foreground">Features Detected</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-secondary">{results.confidence * 100}%</div>
                          <div className="text-sm text-muted-foreground">Confidence Score</div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="metrics" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
                          <div className="text-2xl font-bold text-primary">{results.accuracy}%</div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Processing Time</div>
                          <div className="text-2xl font-bold text-secondary">{results.processingTime}</div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">F1 Score</div>
                          <div className="text-2xl font-bold text-accent">0.96</div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">IoU Score</div>
                          <div className="text-2xl font-bold text-chart-3">0.89</div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="export" className="space-y-4">
                      <div className="space-y-3">
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download Segmentation Map (PNG)
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Export Analysis Report (PDF)
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download Raw Data (JSON)
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
