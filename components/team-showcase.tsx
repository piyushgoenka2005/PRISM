"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Award, BookOpen, Code, Satellite } from "lucide-react"
import { cn } from "@/lib/utils"

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Lead AI Researcher",
    specialization: "Deep Learning & Computer Vision",
    image: "/professional-woman-scientist-ai-researcher.jpg",
    bio: "PhD in Computer Vision from MIT. 8+ years experience in satellite imagery analysis and neural network architectures.",
    achievements: ["NASA Research Grant Recipient", "15+ Publications in IEEE", "Former SpaceX ML Engineer"],
    skills: ["PyTorch", "TensorFlow", "SAR Processing", "Neural Architecture Search"],
    social: {
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
      email: "sarah@mindmatrix.ai",
    },
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Geospatial Systems Engineer",
    specialization: "SAR Signal Processing",
    image: "/professional-man-engineer-geospatial-systems.jpg",
    bio: "MS in Geospatial Engineering. Expert in radar signal processing and satellite data analysis with 6 years at ESA.",
    achievements: ["ESA Young Professional", "Sentinel-1 Mission Contributor", "Remote Sensing Award 2023"],
    skills: ["GDAL", "SNAP", "Python", "C++", "Radar Processing"],
    social: {
      github: "https://github.com/mrodriguez",
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      email: "marcus@mindmatrix.ai",
    },
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Full-Stack Developer",
    specialization: "Platform Architecture",
    image: "/professional-woman-developer-software-engineer.jpg",
    bio: "BS in Computer Science. Full-stack developer specializing in scalable web applications and cloud infrastructure.",
    achievements: ["AWS Solutions Architect", "Open Source Contributor", "Hackathon Winner 2024"],
    skills: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
    social: {
      github: "https://github.com/aishapatel",
      linkedin: "https://linkedin.com/in/aishapatel",
      email: "aisha@mindmatrix.ai",
    },
  },
  {
    id: 4,
    name: "Dr. James Kim",
    role: "Data Science Lead",
    specialization: "Machine Learning Operations",
    image: "/professional-man-data-scientist-machine-learning.jpg",
    bio: "PhD in Statistics from Stanford. Specializes in MLOps, model deployment, and large-scale data processing pipelines.",
    achievements: ["Google AI Resident", "Kaggle Grandmaster", "ML Conference Speaker"],
    skills: ["MLflow", "Kubernetes", "Apache Spark", "Scikit-learn", "R"],
    social: {
      github: "https://github.com/jameskim",
      linkedin: "https://linkedin.com/in/jameskim",
      email: "james@mindmatrix.ai",
    },
  },
]

const achievements = [
  {
    icon: Award,
    title: "NASA Space Apps Challenge 2025",
    description: "Global Finalist - Earth Observation Category",
    date: "2025",
  },
  {
    icon: Satellite,
    title: "ESA Copernicus Masters",
    description: "Winner - AI Challenge Track",
    date: "2024",
  },
  {
    icon: BookOpen,
    title: "IEEE Publication",
    description: "Deep Learning for SAR Image Segmentation",
    date: "2024",
  },
  {
    icon: Code,
    title: "Open Source Release",
    description: "PRISM Framework - 2.5k GitHub Stars",
    date: "2024",
  },
]

export function TeamShowcase() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Team Mind_Matrix
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Meet the{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Innovators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            A multidisciplinary team of researchers, engineers, and developers pushing the boundaries of SAR imagery
            analysis and planetary radar imaging.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className={cn(
                "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105",
                selectedMember === member.id && "ring-2 ring-primary shadow-lg scale-105",
              )}
              onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-border group-hover:border-primary transition-colors"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Code className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs mb-4">{member.specialization}</p>
                <div className="flex justify-center space-x-2">
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Member Details */}
        {selectedMember && (
          <Card className="mb-16 border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              {(() => {
                const member = teamMembers.find((m) => m.id === selectedMember)
                if (!member) return null

                return (
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="text-center lg:text-left">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto lg:mx-0 object-cover border-4 border-primary/20 mb-4"
                      />
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-primary font-medium mb-1">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.specialization}</p>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">About</h4>
                        <p className="text-muted-foreground">{member.bio}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Key Achievements</h4>
                        <div className="grid gap-2">
                          {member.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-secondary" />
                              <span className="text-sm">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Technical Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </CardContent>
          </Card>
        )}

        {/* Team Achievements */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-8">Team Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {achievement.date}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Interested in collaborating on cutting-edge SAR imagery analysis? We're always looking for talented
                researchers and developers to join our team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-primary hover:bg-primary/90">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Team
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <Github className="w-4 h-4 mr-2" />
                  View Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
