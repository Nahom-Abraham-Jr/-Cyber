"use client";

import { useAppStore, Language } from '@/store/appStore';
import { useCallback, useState, useEffect } from 'react';

type TranslationDictionary = {
  [key in Language]: {
    [key: string]: string;
  }
};

const translations: TranslationDictionary = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.scanner': 'Link Scanner',
    'nav.learning': 'Learning Hub',
    'nav.breach': 'Breach Simulator',
    'layout.system_secure': 'System Secure',
    
    'dash.title': 'Command Center',
    'dash.subtitle': 'Welcome back, Operative. System security is currently optimal. Choose a module to begin.',
    'dash.scanner.title': 'Neural Link Scanner',
    'dash.scanner.desc': 'Real-time threat intelligence for suspicious URLs and domains.',
    'dash.learning.title': 'Awareness Hub',
    'dash.learning.desc': 'Upgrade your defensive knowledge with interactive scenarios.',
    'dash.breach.title': 'Breach Simulator',
    'dash.breach.desc': 'Query the dark web to see if your identity has been compromised.',
    'dash.grid_online': 'Global Defense Grid Online',
    
    'scanner.title': 'URL Scanner',
    'scanner.desc': 'Analyze suspicious links, domains, and IPs to detect malware and other breaches.',
    'scanner.placeholder': 'Search or scan a URL, IP address, domain...',
    'scanner.invalid': 'Please enter a valid URL or domain format.',
    'scanner.trusted': 'Trusted By Enterprise Security Teams',
    'scanner.report.safe': 'No security vendors flagged this URL as malicious',
    'scanner.report.malicious': 'security vendors flagged this URL as malicious',
    'scanner.report.last_analysis': 'Last Analysis: Just now',
    'scanner.report.analysis_title': 'Security Vendor Analysis',
    'scanner.report.phishing': 'Phishing',
    'scanner.report.clean': 'Clean',
    
    'learning.title': 'Neural Training Modules',
    'learning.desc': 'Upgrade your wetware. Master core cybersecurity concepts to defend against modern threats.',
    'learning.pro_tip': 'Pro Tip',
    'learning.knowledge_check': 'Knowledge Check',
    'learning.correct': 'Correct!',
    'learning.incorrect': 'Incorrect.',
    
    'breach.title': 'Identity Breach Scanner',
    'breach.desc': 'Query our dark web intelligence database to see if your credentials have been exposed in known data breaches.',
    'breach.placeholder': 'Enter your email address',
    'breach.button.search': 'Search',
    'breach.button.querying': 'Querying...',
    'breach.note': 'Note: Try an email with "leak" or "breached" (e.g., test@leaked.com) to simulate a positive hit.',
    'breach.detected.title': 'Breach Detected',
    'breach.detected.desc': 'The email {email} was found in our database of exposed credentials.',
    'breach.detected.sources': 'Compromised Data Sources (1)',
    'breach.clear.title': 'Clear Record',
    'breach.clear.desc': 'Good news — {email} was not found in any known public breaches in our database.'
  },
  es: {
    'nav.dashboard': 'Panel de Control',
    'nav.scanner': 'Escáner de Enlaces',
    'nav.learning': 'Centro de Aprendizaje',
    'nav.breach': 'Simulador de Brechas',
    'layout.system_secure': 'Sistema Seguro',
    
    'dash.title': 'Centro de Mando',
    'dash.subtitle': 'Bienvenido de nuevo, Agente. La seguridad es óptima. Elija un módulo para comenzar.',
    'dash.scanner.title': 'Escáner Neuronal',
    'dash.scanner.desc': 'Inteligencia de amenazas en tiempo real para URLs y dominios.',
    'dash.learning.title': 'Centro de Aprendizaje',
    'dash.learning.desc': 'Mejore sus conocimientos con escenarios interactivos.',
    'dash.breach.title': 'Simulador de Brechas',
    'dash.breach.desc': 'Consulte la dark web para ver si su identidad ha sido comprometida.',
    'dash.grid_online': 'Red de Defensa Global En Línea',
    
    'scanner.title': 'Escáner de URLs',
    'scanner.desc': 'Analice enlaces sospechosos, dominios e IPs.',
    'scanner.placeholder': 'Busque o escanee una URL, dirección IP, dominio...',
    'scanner.invalid': 'Ingrese un formato de URL válido.',
    'scanner.trusted': 'Confiado por Equipos de Seguridad',
    'scanner.report.safe': 'Ningún proveedor marcó esta URL como maliciosa',
    'scanner.report.malicious': 'proveedores marcaron esta URL como maliciosa',
    'scanner.report.last_analysis': 'Último Análisis: Justo ahora',
    'scanner.report.analysis_title': 'Análisis de Proveedores',
    'scanner.report.phishing': 'Phishing',
    'scanner.report.clean': 'Limpio',
    
    'learning.title': 'Módulos de Entrenamiento',
    'learning.desc': 'Domine los conceptos para defenderse de amenazas modernas.',
    'learning.pro_tip': 'Consejo Pro',
    'learning.knowledge_check': 'Comprobación de Conocimientos',
    'learning.correct': '¡Correcto!',
    'learning.incorrect': 'Incorrecto.',
    
    'breach.title': 'Escáner de Brechas',
    'breach.desc': 'Consulte nuestra base de datos para ver si sus credenciales han sido expuestas.',
    'breach.placeholder': 'Ingrese su correo electrónico',
    'breach.button.search': 'Buscar',
    'breach.button.querying': 'Consultando...',
    'breach.note': 'Nota: Pruebe con un correo que contenga "leak" o "breached".',
    'breach.detected.title': 'Brecha Detectada',
    'breach.detected.desc': 'El correo {email} fue encontrado en nuestra base de datos.',
    'breach.detected.sources': 'Fuentes Comprometidas (1)',
    'breach.clear.title': 'Historial Limpio',
    'breach.clear.desc': 'Buenas noticias — {email} no se encontró en ninguna brecha pública.'
  },
  am: {
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.scanner': 'ሊንክ ስካነር',
    'nav.learning': 'መማሪያ ማዕከል',
    'nav.breach': 'የጥሰት አስመሳይ',
    'layout.system_secure': 'ስርዓቱ ደህንነቱ የተጠበቀ ነው',
    
    'dash.title': 'ዋና ማዘዣ ማዕከል',
    'dash.subtitle': 'እንኳን በደህና መጡ! የስርዓቱ ደህንነት በጥሩ ሁኔታ ላይ ነው። ለመጀመር ሞጁል ይምረጡ።',
    'dash.scanner.title': 'የሊንክ ስካነር',
    'dash.scanner.desc': 'ለአጠራጣሪ ሊንኮች እና ዶሜኖች የእውነተኛ ጊዜ ዛቻ ትንታኔ።',
    'dash.learning.title': 'የግንዛቤ ማዕከል',
    'dash.learning.desc': 'በይነተገናኝ ሁኔታዎች የመከላከያ እውቀትዎን ያሳድጉ።',
    'dash.breach.title': 'የጥሰት አስመሳይ',
    'dash.breach.desc': 'ማንነትዎ መጣሱን ለማረጋገጥ ዳርክ ዌብን ይፈልጉ።',
    'dash.grid_online': 'አለምአቀፍ የመከላከያ አውታር በመስመር ላይ ነው',
    
    'scanner.title': 'የዩአርኤል (URL) ስካነር',
    'scanner.desc': 'ማልዌርን ለመለየት አጠራጣሪ ሊንኮችን፣ ዶሜኖችን እና አይፒዎችን ይመረምሩ።',
    'scanner.placeholder': 'ዩአርኤል፣ አይፒ አድራሻ ወይም ዶሜን ይፈልጉ...',
    'scanner.invalid': 'እባክዎ ትክክለኛ የዩአርኤል ቅርጸት ያስገቡ።',
    'scanner.trusted': 'በድርጅታዊ የደህንነት ቡድኖች የታመነ',
    'scanner.report.safe': 'ምንም የደህንነት አቅራቢ ይህን ዩአርኤል እንደ አደገኛ አላመለከተም።',
    'scanner.report.malicious': 'የደህንነት አቅራቢዎች ይህን ዩአርኤል እንደ አደገኛ አመልክተውታል።',
    'scanner.report.last_analysis': 'የመጨረሻ ትንታኔ፡ አሁን',
    'scanner.report.analysis_title': 'የደህንነት አቅራቢ ትንታኔ',
    'scanner.report.phishing': 'ፊሺንግ (Phishing)',
    'scanner.report.clean': 'ንፁህ (Clean)',
    
    'learning.title': 'የስልጠና ሞጁሎች',
    'learning.desc': 'ከዘመናዊ የሳይበር ዛቻዎች ለመከላከል ዋና ጽንሰ-ሀሳቦችን ይማሩ።',
    'learning.pro_tip': 'ጠቃሚ ምክር',
    'learning.knowledge_check': 'የእውቀት ማረጋገጫ',
    'learning.correct': 'ትክክል!',
    'learning.incorrect': 'ስህተት።',
    
    'breach.title': 'የማንነት መረጃ ጥሰት ስካነር',
    'breach.desc': 'የይለፍ ቃልዎ በተጋለጡ የውሂብ ጥሰቶች ውስጥ መኖሩን ለመፈተሽ ይፈልጉ።',
    'breach.placeholder': 'የኢሜይል አድራሻዎን ያስገቡ',
    'breach.button.search': 'ፈልግ',
    'breach.button.querying': 'በመፈለግ ላይ...',
    'breach.note': 'ማሳሰቢያ፡ ለሙከራ "leak" ወይም "breached" የያዘ ኢሜይል ይሞክሩ።',
    'breach.detected.title': 'የመረጃ ጥሰት ተገኝቷል',
    'breach.detected.desc': 'ኢሜይል {email} በተጋለጡ መረጃዎች ቋት ውስጥ ተገኝቷል።',
    'breach.detected.sources': 'የተጠቁ የመረጃ ምንጮች (1)',
    'breach.clear.title': 'ንፁህ ታሪክ',
    'breach.clear.desc': 'መልካም ዜና — {email} በማንኛውም የታወቀ የህዝብ የመረጃ ጥሰት ውስጥ አልተገኘም።'
  },
  om: {
    'nav.dashboard': 'Daashboordii',
    'nav.scanner': 'Sikaanarii Liinkii',
    'nav.learning': 'Wiirtuu Barumsaa',
    'nav.breach': 'Fakkeessaa Cabsiinsaa',
    'layout.system_secure': 'Sirni Eegamaa Dha',
    
    'dash.title': 'Wiirtuu Ajajaa',
    'dash.subtitle': 'Baga deebitan! Nageenyi sirnichaa gaariidha. Jalqabuuf filadhu.',
    'dash.scanner.title': 'Sikaanarii Liinkii',
    'dash.scanner.desc': 'Odeeffannoo sodaa yeroo ammaa liinkiiwwanii fi domeenota shakkisiisoo ta\'aniif.',
    'dash.learning.title': 'Wiirtuu Barumsaa',
    'dash.learning.desc': 'Beekumsa ittisaa keessan haala wal-qunnamtii qabuun guddisaa.',
    'dash.breach.title': 'Fakkeessaa Cabsiinsaa',
    'dash.breach.desc': 'Eenyummaan keessan yoo cabsame arguuf dark web sakatta\'aa.',
    'dash.grid_online': 'Giddu-galli Ittisa Addunyaa Toora Irra Jira',
    
    'scanner.title': 'Sikaanarii URL',
    'scanner.desc': 'Malware argachuuf liinkiiwwan, domeenota, fi IP shakkisiisoo xiinxali.',
    'scanner.placeholder': 'URL, teessoo IP ykn domeenii barbaadi ykn sikaanii godhi...',
    'scanner.invalid': 'Maaloo bifa URL sirrii ta\'e galchi.',
    'scanner.trusted': 'Gareewwan Nageenyaa Dhaabbataatiin Kan Amaname',
    'scanner.report.safe': 'Dhiyeessaan nageenyaa tokkollee URL kana akka miidhaa geessisuutti hin mallatteessine',
    'scanner.report.malicious': 'dhiyeessitoonni nageenyaa URL kana akka miidhaa geessisuutti mallatteessaniiru',
    'scanner.report.last_analysis': 'Xiinxala Dhumaa: Amma',
    'scanner.report.analysis_title': 'Xiinxala Dhiyeessaa Nageenyaa',
    'scanner.report.phishing': 'Hanna (Phishing)',
    'scanner.report.clean': 'Qulqulluu (Clean)',
    
    'learning.title': 'Mojoolee Leenjii',
    'learning.desc': 'Sodaa ammayyaa ofirraa ittisuuf yaad-rimeewwan ijoo saayibarii baradhu.',
    'learning.pro_tip': 'Gorsa Ogeessaa',
    'learning.knowledge_check': 'Mirkaneessa Beekumsaa',
    'learning.correct': 'Sirrii!',
    'learning.incorrect': 'Dogoggora.',
    
    'breach.title': 'Sikaanarii Cabsiinsa Eenyummaa',
    'breach.desc': 'Ragaaleen keessan cabsiinsa beekamaa keessatti yoo saaxilaman arguuf sakatta\'aa.',
    'breach.placeholder': 'Teessoo i-meelii keessan galchaa',
    'breach.button.search': 'Barbaadi',
    'breach.button.querying': 'Barbaadaa jira...',
    'breach.note': 'Hubadhu: I-meelii "leak" ykn "breached" qabu yaali.',
    'breach.detected.title': 'Cabsiinsi Argameera',
    'breach.detected.desc': 'I-meeliin {email} kuusaa ragaa keenya saaxilaman keessatti argameera.',
    'breach.detected.sources': 'Madda Ragaa Cabsaman (1)',
    'breach.clear.title': 'Galmee Qulqulluu',
    'breach.clear.desc': 'Oduu gaarii — {email} cabsiinsa ragaa uummataa beekamaa kamiyyuu keessatti hin argamne.'
  }
};

export function useTranslation() {
  const { language } = useAppStore();
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const t = useCallback((key: string, variables?: Record<string, string>) => {
    const currentLang = isMounted ? language : 'en';
    
    let text = translations[currentLang][key] || key;
    
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    
    return text;
  }, [language, isMounted]);

  return { t, language, isMounted };
}
