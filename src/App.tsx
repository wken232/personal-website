/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative overflow-x-hidden selection:bg-brand-orange selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-orange z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Cursor />
      <Navbar />
      
      <main>
        <Hero />
        
        {/* About Section Short */}
        <section id="studio" className="py-32 px-6 bg-brand-gray/30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center">
            <div className="flex-1 space-y-8">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">核心哲学</span>
              <h2 className="text-4xl md:text-6xl font-light leading-tight text-white/90">
                我们相信 <span className="text-brand-orange">少</span> 不仅仅是多，它是 <span className="font-semibold text-white">智慧</span> 的纯粹体现。
              </h2>
            </div>
            <div className="flex-1">
              <p className="text-xl text-white/40 font-light leading-relaxed">
                我们的方法源于对极简主义的现代演绎，在喧嚣的数字世界中优先考虑清晰度、客观性以及对永恒意义的追求。 
                靖哥教你做AI工作室，始终站在审美进化与技术变革的最前沿。
              </p>
            </div>
          </div>
        </section>

        <Work />
      </main>

      <Footer />

      {/* Aesthetic Noises & Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[80] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}
