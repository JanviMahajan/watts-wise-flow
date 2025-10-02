import { Github, Linkedin, Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-primary text-primary-foreground mt-auto border-t border-primary-foreground/10">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <Leaf className="h-7 w-7" />
              <h3 className="font-bold text-2xl">GreenOps</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Sustainable Energy Management Solutions. Monitor, optimize, and reduce your energy consumption for a greener future.
            </p>
          </div>
          
          {/* Contact Section */}
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="flex gap-4 justify-center">
              <a 
                href="https://www.linkedin.com/in/janvi-mahajan-0000j08" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/JanviMahajan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-lg mb-4">Useful Links</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>
                <a href="/" className="hover:text-primary-foreground transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="/analytics" className="hover:text-primary-foreground transition-colors">Predictions</a>
              </li>
              <li>
                <a href="/data-management" className="hover:text-primary-foreground transition-colors">Optimizations</a>
              </li>
              <li>
                <a href="/alerts" className="hover:text-primary-foreground transition-colors">Goals</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6">
          <div className="text-center text-primary-foreground/80 text-sm">
            <p className="mb-2">© 2025 GreenOps. All rights reserved.</p>
            <p>
              Created by{" "}
              <span className="font-semibold text-primary-foreground">Janvi Mahajan</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
