"use client";

import { useAppStore } from '@/store/appStore';
import { useTranslation } from '@/lib/translations';
import { Layout } from '@/components/Layout';
import { LinkChecker } from '@/components/LinkChecker';
import { AwarenessHub } from '@/components/AwarenessHub';
import { CompromiseSimulator } from '@/components/CompromiseSimulator';
import { ShieldAlert, ShieldCheck, Activity, Terminal } from 'lucide-react';

function Dashboard() {
  const { setActiveTab } = useAppStore();
  const { t, isMounted } = useTranslation();

  if (!isMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-medium font-mono tracking-tight flex items-center gap-2 text-foreground">
          <Terminal className="text-cyber-accent" />
          {t('dash.title')}
        </h2>
        {/* Changed from text-slate-500 to a responsive dark/light muted tone */}
        <p className="text-foreground/60 transition-colors">
          {t('dash.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveTab('scanner')}
          className="group cursor-pointer bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-cyber-accent transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-cyber-bg border border-cyber-border rounded-lg flex items-center justify-center mb-4 group-hover:border-cyber-accent/50 transition-colors">
            <Activity className="text-cyber-accent" />
          </div>
          <h3 className="text-xl font-bold mb-2 font-mono group-hover:text-cyber-accent transition-colors text-foreground">{t('dash.scanner.title')}</h3>
          {/* Changed text utility for clean visibility */}
          <p className="text-sm text-foreground/70">{t('dash.scanner.desc')}</p>
        </div>

        <div 
          onClick={() => setActiveTab('learning')}
          className="group cursor-pointer bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-cyber-purple transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-cyber-bg border border-cyber-border rounded-lg flex items-center justify-center mb-4 group-hover:border-cyber-purple/50 transition-colors">
            <ShieldCheck className="text-cyber-purple" />
          </div>
          <h3 className="text-xl font-bold mb-2 font-mono group-hover:text-cyber-purple transition-colors text-foreground">{t('dash.learning.title')}</h3>
          <p className="text-sm text-foreground/70">{t('dash.learning.desc')}</p>
        </div>

        <div 
          onClick={() => setActiveTab('breach')}
          className="group cursor-pointer bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-cyber-red transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyber-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-cyber-bg border border-cyber-border rounded-lg flex items-center justify-center mb-4 group-hover:border-cyber-red/50 transition-colors">
            <ShieldAlert className="text-cyber-red" />
          </div>
          <h3 className="text-xl font-bold mb-2 font-mono group-hover:text-cyber-red transition-colors text-foreground">{t('dash.breach.title')}</h3>
          <p className="text-sm text-foreground/70">{t('dash.breach.desc')}</p>
        </div>
      </div>
      
      <div className="bg-cyber-card/50 border border-cyber-border border-dashed rounded-xl p-6 flex items-center gap-4">
        <div className="w-3 h-3 rounded-full bg-cyber-green glow-green animate-pulse" />
        <span className="font-mono text-sm text-foreground/60 uppercase tracking-widest">{t('dash.grid_online')}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const { activeTab } = useAppStore();

  return (
    <Layout>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'scanner' && <LinkChecker />}
      {activeTab === 'learning' && <AwarenessHub />}
      {activeTab === 'breach' && <CompromiseSimulator />}
    </Layout>
  );
}