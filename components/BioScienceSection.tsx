'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Droplets, Sparkles, Flame, TestTube, Microscope, Leaf } from 'lucide-react'

export function BioScienceSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  return (
    <section id="science" className="py-32 px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="bg-slate-50 dark:bg-slate-900/50 rounded-[3.5rem] p-10 lg:p-20 relative border border-slate-200/50 dark:border-slate-800/50 shadow-sm"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[20rem] pointer-events-none select-none">
          <Microscope size={400} strokeWidth={1} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 relative z-10">
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="text-sm font-bold uppercase tracking-widest text-sky-500">Clinical Framework</span>
              <h2 className="text-[3rem] leading-[1.1] font-headline font-extrabold text-slate-900 dark:text-white tracking-tight">
                Designed for Purity. <br/>
                <span className="text-slate-400">Proven for Safety.</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-body">
                Every GLOW formula undergoes rigorous pharmaceutical-grade trials. We ensure maximum sanitation efficacy while maintaining absolute structural integrity of your surfaces and ambient air quality.
              </p>
            </motion.div>
            
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">Bio-Safety Index</span>
                  <span className="text-emerald-500 font-black text-xl">100%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0.5 left-0.5 bottom-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]" 
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">Clinical Efficiency</span>
                  <span className="text-blue-600 font-black text-xl">99.9%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '99.9%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="absolute top-0.5 left-0.5 bottom-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.6)]" 
                  />
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 lg:gap-6 relative z-10 perspective-1000">
            <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="p-8 bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center">
                <Sparkles className="text-sky-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Pure Form</h4>
                <p className="text-xs text-slate-500 leading-relaxed">No artificial fillers or bulk synthetic carriers. Only active compounds.</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="p-8 bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 translate-y-0 lg:translate-y-8 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <Leaf className="text-emerald-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Organic Scent</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Botanical essential oil infusions for persistent, natural freshness.</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="p-8 bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Droplets className="text-purple-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Pet Safe</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Zero-residue enzymatic technology safe for all active pawed companions.</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="p-8 bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 translate-y-0 lg:translate-y-8 transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <ShieldCheck className="text-red-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Zero Pathogens</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Micro-cellular neutralization of 99.99% of distinct bacterial variants.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
