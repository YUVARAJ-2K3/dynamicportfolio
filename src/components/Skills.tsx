import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
  const skillCategories = [
    {
      category: "DevOps & Monitoring",
      color: "cosmic",
      skills: ["Ansible", "Jenkins", "Prometheus", "Grafana", "ELK Stack", "CI/CD pipeline"]
    },
    {
      category: "Languages",
      color: "stellar",
      skills: ["Python", "JavaScript", "Shell Scripting"]
    },
    {
      category: "Web Technologies",
      color: "nebula",
      skills: ["HTML", "CSS", "React JS", "Node.js", "REST APIs"]
    },
    {
      category: "Cloud & Containerization",
      color: "galaxy",
      skills: ["Docker", "Kubernetes", "Podman", "AWS"]
    },
    {
      category: "Operating Systems",
      color: "space-orange",
      skills: ["RHEL", "Linux", "Ubuntu", "Windows"]
    },
    {
      category: "UI/UX Design",
      color: "stellar",
      skills: ["Wireframing", "Prototyping", "User Research", "Figma"]
    },
    {
      category: "Tools",
      color: "cosmic",
      skills: ["Git", "VS Code", "Figma", "Docker Desktop", "Postman"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="text-cosmic">Skills</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 gradient-cosmic mx-auto mb-8"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiencies across various domains
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="h-full"
            >
              <Card className="bg-card/50 backdrop-blur-sm stellar-border hover:cosmic-border transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">
                    <h3 className={`text-xl font-semibold text-${category.color} mb-2`}>
                      {category.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.1 + skillIndex * 0.05,
                          duration: 0.3 
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className={`bg-${category.color}/10 text-${category.color} border-${category.color}/20 hover:bg-${category.color}/20 transition-colors duration-300`}
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
                 </motion.div>
      </div>
    </section>
  );
};

export default Skills;