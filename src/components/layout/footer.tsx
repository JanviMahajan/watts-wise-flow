import { Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card/50 mt-auto">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg">GreenOps</h3>
            <p className="text-sm text-muted-foreground">Sustainable Energy Management Solutions</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Created by <span className="font-medium text-foreground">Janvi Mahajan</span>
            </span>
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/in/janvi-mahajan-0000j08" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/JanviMahajan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
