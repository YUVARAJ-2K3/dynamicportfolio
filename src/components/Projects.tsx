import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Fire Safety System",
      description: "Developed an Automatic fire detection and suppression model using Arduino UNO, sensors like smoke, sound and temperature. Suppressed fire using 1HP water pump.",
      technologies: ["Arduino", "IoT", "C++", "Sensors", "Hardware"],
      color: "cosmic",
      category: "IoT Project",
      projectUrl: "https://github.com/YUVARAJ-2K3/fire-safety-system" 
    },
    {
      title: "Ultrasound Nerve Segmentation using AI/ML",
      description: "Developed a deep learning model using TensorFlow framework to automatically segment nerve structures in ultrasound images, improving accuracy and consistency in medical image analysis.",
      technologies: ["TensorFlow", "Python", "Deep Learning", "Medical Imaging", "AI/ML"],
      color: "stellar",
      category: "AI/ML Project",
      projectUrl: "https://github.com/YUVARAJ-2K3/ultrasound-nerve-segmentation" 
    },
    {
      title: "Node Monitoring Visualization",
      description: "Deployed Prometheus as the primary tool for comprehensive node monitoring, combined with Grafana dashboards to deliver actionable data visualizations. Configured alerts for node usage exceeding limits via email and Slack.",
      technologies: ["Prometheus", "Grafana", "Monitoring", "DevOps", "Alerting"],
      color: "nebula",
      category: "DevOps Project",
      projectUrl: "https://github.com/YUVARAJ-2K3/node-monitoring" 
    },
    {
      title: "CI/CD Pipeline with Jenkins, Docker & AWS",
      description: "Built an automated CI/CD pipeline using GitHub, Jenkins, SonarQube, and Docker. Deployed a web application on AWS EC2 instances with real-time code integration, containerization, and static code analysis for enhanced quality, scalability, and reliability.",
      technologies: ["Jenkins", "Docker", "AWS", "SonarQube", "GitHub", "EC2"],
      color: "galaxy",
      category: "DevOps Project",
      projectUrl: "https://github.com/YUVARAJ-2K3/cicd-pipeline" 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-cosmic">Projects</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 gradient-cosmic mx-auto mb-8"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical projects spanning IoT, AI/ML, DevOps, and web development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="h-full"
            >
              <Card className="bg-card/50 backdrop-blur-sm stellar-border hover:cosmic-border transition-all duration-300 h-full group flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge 
                      variant="secondary" 
                      className={`bg-${project.color}/10 text-${project.color} border-${project.color}/20`}
                    >
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className={`text-xl text-${project.color} group-hover:text-${project.color}/80 transition-colors duration-300`}>
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <div className="flex flex-col flex-grow space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: index * 0.1 + techIndex * 0.05,
                            duration: 0.3 
                          }}
                          viewport={{ once: true }}
                        >
                          <Badge 
                            variant="outline" 
                            className="text-xs border-border/50 hover:border-cosmic/50 transition-colors duration-300"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`stellar-border text-stellar hover:bg-stellar hover:text-stellar-foreground w-full`}
                      onClick={() => window.open(project.projectUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-card/30 backdrop-blur-sm cosmic-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-stellar">
                Interested in collaborating?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                I'm always open to discussing new opportunities and innovative projects
              </p>
              <Button
                className="bg-cosmic hover:bg-cosmic/80 text-cosmic-foreground glow-cosmic"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;