"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-foreground">PRISM</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#explore" className="text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </a>
            <a href="#demos" className="text-muted-foreground hover:text-foreground transition-colors">
              Demos
            </a>
            <a href="#technical" className="text-muted-foreground hover:text-foreground transition-colors">
              Technical
            </a>
            <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">
              Team
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Documentation
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
