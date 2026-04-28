import { Clapperboard, Globe, MonitorPlay } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F1626] text-slate-400 py-13 px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-2 md:gap-0 md:justify-between text-sm">
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 ">
        <Clapperboard className="w-5 h-5 text-[#64748B] text-sm" />
        <span>&copy; 2024 MovieExplorer. All rights reserved.</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-6 ">
        <a href="#privacy" className="hover:text-slate-200 transition-colors">
          Privacy Policy
        </a>
        <a href="#terms" className="hover:text-slate-200 transition-colors">
          Terms of Service
        </a>
        <a href="#support" className="hover:text-slate-200 transition-colors">
          Contact Support
        </a>
      </div>

      <div className="flex items-center gap-3">
        <p className='text-slate-400'>
          Powered by TMDb
        </p>
        <button 
          className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors text-slate-300"
          aria-label="Website"
        >
          <Globe className="w-4 h-4" />
        </button>
        <button 
          className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors text-slate-300"
          aria-label="Media Player"
        >
          <MonitorPlay className="w-4 h-4" />
        </button>
      </div>

    </footer>
  );
};

export default Footer;