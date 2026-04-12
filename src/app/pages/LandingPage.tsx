import { Link } from "react-router";
import { QrCode, Shield, Zap, BarChart3, Menu, X, CheckCircle, Users, Ticket, Clock, Star, ArrowUp, Moon, Sun } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const features = [
    { icon: Shield, title: "Secure & Encrypted", description: "Advanced QR code encryption prevents ticket fraud and unauthorized access to your events." },
    { icon: Zap, title: "Lightning Fast", description: "Lightning-fast QR code scanning ensures smooth entry process with minimal wait times." },
    { icon: BarChart3, title: "Real-time Analytics", description: "Track attendance in real-time with comprehensive analytics and detailed reporting." },
    { icon: Users, title: "Multi-User Support", description: "Multiple admins can manage events simultaneously with role-based access control." },
    { icon: Ticket, title: "Instant Tickets", description: "Generate and distribute digital tickets instantly to attendees via email or SMS." },
    { icon: Clock, title: "24/7 Access", description: "Access your dashboard anytime, anywhere from any device with internet connection." },
  ];

  const steps = [
    { number: "01", title: "Create Event", description: "Set up your event details and capacity" },
    { number: "02", title: "Generate Tickets", description: "Create unique QR code tickets" },
    { number: "03", title: "Distribute", description: "Send tickets to attendees via email" },
    { number: "04", title: "Scan & Verify", description: "Scan QR codes at event entry" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Event Coordinator", college: "MIT", text: "This system has revolutionized how we manage our tech conferences. Entry is now 10x faster!", rating: 5 },
    { name: "Michael Chen", role: "Student Affairs Director", college: "Stanford University", text: "The analytics dashboard gives us invaluable insights into attendance patterns. Highly recommended!", rating: 5 },
    { name: "Emily Rodriguez", role: "Campus Activities Manager", college: "UC Berkeley", text: "Secure, fast, and easy to use. Our students love the digital ticketing experience.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-card/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-primary-foreground">
                  <path d="M12 2C10 6 7 8 7 12a5 5 0 0010 0c0-4-3-6-5-10z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-primary">Lucernas</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {["home", "features", "how-it-works", "testimonials"].map((id) => (
                <a key={id} href={`#${id}`} className="text-foreground hover:text-primary transition font-medium capitalize">
                  {id.replace("-", " ")}
                </a>
              ))}
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme}
                className="p-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition">
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <Link to="/login">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition">
                  Login
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme}
                className="p-2 rounded-lg bg-muted text-foreground">
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden py-4 space-y-3">
              {["home", "features", "how-it-works", "testimonials"].map((id) => (
                <a key={id} href={`#${id}`} className="block text-foreground hover:text-primary transition font-medium capitalize">
                  {id.replace("-", " ")}
                </a>
              ))}
              <Link to="/login" className="block bg-primary text-primary-foreground px-6 py-2 rounded-lg text-center font-semibold shadow-lg">
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold text-primary">✨ Next-Gen Event Management</span>
            </motion.div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Secure QR Code
              <span className="text-primary"> Ticketing System</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Fast, secure event entry management for university events. Generate QR tickets, scan entries in real-time, and monitor attendance seamlessly with our modern platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-primary/90 transition">
                  Get Started Free
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/10 transition">
                  Log In
                </motion.button>
              </Link>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12">
              <div><div className="text-3xl font-bold text-foreground">50K+</div><div className="text-sm text-muted-foreground">Events Hosted</div></div>
              <div><div className="text-3xl font-bold text-foreground">2M+</div><div className="text-sm text-muted-foreground">Tickets Issued</div></div>
              <div><div className="text-3xl font-bold text-foreground">500+</div><div className="text-sm text-muted-foreground">Universities</div></div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ opacity }} className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="University Event" className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-card py-16 lg:py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to manage university events efficiently and securely</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }}
                className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border border-border">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Get started in 4 simple steps</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full text-primary-foreground font-bold text-xl mb-6 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/40" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-primary/5 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">What Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Trusted by event organizers at leading universities</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }}
                className="bg-card/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-border/50">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                  <div className="text-sm text-primary">{t.college}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">Ready to Transform Your Events?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of universities already using Lucernas to streamline their event management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="bg-secondary text-secondary-foreground px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-secondary/90 transition">
                  Get Started Now
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-foreground/10 transition">
                  Log In
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">Lucernas</span>
              </div>
              <p className="text-background/60 text-sm">Next-generation event management platform for universities</p>
            </div>
            {[
              { title: "Product", links: ["Features", "How It Works", "Pricing"] },
              { title: "Company", links: ["About Us", "Contact", "Careers"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2 text-background/60 text-sm">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="hover:text-background transition">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/60 text-sm">
            <p>© 2026 Lucernas. All rights reserved. Made with ❤️ for universities worldwide.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition z-50">
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}