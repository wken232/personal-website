import { motion } from 'motion/react';

const PROJECTS = [
  {
    id: '01',
    title: '幻影智能腕表',
    category: '产品设计 / AI赋能',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    size: 'tall'
  },
  {
    id: '02',
    title: '空间音频系统',
    category: '动效设计',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    size: 'wide'
  },
  {
    id: '03',
    title: '极简主义中心',
    category: '场景还原',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop',
    size: 'square'
  },
  {
    id: '04',
    title: '灵动视觉标识',
    category: '品牌重塑',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop',
    size: 'tall'
  },
  {
    id: '05',
    title: '数字地平线',
    category: '全链路 UX/UI',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    size: 'square'
  }
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">精选作品</span>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter">驱动未来 <br /> 设计驱动</h2>
          </div>
          <p className="max-w-sm text-white/60 font-light leading-relaxed">
            一系列探索人类心理与极简主义美学交汇点的数字艺术品与AI实践案例。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`group relative overflow-hidden bg-brand-gray ${
                project.size === 'tall' ? 'md:col-span-5 aspect-[4/5]' : 
                project.size === 'wide' ? 'md:col-span-7 aspect-[16/9]' : 
                'md:col-span-5 aspect-square'
              }`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-orange mb-2">{project.category}</span>
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-display font-medium">{project.title}</h3>
                  <span className="text-white/40 font-mono text-[10px]">{project.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
