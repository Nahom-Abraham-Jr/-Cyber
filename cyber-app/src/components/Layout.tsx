"use client";

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from '@/lib/translations';
import { Shield, Search, BookOpen, UserX, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { activeTab, setActiveTab, theme, setTheme, language, setLanguage } = useAppStore();
  const { t, isMounted } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Apply theme class to HTML element on mount and theme change
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    // Update html lang attribute based on selected language
    html.lang = language;
  }, [theme, language]);

  // Prevent hydration mismatch by returning a skeleton or nothing if not mounted
  if (!isMounted) return null;

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Shield },
    { id: 'scanner', label: t('nav.scanner'), icon: Search },
    { id: 'learning', label: t('nav.learning'), icon: BookOpen },
    { id: 'breach', label: t('nav.breach'), icon: UserX },
  ] as const;

  return (
    <div className="flex h-screen w-full bg-cyber-bg text-foreground overflow-hidden">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-cyber-card border border-cyber-border text-cyber-accent hover:bg-cyber-card-hover transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static top-0 left-0 z-40 h-full w-64 bg-cyber-card border-r border-cyber-border transition-transform duration-300 ease-in-out transform flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center gap-3 border-b border-cyber-border/50">
          <div className="p-2 bg-cyber-accent rounded-lg text-white shadow-lg shadow-cyber-accent/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-sans text-xl font-extrabold text-foreground tracking-tight">
              ደ ህ ን ነ ት
            </h1>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    : "text-slate-500 hover:bg-cyber-card-hover hover:text-foreground border border-transparent"
                )}
              >
                <Icon size={18} className={cn(isActive ? "text-cyber-accent" : "text-slate-400")} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Preferences / Toggles */}
        <div className="p-4 border-t border-cyber-border space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-accent transition-colors text-sm text-slate-500 hover:text-foreground"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => {
  const order: ('en' | 'es' | 'am' | 'om')[] = ['en', 'es', 'am', 'om'];
  const currentIndex = order.indexOf(language);
  const nextLang = order[(currentIndex + 1) % order.length];
  setLanguage(nextLang);
}}
              className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-cyber-bg border border-cyber-border hover:border-cyber-accent transition-colors text-sm text-slate-500 hover:text-foreground font-mono uppercase"
              title="Toggle Language"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-cyber-bg border border-cyber-border">
            <div className="w-2 h-2 rounded-full bg-cyber-accent shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
            <span className="text-xs text-slate-500 font-mono">{t('layout.system_secure')}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="relative z-10 lg:p-10 p-6 pt-20 lg:pt-10 max-w-6xl mx-auto min-h-full">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
