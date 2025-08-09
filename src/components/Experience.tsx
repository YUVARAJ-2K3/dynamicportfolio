import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Technical Support Engineer",
      company: "Vectra Technosoft Pvt Ltd",
      location: "Remote",
      period: "Jan 2025 - Feb 2025",
      type: "Internship",
      color: "cosmic",
      description: "Provided technical support for complex software systems, troubleshot issues, and collaborated with development teams to improve product reliability.",
      achievements: [
        "Resolved 95% of technical issues within SLA",
        "Improved system documentation and knowledge base",
        "Collaborated with cross-functional teams"
      ]
    },
    {
      title: "UI/UX Intern",
      company: "Internpe",
      location: "Remote",
      period: "Jan 2025 - Feb 2025",
      type: "Internship",
      color: "stellar",
      description: "Designed user interfaces and improved user experience for web applications, focusing on modern design principles and user-centered design.",
      achievements: [
        "Created wireframes and prototypes for 3 major features",
        "Conducted user research and usability testing",
        "Improved application accessibility standards"
      ]
    },
    {
      title: "Linux System Administrator",
      company: "Vectra Technosoft Pvt Ltd",
      location: "Remote",
      period: "April 2024 - May 2024",
      type: "Internship",
      color: "nebula",
      description: "Managed Linux servers, automated system tasks, and implemented monitoring solutions for enterprise infrastructure.",
      achievements: [
        "Automated deployment processes reducing manual effort by 60%",
        "Implemented monitoring solutions using Prometheus and Grafana",
        "Maintained 99.9% server uptime"
      ]
    },
    {
      title: "Internship Trainee",
      company: "Breaks India Limited",
      location: "Chennai",
      period: "Jun 2022 - Dec 2022",
      type: "Internship",
      color: "galaxy",
      description: "Gained hands-on experience in automotive manufacturing processes and quality control systems.",
      achievements: [
        "Learned manufacturing processes and quality standards",
        "Participated in process improvement initiatives",
        "Developed understanding of industrial automation"
      ]
    },
    {
      title: "Internship Trainee",
      company: "Wheels India Limited",
      location: "Chennai",
      period: "May 2021 - Jan 2022",
      type: "Internship",
      color: "space-orange",
      description: "Participated in automotive wheel manufacturing operations and learned about industrial engineering practices.",
      achievements: [
        "Understood manufacturing workflow and quality processes",
        "Gained exposure to industrial safety protocols",
        "Collaborated with engineering teams"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Professional <span className="text-cosmic">Experience</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 gradient-cosmic mx-auto mb-8"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My internship experiences and professional journey in technology and engineering
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-cosmic/30 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-4 md:left-1/2 w-4 h-4 bg-${exp.color} rounded-full border-4 border-background transform md:-translate-x-1/2 z-10`} />

                <div className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                } ml-12 md:ml-0`}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Card className="bg-card/50 backdrop-blur-sm stellar-border hover:cosmic-border transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <Badge 
                            variant="secondary" 
                            className={`bg-${exp.color}/10 text-${exp.color} border-${exp.color}/20`}
                          >
                            {exp.type}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </div>
                        </div>

                        <h3 className={`text-xl font-semibold text-${exp.color} mb-2`}>
                          {exp.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 mb-4 text-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {exp.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, achIndex) => (
                              <motion.li
                                key={achIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + achIndex * 0.05, duration: 0.4 }}
                                viewport={{ once: true }}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <div className={`w-1.5 h-1.5 bg-${exp.color} rounded-full mt-2 flex-shrink-0`} />
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-card/30 backdrop-blur-sm cosmic-border">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-cosmic mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Internships</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stellar mb-2">2+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-nebula mb-2">4+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-galaxy mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Technologies Mastered</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;