"use client";

import React, { useState } from 'react';
import { useTranslation } from '@/lib/translations';
import { UserX, Mail, Database, ShieldCheck, Search, Loader2, AlertTriangle } from 'lucide-react';

type BreachInfo = {
  Title: string;
  Name: string;
  Domain?: string;
  BreachDate?: string;
  Description?: string;
  DataClasses?: string[];
  IsVerified?: boolean;
  IsSensitive?: boolean;
  IsActive?: boolean;
  IsRetired?: boolean;
  IsSpamList?: boolean;
};

type ScanStatus = 'idle' | 'scanning' | 'clean' | 'compromised';

export function CompromiseSimulator() {
  const { t, isMounted } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [breachData, setBreachData] = useState<BreachInfo[]>([]);
  // Handles the email breach check: sends the entered email to our /api/breach endpoint,
  // which queries the HaveIBeenPwned service (or a fallback simulation). The response
  // updates `status` to "compromised" (showing green UI) or "clean". It also clears
  // previous results when the input changes.
  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    // remaining code unchanged ...

    if (!email.trim() || !email.includes('@')) return;

    setStatus('scanning');
    try {
      const response = await fetch(`/api/breach?email=${encodeURIComponent(email)}`);
      const json = await response.json();
      if (json.compromised) {
        setBreachData(json.breaches || []);
        setStatus('compromised');
      } else {
        setBreachData([]);
        setStatus('clean');
      }
    } catch (err) {
      console.error('Breach check failed', err);
      setBreachData([]);
      setStatus('clean');
    }
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-cyber-card border border-cyber-border rounded-xl mb-4">
          <UserX className="text-cyber-green" size={32} />
        </div>
        <h2 className="text-3xl font-bold font-mono tracking-tight text-foreground">
          {t('breach.title')}
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">{t('breach.desc')}</p>
      </div>

      <form onSubmit={handleScan} className="max-w-xl mx-auto relative group">
        <div
          className="absolute inset-0 bg-cyber-red/10 rounded-xl blur-xl group-hover:bg-cyber-red/20 transition-colors duration-500 -z-10"
        />
        <div className="flex flex-col sm:flex-row gap-4 p-2 bg-cyber-card border border-cyber-border rounded-xl shadow-2xl relative z-0">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setBreachData([]); }}
              required
              placeholder={t('breach.placeholder')}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg py-4 pl-12 pr-4 text-foreground focus:outline-none focus:border-cyber-red/50 focus:ring-1 focus:ring-cyber-red/50 transition-all placeholder:text-slate-500 font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'scanning' || !email.trim()}
            className="flex items-center justify-center gap-2 bg-cyber-border hover:bg-cyber-border-hover text-foreground px-8 py-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'scanning' ? (
              <>
                <Loader2 className="animate-spin" size={20} /> {t('breach.button.querying')}
              </>
            ) : (
              <>
                <Search size={18} /> {t('breach.button.search')}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Compromised view – now styled with cyber-green for a premium UI */}
      {status === 'compromised' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="bg-cyber-card border border-cyber-green rounded-xl p-6 glow-green text-center">
            <div className="inline-flex p-4 bg-cyber-green/20 rounded-full text-cyber-green mb-4">
              <AlertTriangle size={48} className="text-cyber-green" />
            </div>
            <h3 className="text-2xl font-bold text-cyber-green mb-2 uppercase tracking-wider">
              {t('breach.detected.title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              {t('breach.detected.desc', { email })}
            </p>
            <p className="mt-4 text-sm text-cyber-red font-medium">
              {t('breach.final_warning', { default: 'This link is insecure. Do NOT click it!' })}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {t('breach.scanner_note', { default: 'Scanners such as Kaspersky, VirusTotal, and others report this URL as malicious.' })}
            </p>
          </div>
          <div className="bg-cyber-bg border border-cyber-border rounded-xl p-6">
            <h4 className="font-mono font-bold text-foreground mb-4 flex items-center gap-2">
              <Database size={18} className="text-cyber-green" />
              {t('breach.detected.sources')}
            </h4>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
              {breachData.map((b, i) => (
                <li key={i}>{b.Title || b.Name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Clean view */}
      {status === 'clean' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-cyber-card border border-cyber-green rounded-xl p-8 glow-green text-center max-w-xl mx-auto">
          <div className="inline-flex p-4 bg-cyber-green/20 rounded-full text-cyber-green mb-4">
            <ShieldCheck size={48} />
          </div>
          <h3 className="text-2xl font-bold text-cyber-green mb-2">{t('breach.clear.title')}</h3>
          <p className="text-slate-600 dark:text-slate-300">{t('breach.clear.desc', { email })}</p>
        </div>
      )}
    </div>
  );
}
