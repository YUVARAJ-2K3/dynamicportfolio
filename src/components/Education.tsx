import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Award } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Sri Sairam Engineering College",
      location: "Chennai",
      period: "2023-2026",
      status: "Currently Pursuing",
      color: "cosmic",
      description: "Focusing on advanced computer science concepts, software engineering, and emerging technologies."
    },
    {
      degree: "Diploma in Mechanical Engineering",
      institution: "Central Polytechnic College",
      location: "Chennai", 
      period: "2019-2023",
      status: "Completed",
      color: "stellar",
      description: "Gained foundational engineering knowledge and problem-solving skills that complement my tech expertise."
    },
    {
      degree: "Secondary School Leaving Certificate",
      institution: "Srimathi Lakshmammal Memorial Matric Hr.Sec.School",
      location: "Chennai",
      period: "2018-2019",
      status: "Completed",
      color: "nebula",
      description: "Strong academic foundation with focus on mathematics and sciences."
    }
  ];

  const certifications = [
    {
      title: "Red Hat Certified System Administrator",
      issuer: "Red Hat",
      date: "11-06-2024",
      id: "240-121-111",
      color: "cosmic"
    },
    {
      title: "Red Hat Certified Engineer",
      issuer: "Red Hat",
      date: "24-10-2024",
      id: "240-102-111",
      color: "stellar"
    },
    {
      title: "Red Hat Certified Container Specialist",
      issuer: "Red Hat",
      date: "30-06-2025",
      id: "240-102-111",
      color: "nebula"
    },
    {
      title: "Full Stack Web Development",
      issuer: "Fluzen Technologies",
      date: "12-09-2024",
      id: "ZSJY0482",
      color: "galaxy"
    }
  ];

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Education & <span className="text-cosmic">Certifications</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 gradient-cosmic mx-auto mb-8"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic journey and professional certifications that shape my technical expertise
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-stellar mb-8 text-center">Educational Background</h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm stellar-border hover:cosmic-border transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex-1">
                        <h4 className={`text-xl font-semibold text-${edu.color} mb-2`}>
                          {edu.degree}
                        </h4>
                        <p className="text-lg text-foreground font-medium mb-2">
                          {edu.institution}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {edu.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {edu.period}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`bg-${edu.color}/10 text-${edu.color} border-${edu.color}/20 mt-4 md:mt-0`}
                      >
                        {edu.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {edu.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-stellar mb-8 text-center">Professional Certifications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm stellar-border hover:cosmic-border transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-${cert.color}/10`}>
                        <Award className={`h-6 w-6 text-${cert.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-semibold text-${cert.color} mb-2`}>
                          {cert.title}
                        </h4>
                        <p className="text-foreground font-medium mb-2">
                          {cert.issuer}
                        </p>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Issued: {cert.date}
                          </div>
                          <div>
                            ID: {cert.id}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;