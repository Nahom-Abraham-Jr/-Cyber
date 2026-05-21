"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/translations';
import { ShieldAlert, ShieldCheck, Search, Loader2, Globe, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ScanStatus = 'idle' | 'scanning' | 'safe' | 'malicious';

const VENDORS = [
  'Google Safebrowsing', 'Kaspersky', 'BitDefender', 'Fortinet', 
  'CrowdStrike', 'Sophos', 'SentinelOne', 'Palo Alto Networks',
  'Avast', 'McAfee', 'TrendMicro', 'Symantec'
];

const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;

export function LinkChecker() {
  const { t, isMounted } = useTranslation();
  const [url, setUrl] = useState('');
  const [isValidFormat, setIsValidFormat] = useState<boolean | null>(null);
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [vendorResults, setVendorResults] = useState<{name: string, isMalicious: boolean}[]>([]);

  useEffect(() => {
    if (url.trim() === '') {
      setIsValidFormat(null);
    } else {
      setIsValidFormat(URL_REGEX.test(url.trim()));
    }
  }, [url]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidFormat) return;

    setStatus('scanning');

    let urlToScan = url.trim();
    if (!/^https?:\/\//i.test(urlToScan)) {
      urlToScan = `http://${urlToScan}`;
    }

    setTimeout(() => {
      const isMaliciousTarget = urlToScan.includes('unsafe-phishing-demo.com') || urlToScan.includes('malicious') || urlToScan.includes('phishing');
      
      const results = VENDORS.map(vendor => {
        let isMalicious = false;
        if (isMaliciousTarget) {
          isMalicious = Math.random() > 0.4;
        }
        return { name: vendor, isMalicious };
      });

      if (isMaliciousTarget && !results.some(r => r.isMalicious)) {
        results[0].isMalicious = true;
        results[1].isMalicious = true;
      }

      setVendorResults(results);
      setStatus(isMaliciousTarget ? 'malicious' : 'safe');
    }, 2000);
  };

  if (!isMounted) return null;

  const maliciousCount = vendorResults.filter(v => v.isMalicious).length;
  const totalVendors = VENDORS.length;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-cyber-card border border-cyber-border rounded-2xl mb-2">
          <Globe className="text-cyber-accent w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold font-sans tracking-tight text-foreground">
          {t('scanner.title')}
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          {t('scanner.desc')}
        </p>
      </div>

      <form onSubmit={handleScan} className="relative group max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-cyber-accent/10 rounded-2xl blur-2xl group-hover:bg-cyber-accent/20 transition-colors duration-500 -z-10" />
        <div className={cn(
          "flex flex-col sm:flex-row gap-0 bg-cyber-bg border-2 rounded-2xl shadow-2xl relative z-0 overflow-hidden transition-colors duration-300",
          isValidFormat === true ? "border-cyber-green/50" : isValidFormat === false ? "border-cyber-red/50" : "border-cyber-border focus-within:border-cyber-accent/50"
        )}>
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-6 text-slate-400" size={24} />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder={t('scanner.placeholder')}
              className="w-full bg-transparent py-6 pl-16 pr-12 text-lg text-foreground focus:outline-none placeholder:text-slate-500"
              autoComplete="off"
              spellCheck="false"
            />
            {isValidFormat === true && (
              <CheckCircle2 className="absolute right-6 text-cyber-green w-6 h-6 animate-in zoom-in" />
            )}
            {isValidFormat === false && (
              <XCircle className="absolute right-6 text-cyber-red w-6 h-6 animate-in zoom-in" />
            )}
          </div>
          <button
            type="submit"
            disabled={!isValidFormat || status === 'scanning'}
            className="flex items-center justify-center gap-2 bg-cyber-card hover:bg-cyber-card-hover border-l border-cyber-border text-foreground px-10 py-6 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-lg group-focus-within:bg-cyber-accent group-focus-within:hover:bg-blue-600 group-focus-within:border-transparent group-focus-within:text-white"
          >
            {status === 'scanning' ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <ArrowRight size={24} className="group-focus-within:translate-x-1 transition-transform" />
            )}
          </button>
        </div>
        
        {isValidFormat === false && (
          <p className="text-cyber-red text-sm mt-3 ml-4 flex items-center gap-1 animate-in fade-in">
            <ShieldAlert size={14} /> {t('scanner.invalid')}
          </p>
        )}
      </form>

      {(status === 'safe' || status === 'malicious') && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 bg-cyber-card border border-cyber-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="border-b border-cyber-border p-8 flex flex-col md:flex-row items-center gap-8 bg-cyber-bg/50">
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" className="stroke-cyber-border fill-none" strokeWidth="8" />
                <circle 
                  cx="64" 
                  cy="64" 
                  r="56" 
                  className={cn("fill-none transition-all duration-1000", status === 'safe' ? "stroke-cyber-green" : "stroke-cyber-red")} 
                  strokeWidth="8" 
                  strokeDasharray="351.86" 
                  strokeDashoffset={351.86 - (351.86 * (status === 'safe' ? totalVendors : maliciousCount)) / totalVendors} 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-bold font-mono", status === 'safe' ? "text-cyber-green" : "text-cyber-red")}>
                  {status === 'safe' ? '0' : maliciousCount}
                </span>
                <span className="text-sm text-slate-500 font-mono">/ {totalVendors}</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="text-2xl font-bold text-foreground break-all">
                {url}
              </h3>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                {status === 'safe' ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-green/10 text-cyber-green font-medium text-sm border border-cyber-green/20">
                    <ShieldCheck size={16} /> {t('scanner.report.safe')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-red/10 text-cyber-red font-medium text-sm border border-cyber-red/20">
                    <ShieldAlert size={16} /> {maliciousCount} {t('scanner.report.malicious')}
                  </span>
                )}
                <span className="text-sm text-slate-500">{t('scanner.report.last_analysis')}</span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-cyber-card">
            <h4 className="text-lg font-semibold text-foreground mb-6 border-b border-cyber-border pb-4">{t('scanner.report.analysis_title')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {vendorResults.map((vendor, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-cyber-border/50">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{vendor.name}</span>
                  {vendor.isMalicious ? (
                    <span className="text-cyber-red flex items-center gap-1.5 text-sm font-bold bg-cyber-red/10 px-2 py-0.5 rounded border border-cyber-red/20">
                      <XCircle size={14} /> {t('scanner.report.phishing')}
                    </span>
                  ) : (
                    <span className="text-cyber-green flex items-center gap-1.5 text-sm font-medium">
                      <CheckCircle2 size={14} /> {t('scanner.report.clean')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {status === 'idle' && (
        <div className="text-center pt-10">
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest mb-4">{t('scanner.trusted')}</p>
          <div className="flex justify-center gap-6 opacity-30 grayscale pointer-events-none">
             <ShieldCheck size={32} />
             <ShieldAlert size={32} />
             <Search size={32} />
          </div>
        </div>
      )}
    </div>
  );
}
