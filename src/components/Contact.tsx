import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Custom Discord Icon Component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sureshyuvaraj2003@gmail.com",
      href: "mailto:sureshyuvaraj2003@gmail.com",
      color: "cosmic"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9841721640",
      href: "tel:+919841721640",
      color: "stellar"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai, India",
      href: "#",
      color: "nebula"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/YUVARAJ-2K3",
      color: "cosmic"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yuvaraj-s-542053256",
      color: "stellar"
    },
    {
      icon: DiscordIcon,
      label: "Discord",
      href: "https://discordapp.com/users/pandakutty/",
      color: "nebula"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Google Forms submission using hidden iframe method
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      
      // Replace YOUR_FORM_ID with your actual Google Form ID
      // Replace entry.XXXXX with your actual entry IDs from Google Form
      const formUrl = `https://docs.google.com/forms/d/e/1rA_aLwdV9YFgcNKR1I4YhRYPXWMEJX-LZ9AGKMzb9pw/formResponse?entry.1270603981=${encodeURIComponent(formData.name)}&entry.486891414=${encodeURIComponent(formData.email)}&entry.1702491319=${encodeURIComponent(formData.subject)}&entry.1000697639=${encodeURIComponent(formData.message)}&submit=Submit`;
      
      iframe.src = formUrl;
      document.body.appendChild(iframe);

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Remove iframe after submission
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="text-cosmic">Touch</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 gradient-cosmic mx-auto mb-8"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your next project or collaboration opportunity. I'm always excited to work on innovative solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm cosmic-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-stellar mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-input/50 border-border focus:border-cosmic transition-colors duration-300"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-input/50 border-border focus:border-cosmic transition-colors duration-300"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-input/50 border-border focus:border-cosmic transition-colors duration-300"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-input/50 border-border focus:border-cosmic transition-colors duration-300 min-h-32"
                      placeholder="Tell me about your project or idea..."
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-cosmic hover:bg-cosmic/80 text-cosmic-foreground glow-cosmic"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-card/30 backdrop-blur-sm stellar-border hover:cosmic-border transition-all duration-300">
                    <CardContent className="p-6">
                      <a
                        href={info.href}
                        className="flex items-center space-x-4 group"
                        target={info.href.startsWith('http') ? '_blank' : '_self'}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      >
                        <div className={`p-3 rounded-lg bg-${info.color}/10 group-hover:bg-${info.color}/20 transition-colors duration-300`}>
                          <info.icon className={`h-6 w-6 text-${info.color}`} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground group-hover:text-cosmic transition-colors duration-300">
                            {info.label}
                          </h4>
                          <p className="text-muted-foreground">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/30 backdrop-blur-sm cosmic-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-stellar mb-4">
                    Connect with me
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                        className={`p-3 rounded-lg bg-${social.color}/10 hover:bg-${social.color}/20 transition-all duration-300 group`}
                      >
                        <social.icon className={`h-6 w-6 text-${social.color} group-hover:text-${social.color}/80`} />
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/30 backdrop-blur-sm stellar-border">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-nebula mb-2">
                    Ready to collaborate?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    I'm always open to discussing new opportunities and innovative projects.
                  </p>
                  <Button
                    variant="outline"
                    className="stellar-border text-stellar hover:bg-stellar hover:text-stellar-foreground"
                    onClick={() => window.open('mailto:sureshyuvaraj2003@gmail.com', '_blank')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Me Directly
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;