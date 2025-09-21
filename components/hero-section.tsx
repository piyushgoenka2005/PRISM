"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Satellite, Radar, Globe } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animations"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let animationId: number
    let time = 0

    // Enhanced particle system for radar effects
    const particles: Array<{
      x: number
      y: number
      radius: number
      opacity: number
      speed: number
      angle: number
      distance: number
      color: string
    }> = []

    // Create particles with different types
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.8 + 0.2,
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 100 + 50,
        color: i % 3 === 0 ? "0, 229, 255" : i % 3 === 1 ? "16, 185, 129" : "99, 102, 241",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw radar sweep effect with enhanced visuals
      const centerX = canvas.offsetWidth * 0.7
      const centerY = canvas.offsetHeight * 0.5
      const maxRadius = 250

      // Multiple radar circles with pulsing effect
      for (let i = 1; i <= 4; i++) {
        const radius = (maxRadius / 4) * i
        const opacity = 0.08 + Math.sin(time * 0.015 + i * 0.5) * 0.04
        const pulseRadius = radius + Math.sin(time * 0.02 + i) * 5

        ctx.beginPath()
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Add glow effect
        ctx.beginPath()
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.3})`
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Enhanced radar sweep line with gradient trail
      const sweepAngle = time * 0.025
      const sweepX = centerX + Math.cos(sweepAngle) * maxRadius
      const sweepY = centerY + Math.sin(sweepAngle) * maxRadius

      // Create gradient for sweep
      const gradient = ctx.createLinearGradient(centerX, centerY, sweepX, sweepY)
      gradient.addColorStop(0, "rgba(0, 229, 255, 0.9)")
      gradient.addColorStop(0.7, "rgba(0, 229, 255, 0.4)")
      gradient.addColorStop(1, "rgba(0, 229, 255, 0)")

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(sweepX, sweepY)
      ctx.strokeStyle = gradient
      ctx.lineWidth = 3
      ctx.stroke()

      // Add sweep trail effect
      for (let i = 1; i <= 5; i++) {
        const trailAngle = sweepAngle - i * 0.1
        const trailX = centerX + Math.cos(trailAngle) * maxRadius
        const trailY = centerY + Math.sin(trailAngle) * maxRadius
        const trailOpacity = 0.3 / i

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(trailX, trailY)
        ctx.strokeStyle = `rgba(0, 229, 255, ${trailOpacity})`
        ctx.lineWidth = 2 / i
        ctx.stroke()
      }

      // Update and draw enhanced particles
      particles.forEach((particle, index) => {
        // Different movement patterns for different particle types
        if (index % 3 === 0) {
          // Floating particles
          particle.y -= particle.speed
          if (particle.y < -10) {
            particle.y = canvas.offsetHeight + 10
            particle.x = Math.random() * canvas.offsetWidth
          }
        } else if (index % 3 === 1) {
          // Orbital particles around radar center
          particle.angle += particle.speed * 0.01
          particle.x = centerX + Math.cos(particle.angle) * particle.distance
          particle.y = centerY + Math.sin(particle.angle) * particle.distance
        } else {
          // Drifting particles
          particle.x += Math.sin(time * 0.01 + index) * 0.5
          particle.y += Math.cos(time * 0.01 + index) * 0.3

          // Wrap around screen
          if (particle.x > canvas.offsetWidth) particle.x = 0
          if (particle.x < 0) particle.x = canvas.offsetWidth
          if (particle.y > canvas.offsetHeight) particle.y = 0
          if (particle.y < 0) particle.y = canvas.offsetHeight
        }

        // Draw particle with glow effect
        const glowOpacity = particle.opacity * 0.5

        // Outer glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particle.color}, ${glowOpacity})`
        ctx.fill()

        // Inner particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`
        ctx.fill()
      })

      // Add scanning grid effect
      const gridSpacing = 40
      const gridOpacity = 0.03 + Math.sin(time * 0.02) * 0.02

      ctx.strokeStyle = `rgba(0, 229, 255, ${gridOpacity})`
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let x = 0; x < canvas.offsetWidth; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.offsetHeight)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.offsetHeight; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.offsetWidth, y)
        ctx.stroke()
      }

      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 229, 255, 0.15) 0%, rgba(16, 185, 129, 0.08) 40%, transparent 70%)",
        }}
      />

      {/* Content with scroll animations */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content with staggered animations */}
          <div className="space-y-8">
            <ScrollAnimation animation="fadeInUp" delay={0}>
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Satellite className="w-3 h-3 mr-1" />
                  NASA Space Apps Challenge 2025
                </Badge>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
              <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">PRISM</span>
                <br />
                <span className="text-foreground">Planetary Radar</span>
                <br />
                <span className="text-muted-foreground text-3xl lg:text-4xl">Imaging Platform</span>
              </h1>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={400}>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl leading-relaxed">
                Revolutionary deep learning framework for detecting and monitoring rare land cover features in SAR
                satellite imagery. Powered by advanced neural networks and cutting-edge geospatial analysis.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={600}>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                  Explore Platform
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/5 bg-transparent group"
                >
                  <Radar className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Try SAR Demo
                </Button>
              </div>
            </ScrollAnimation>

            {/* Stats with staggered animation */}
            <ScrollAnimation animation="fadeInUp" delay={800}>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div className="text-center group">
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                    99.2%
                  </div>
                  <div className="text-sm text-muted-foreground">Detection Accuracy</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-secondary group-hover:scale-110 transition-transform">
                    7-Stage
                  </div>
                  <div className="text-sm text-muted-foreground">AI Pipeline</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-accent group-hover:scale-110 transition-transform">
                    Real-time
                  </div>
                  <div className="text-sm text-muted-foreground">Processing</div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right content - Enhanced 3D Earth visualization */}
          <ScrollAnimation animation="scaleIn" delay={1000}>
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
                {/* Enhanced Earth globe with multiple animation layers */}
                <div className="relative">
                  <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-primary/30 float-animation relative overflow-hidden">
                    {/* Inner rotating layers */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-600/30 to-green-600/30 rotate-slow">
                      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-700/40 to-green-700/40">
                        <Globe className="w-full h-full text-primary/60 p-16" />
                      </div>
                    </div>

                    {/* Scanning lines effect */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-pulse"></div>
                      <div
                        className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary/60 to-transparent animate-pulse"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <div
                        className="absolute top-3/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent animate-pulse"
                        style={{ animationDelay: "2s" }}
                      ></div>
                    </div>
                  </div>

                  {/* Enhanced radar pulse rings with multiple layers */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-primary/20 radar-pulse"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-80 h-80 lg:w-[400px] lg:h-[400px] rounded-full border border-secondary/20 radar-pulse"
                      style={{ animationDelay: "0.7s" }}
                    ></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-88 h-88 lg:w-[450px] lg:h-[450px] rounded-full border border-accent/15 radar-pulse"
                      style={{ animationDelay: "1.4s" }}
                    ></div>
                  </div>
                </div>

                {/* Enhanced floating data points with animations */}
                <div className="absolute top-10 right-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 hover:scale-105 transition-transform">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">SAR Signal Detected</span>
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 hover:scale-105 transition-transform">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Processing Pipeline</span>
                  </div>
                </div>

                <div className="absolute top-1/2 right-5 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 hover:scale-105 transition-transform">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Feature Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <ScrollAnimation animation="fadeInUp" delay={1200}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center hover:border-primary/60 transition-colors cursor-pointer">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  )
}
