"use client";

import { useAppStore } from '@/store/appStore';
import { useState } from 'react';


import { useTranslation } from '@/lib/translations';
import { BookOpen, AlertTriangle, Shield, Key, X, CheckCircle2, XCircle, Wifi, Cpu, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AwarenessHub() {
  const { t, isMounted } = useTranslation();
  const { language } = useAppStore();
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!isMounted) return null;

  const MODULES = [
    {
      id: 'phishing',
      title: language === 'es' ? 'Phishing 101' : language === 'am' ? 'ፊሽንግ 101' : language === 'om' ? 'Fiişing 101' : 'Phishing 101',
      icon: AlertTriangle,
      summary: language === 'es' ? 'El phishing es un ciberataque que utiliza correos electrónicos disfrazados como un arma...' : language === 'am' ? 'ፊሽንግ የኢ-ሜል ንብረት ይጠቀሙ የሚባል ሲቆች ነው...' : language === 'om' ? 'Phishing jechuun email seera hin qabaatin fayyadamuudha...' : 'Phishing is a cyber attack that uses disguised email as a weapon. The goal is to trick the email recipient into believing that the message is something they want or need.',
      tip: language === 'es' ? 'Pase el ratón sobre los enlaces sin hacer clic para ver la URL de destino real.' : language === 'am' ? 'ሊንኮችን በመጫን ሳይደርሱ እድርሱ ቦታ ይያዙ' : language === 'om' ? 'Maqaa dabalataa irra qabaadhu siʼa kan jedhe ilaali' : 'Hover over links without clicking to see the actual destination URL.',
      question: language === 'es' ? '¿Cuál de estos es el indicador más común de un correo de phishing?' : language === 'am' ? 'የፊሽንግ ኢሜል ተለምዶ ምንድን ነው?' : language === 'om' ? 'Eenyutii ta’ kana akka armaan gadiitti mara?' : 'Which of these is the most common indicator of a phishing email?',
      options: language === 'es' ? [
        'Un archivo adjunto o enlace inesperado',
        'Un saludo genérico',
        'Un sentido de urgencia',
        'Todas las anteriores'
      ] : [
        'An unexpected attachment or link',
        'A generic greeting (e.g., "Dear Customer")',
        'A sense of urgency (e.g., "Act immediately")',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: language === 'es' ? 'Los correos de phishing suelen combinar enlaces inesperados, saludos genéricos y urgencia falsa.' : language === 'am' ? 'ፊሽንግ ኢሜል ተገቢ ሲሆን ...' : language === 'om' ? 'Marii duuba dhaabbilee warraaqsaa...' : 'Phishing emails often combine unexpected links, generic greetings, and a false sense of urgency to bypass your critical thinking.',
    },
    {
      id: 'passwords',
      title: language === 'es' ? 'Higiene de Contraseñas' : language === 'am' ? 'የይለፍ ቁጥር ንጽህና' : language === 'om' ? 'Maqaa Sirrii' : 'Password Hygiene',
      icon: Key,
      summary: language === 'es' ? 'La higiene de contraseñas se refiere a las prácticas necesarias para mantener la seguridad.' : language === 'am' ? 'የይለፍ ቁጥር ንጽህና...' : language === 'om' ? 'Saffisaa nageenya cimsuu...' : 'Password hygiene refers to the practices and procedures necessary for maintaining the security of passwords. Poor password hygiene is one of the leading causes of data breaches.',
      tip: language === 'es' ? 'Use un gestor de contraseñas para generar y almacenar contraseñas únicas.' : language === 'am' ? 'የይለፍ ቁጥር ሰብስክባል የይለፍ ሁሉንም...' : language === 'om' ? 'Fayyadami mana maree password...' : 'Use a password manager to generate and store unique, complex passwords for every account.',
      question: language === 'es' ? '¿Cuál es la forma más segura de manejar contraseñas?' : language === 'am' ? 'የምትጠቀሙ የተሻለ የይለፍ ቁጥር ዘዴ?' : language === 'om' ? 'Maqaa sirrii itti fayyadamuu?' : 'What is the most secure way to handle passwords?',
      options: language === 'es' ? [
        'Cambiar una contraseña simple cada 30 días',
        'Usar una frase de contraseña de más de 16 caracteres con un gestor',
        'Usar una variación del nombre de tu mascota',
        'Escribirlas en un cuaderno'
      ] : [
        'Change a simple password every 30 days',
        'Use a 16+ character passphrase with a password manager',
        'Use a different variation of your pet\'s name for each site',
        'Write them down in a physical notebook hidden in your desk'
      ],
      correctAnswer: 1,
      explanation: language === 'es' ? 'Las frases largas gestionadas por un gestor de contraseñas son más difíciles de descifrar.' : language === 'am' ? 'የይለፍ ቁጥር የሚወደዱ ነገር...' : language === 'om' ? 'Marii token ...' : 'Long passphrases managed by a password manager are mathematically harder to crack and easier to use than frequently changing complex passwords.',
    },
    {
      id: 'social',
      title: language === 'es' ? 'Ingeniería Social' : language === 'am' ? 'ማህበረሰብ ስለተማርክ' : language === 'om' ? 'Soshaal Ijaarsa' : 'Social Engineering',
      icon: Wifi,
      summary: language === 'es' ? 'La ingeniería social explota la confianza humana para obtener información.' : language === 'am' ? 'ማህበረሰብ ስለተማርክ የሰውን ታማኝነት ይጠቀማል።' : language === 'om' ? 'Injinarri Sosoosiin amantii namootaa fayyadamu.' : 'Social engineering exploits human trust to obtain information.',
      tip: language === 'es' ? 'Nunca revele información sensible a través de mensajes inesperados.' : language === 'am' ? 'የሚሰማዎት መልዕክቶች ተስፋ ይበለጥም።' : language === 'om' ? 'Mootummaa hin ibsine yeroon hin kennin.' : 'Never share sensitive info via unexpected messages.',
      question: language === 'es' ? '¿Cuál es una señal de ingeniería social?' : language === 'am' ? 'ማህበረሰብ ስለተማርክ ምልክት?' : language === 'om' ? 'Mallattoo Soshaal Ijaarsa maali?' : 'What is a sign of social engineering?',
      options: language === 'es' ? ['Un mensaje que parece venir de un colega', 'Una URL segura', 'Un certificado SSL válido', 'Ninguna de las anteriores'] : ['A message that appears to come from a colleague', 'A secure URL', 'A valid SSL certificate', 'None of the above'],
      correctAnswer: 0,
      explanation: language === 'es' ? 'Los atacantes a menudo se hacen pasar por contactos de confianza.' : language === 'am' ? 'ወንበር ለሚታመነው ሰው ነው።' : language === 'om' ? 'Marii keessan fayyadama.' : 'Attackers often impersonate trusted contacts.',
    },
    {
      id: 'mfa',
      title: language === 'es' ? 'Autenticación Multifactor' : language === 'am' ? 'ተደጋጋሚ ማረጋገጫ' : language === 'om' ? 'MFA' : 'Multi-Factor Authentication',
      icon: Cpu,
      summary: language === 'es' ? 'MFA añade capas extra de seguridad más allá de la contraseña.' : language === 'am' ? 'MFA ከይገበር ላይ የተጨማሪ ተሞልቶች ይሰጣል።' : language === 'om' ? 'MFA suuta deetaa dabalataa fayyadamu.' : 'MFA adds extra security layers beyond passwords.',
      tip: language === 'es' ? 'Active siempre la MFA donde sea posible.' : language === 'am' ? 'በሚችሉበት ሁሉ ሁልምድ ይተግብሩ።' : language === 'om' ? 'MFA yeroo mara fayyadami.' : 'Always enable MFA where possible.',
      question: language === 'es' ? '¿Cuál es la ventaja principal de MFA?' : language === 'am' ? 'MFA የተለየ ጥቅሞች?' : language === 'om' ? 'MFA fayyadamuun maaliif gaarii?' : 'What is the main benefit of MFA?',
      options: language === 'es' ? ['Mayor seguridad', 'Menor tiempo de acceso', 'Mayor complejidad' , 'Ninguna'] : ['Increased security', 'Faster access', 'More complexity', 'None'],
      correctAnswer: 0,
      explanation: language === 'es' ? 'MFA reduce significativamente el riesgo de acceso no autorizado.' : language === 'am' ? 'MFA የተለያዩን ደህንነት ያሻሽል።' : language === 'om' ? 'MFA weerara nidhaafi.' : 'MFA significantly reduces unauthorized access risk.',
    },
    {
      id: 'browsing',
      title: language === 'es' ? 'Navegación Segura' : language === 'am' ? 'ደህንነት የተረጋገጠ' : language === 'om' ? 'Mootummaan Gaarii' : 'Secure Browsing',
      icon: Shield,
      summary: language === 'es' ? 'Practicar navegación segura evita riesgos en línea.' : language === 'am' ? 'በዚህ የተረጋገጠ ዋጋ ይስጡት።' : language === 'om' ? 'Mootummaa nagaa fayyadamu.' : 'Practicing secure browsing avoids online risks.',
      tip: language === 'es' ? 'Verifique siempre el certificado del sitio antes de ingresar datos.' : language === 'am' ? 'የዚህ ጊዜ የጣም ተጨናውቱን ውሸት አድርጉ።' : language === 'om' ? 'Mata duree amanamaa ilaali.' : 'Always verify site certificates before entering data.',
      question: language === 'es' ? '¿Qué indica un candado verde en la barra de navegación?' : language === 'am' ? 'ተረጋግጣል?' : language === 'om' ? 'Saaphanaa cuunfaa garuu?' : 'What does a green lock in the address bar indicate?',
      options: language === 'es' ? ['Conexión segura', 'Sitio sospechoso', 'Conexión lenta', 'Ninguna de las anteriores'] : ['Secure connection', 'Suspicious site', 'Slow connection', 'None of the above'],
      correctAnswer: 0,
      explanation: language === 'es' ? 'Un candado verde indica una conexión HTTPS segura.' : language === 'am' ? 'ይህ የተረጋገጠ ነው።' : language === 'om' ? 'Maaloo, kun sirrii dha.' : 'A green lock indicates a secure HTTPS connection.',
    },
  ];

  const activeModule = MODULES.find((mod) => mod.id === activeModuleId) || null;

  const handleClose = () => {
    setActiveModuleId(null);
    setSelectedAnswer(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-mono tracking-tight flex items-center gap-2 text-foreground">
          <BookOpen className="text-cyber-purple" />
          {t('learning.title')}
        </h2>
        <p className="text-slate-500">
          {t('learning.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              onClick={() => setActiveModuleId(mod.id)}
              className="group cursor-pointer bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-cyber-purple transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 bg-cyber-bg border border-cyber-border rounded-lg flex items-center justify-center mb-4 group-hover:border-cyber-purple/50 transition-colors">
                <Icon className="text-cyber-purple group-hover:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-mono text-foreground">{mod.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{mod.summary}</p>
            </div>
          );
        })}
      </div>

      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={handleClose}
          />
          <div className="relative w-full max-w-2xl bg-cyber-bg border border-cyber-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-cyber-border bg-cyber-card/50">
              <h2 className="text-2xl font-bold font-mono flex items-center gap-3 text-foreground">
                <activeModule.icon className="text-cyber-purple" />
                {activeModule.title}
              </h2>
              <button 
                onClick={handleClose}
                className="text-slate-500 hover:text-foreground transition-colors p-2 rounded-lg hover:bg-cyber-border"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeModule.summary}
              </p>

              <div className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-4 flex gap-3">
                <AlertTriangle className="text-cyber-purple shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-cyber-purple text-sm uppercase tracking-wider mb-1 font-mono">{t('learning.pro_tip')}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{activeModule.tip}</p>
                </div>
              </div>

              <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 mt-8">
                <h3 className="text-lg font-bold mb-4 font-mono text-foreground">{t('learning.knowledge_check')}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">{activeModule.question}</p>
                
                <div className="space-y-3">
                  {activeModule.options.map((option: string, idx: number) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === activeModule.correctAnswer;
                    const showFeedback = selectedAnswer !== null;

                    let buttonClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
                    let icon = null;

                    if (!showFeedback) {
                      buttonClass += "border-cyber-border bg-cyber-bg hover:border-cyber-purple/50 text-slate-600 dark:text-slate-300 hover:text-foreground";
                    } else if (isCorrect) {
                      buttonClass += "border-cyber-green bg-cyber-green/10 text-cyber-green glow-green";
                      icon = <CheckCircle2 className="text-cyber-green shrink-0" />;
                    } else if (isSelected && !isCorrect) {
                      buttonClass += "border-cyber-red bg-cyber-red/10 text-cyber-red glow-red";
                      icon = <XCircle className="text-cyber-red shrink-0" />;
                    } else {
                      buttonClass += "border-cyber-border bg-cyber-bg/50 text-slate-400 dark:text-slate-500 opacity-50 cursor-not-allowed";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={showFeedback}
                        onClick={() => setSelectedAnswer(idx)}
                        className={buttonClass}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {icon}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className={cn(
                    "mt-6 p-4 rounded-lg border animate-in slide-in-from-top-2",
                    selectedAnswer === activeModule.correctAnswer 
                      ? "bg-cyber-green/5 border-cyber-green/30" 
                      : "bg-cyber-red/5 border-cyber-red/30"
                  )}>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className={selectedAnswer === activeModule.correctAnswer ? "text-cyber-green" : "text-cyber-red"}>
                        {selectedAnswer === activeModule.correctAnswer ? `${t('learning.correct')} ` : `${t('learning.incorrect')} `}
                      </strong>
                      {activeModule.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
