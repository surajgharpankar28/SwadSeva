import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-orange-400 to-orange-500 shadow">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand and Copyright */}
          <div className="text-white text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">SwadSeva.</span> All rights
            reserved.
          </div>

          {/* Creator and Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-white text-sm">
              Created by <span className="font-semibold">Suraj Gharpankar</span>
            </span>
            <div className="flex gap-3">
              <a
                href="https://github.com/surajgharpankar28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/surajgharpankar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com/surajgharpankar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:surajgharpankar28@gmail.com"
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
