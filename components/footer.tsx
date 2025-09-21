"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ArrowUp, Satellite, Brain } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">PRISM</h3>
                <p className="text-sm text-muted-foreground">Planetary Radar Imaging for Surface Monitoring</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md">
              Revolutionary deep learning framework for SAR satellite imagery analysis, developed by Team Mind_Matrix
              for NASA Space Apps Challenge 2025.
            </p>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Satellite className="w-3 h-3 mr-1" />
                NASA Space Apps 2025
              </Badge>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                <Brain className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <div className="space-y-2">
              <a href="#explore" className="block text-muted-foreground hover:text-foreground transition-colors">
                Explore PRISM
              </a>
              <a href="#demos" className="block text-muted-foreground hover:text-foreground transition-colors">
                SAR Demo
              </a>
              <a href="#technical" className="block text-muted-foreground hover:text-foreground transition-colors">
                Technical Docs
              </a>
              <a href="#team" className="block text-muted-foreground hover:text-foreground transition-colors">
                Team
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                API Reference
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Research Papers
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                GitHub Repository
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Team Mind_Matrix. Built for NASA Space Apps Challenge.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
              <Github className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
              <Mail className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={scrollToTop} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowUp className="w-4 h-4 mr-1" />
              Top
            </Button>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-secondary/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-primary/30 rounded-full animate-bounce"></div>
      </div>
    </footer>
  )
}
