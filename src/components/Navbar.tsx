import React, { useState, useEffect } from 'react';
import { Terminal, ExternalLink, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['contact', 'skills', 'open-source', 'projects', 'about', 'hero'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      if (window.scrollY < 400) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '// home', href: '#hero', id: 'hero' },
    { label: '// about', href: '#about', id: 'about' },
    { label: '// projects', href: '#projects', id: 'projects' },
    { label: '// experiences', href: '#open-source', id: 'open-source' },
    { label: '// skills', href: '#skills', id: 'skills' },
    { label: '// contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#0E0B08]/95 backdrop-blur-md border-[#27272A] shadow-md'
          : 'bg-[#0E0B08]/80 backdrop-blur-sm border-[#27272A]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Brand / Logo Anchor */}
        <a
          href="#hero"
          className="flex items-center gap-2 font-mono text-[14px] md:text-[16px] font-bold text-white tracking-tight hover:opacity-85 transition-opacity"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] pulse-dot"></span>
          <span className="text-[#0f6bf5]">&gt;</span>
          <span>riya.dev()</span>
        </a>

        {/* Desktop Navigation Links with active highlight */}
        <nav className="hidden md:flex items-center space-x-6" id="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`font-mono text-[13px] pb-1 transition-all duration-150 border-b ${
                  isActive
                    ? 'text-white border-[#0f6bf5]'
                    : 'text-[#71717A] border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Trailing Action Cluster */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0f6bf5] text-white rounded-[2px] font-mono text-[13px] fast-trans hover:bg-blue-600 hover:ring-2 hover:ring-[#0f6bf5]/40 active:scale-[0.98] shadow-sm cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Resume.pdf</span>
          </button>

          <a
            href="https://github.com/riyaax07"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 border border-[#27272A] text-white rounded-[2px] font-mono text-[13px] fast-trans hover:bg-[#1A1A1A] hover:border-[#3F3F46] active:scale-[0.98] group"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-400 hover:text-white border border-[#27272A] rounded-[2px]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161412] border-b border-[#27272A] px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-mono text-[13px] text-neutral-300 hover:text-[#0f6bf5]"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#27272A] flex items-center justify-between">
            <a
              href="https://github.com/riyaax07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white"
            >
              <span>github.com/riyaax07</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
