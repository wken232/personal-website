import { motion } from 'motion/react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const menuItems = [
    { label: '作品集', href: '#work' },
    { label: '关于工作室', href: '#studio' },
    { label: '联系我们', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference"
    >
      <div className="flex flex-col">
        <span className="font-display font-bold text-xl tracking-tighter leading-none">靖哥教你做AI</span>
        <span className="text-[10px] font-mono opacity-60 tracking-widest uppercase">STUDIO ©2026</span>
      </div>

      <div className="hidden md:flex gap-12 items-center">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-sm font-medium hover:text-brand-orange transition-colors"
          >
            {item.label}
          </a>
        ))}
        <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
          <Menu size={18} />
        </button>
      </div>
    </motion.nav>
  );
}
