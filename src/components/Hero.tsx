import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 pb-24 overflow-hidden pt-32">
      <ParticleBackground />
      {/* Background Text Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center pointer-events-none opacity-[0.03] select-none">
        <span className="font-display font-black text-[30vw] leading-none text-outline">INTELLIGENT</span>
        <span className="font-display font-black text-[30vw] leading-none">CRAFT</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-9">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,11vw,8rem)] font-display font-bold leading-[1.1] tracking-tight relative text-balance"
          >
            靖哥教你 <br /> 
            <span>做 AI 工作室</span>
          </motion.h1>
        </div>

        <div className="md:col-span-3 flex flex-col items-start md:items-end gap-12">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl font-light leading-relaxed max-w-sm text-balance md:text-right text-white/70"
          >
            重塑数字体验。通过有温度的设计与硬核AI技术，为未来数字世界构建无限可能。
          </motion.p>
          
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 1, duration: 1 }}
            className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group hover:border-brand-orange transition-colors cursor-pointer"
          >
            <ArrowDownRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-white group-hover:text-brand-orange" size={28} />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 right-8 text-[10px] uppercase tracking-[0.3em] font-mono opacity-40 flex items-center gap-4 rotate-90 origin-right translate-y-12 whitespace-nowrap"
      >
        向下滚动 探索更多
        <div className="w-12 h-px bg-white/40" />
      </motion.div>
    </section>
  );
}
