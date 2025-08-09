import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Server, Palette, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Server,
      title: "DevOps & Cloud",
      description: "Skilled in containerization, CI/CD pipelines, Monitoring and Logging, AWS cloud infrastructure management"
    },
    {
      icon: Code,
      title: "Programming",
      description: "Skilled in Python with Data Structures and Algorithms"
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Expertise in modern web technologies including React, Node.js, and cloud platforms"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating intuitive and engaging user experiences with attention to design details"
    }
    
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold mb-6"
            >
              About <span className="text-cosmic">Me</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="h-1 gradient-cosmic mx-auto mb-8"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm cosmic-border">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I'm a passionate <span className="text-cosmic font-semibold">DevOpster, Programmer and Front-end Developer</span> based in Chennai, 
                  currently pursuing my Bachelor's in Computer Science Engineering. With a strong foundation in both development 
                  and operations, I specialize in creating robust, scalable web applications and implementing efficient DevOps practices.
                </p>
                <br />
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My journey in technology has led me to work with cutting-edge tools like <span className="text-stellar font-semibold">Docker, 
                  Kubernetes, Jenkins</span>, and modern web frameworks. I'm particularly passionate about 
                  <span className="text-nebula font-semibold"> automation, monitoring, and building user-friendly interfaces</span> that 
                  solve real-world problems. I believe in continuous learning and staying updated with the latest technological advancements.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-card/30 backdrop-blur-sm stellar-border hover:cosmic-border transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-cosmic/10 glow-cosmic">
                        <highlight.icon className="h-6 w-6 text-cosmic" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">
                          {highlight.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {highlight.description}
                        </p>
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

export default About;