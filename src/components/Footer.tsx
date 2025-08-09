import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-cosmic bg-clip-text text-transparent mb-4">
              Yuvaraj S
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              DevOpster, Front-end Developer, and Technology Enthusiast passionate about creating 
              innovative solutions and building exceptional user experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-stellar mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Education', href: '#education' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-cosmic transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-stellar mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="mailto:sureshyuvaraj2003@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-cosmic transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                sureshyuvaraj2003@gmail.com
              </a>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://github.com/YUVARAJ-2K3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-cosmic transition-colors duration-300"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/yuvaraj-s-542053256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-stellar transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border/50 pt-8 relative"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <span>© {currentYear} Yuvaraj S. Designed And Built with</span>
            <Heart className="h-4 w-4 text-nebula" />
            <span>And Passion For Technology</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-8 p-3 rounded-full bg-cosmic/10 hover:bg-cosmic/20 text-cosmic transition-all duration-300 glow-cosmic"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cosmic/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
              }}
              animate={{
                y: -20,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;