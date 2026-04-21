import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter text-balance">
              让我们 <br /> 
              <span className="text-outline">创造</span> <br />
              惊艳之作。
            </h2>
            
            <div className="flex gap-8 items-center">
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, color: '#F27D26' }}
                  className="text-white/60"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end text-left md:text-right space-y-12">
            <div className="space-y-4 w-full">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">联系我们</span>
              <a href="mailto:jingge-ai.studio" className="block text-3xl md:text-5xl font-display font-light hover:text-brand-orange transition-colors">
                jingge-ai.studio
              </a>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <span className="font-mono text-[10px] uppercase opacity-40">办公地点</span>
              <p className="text-sm font-light">北京 & 东京 / 全球数字化协作</p>
            </div>

            <div className="w-full flex justify-between items-end pt-12">
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tighter">靖哥教你做AI</span>
                <span className="text-[10px] font-mono opacity-40 uppercase">Jingge Studio ©2026</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all group"
              >
                <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
