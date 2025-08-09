import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import profileImage from '@/assets/yuvaraj-profile.jpg';
import resumeFile from '@/assets/resume-yuvaraj-s.pdf';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumeFile;
    link.download = 'Yuvaraj_S_Resume.pdf';
    link.click();
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="text-stellar text-lg font-medium">
                Hello, I'm
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="text-cosmic">Yuvaraj</span>{' '}
                <span className="text-nebula">S</span>
              </h1>
              <div className="text-2xl lg:text-3xl text-muted-foreground">
                <span className="text-galaxy">DevOpster</span> |{' '}
                <span className="text-space-orange">Front-end Developer</span> |{' '}
                <span className="text-stellar">Programmer</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Enthusiastic and detail-oriented programmer with expertise in modern web technologies, 
              DevOps practices, and cloud infrastructure. Passionate about creating innovative solutions 
              and building user-friendly experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => scrollToSection('#projects')}
                className="bg-cosmic hover:bg-cosmic/80 text-cosmic-foreground glow-cosmic text-lg px-8 py-6"
              >
                Explore My Work
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadResume}
                className="stellar-border text-stellar hover:bg-stellar hover:text-stellar-foreground glow-stellar text-lg px-8 py-6"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex space-x-6"
            >
              <a
                href="https://github.com/YUVARAJ-2K3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-cosmic transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/yuvaraj-s-542053256"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-stellar transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:sureshyuvaraj2003@gmail.com"
                className="text-muted-foreground hover:text-nebula transition-colors duration-300"
              >
                <Mail className="h-6 w-6" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute inset-0 rounded-full gradient-cosmic blur-lg opacity-30 scale-110"
              />
              <motion.div
                className="floating"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={profileImage}
                  alt="Yuvaraj S"
                  className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-cosmic/30 glow-cosmic"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('#about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground hover:text-cosmic transition-colors duration-300"
          >
            <ChevronDown className="h-8 w-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;