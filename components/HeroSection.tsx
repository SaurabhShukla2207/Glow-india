'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Leaf } from 'lucide-react'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 px-8 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Animated glowing orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"
      />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8 z-10"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-teal-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] rounded-full border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Biological Precision
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-[3.5rem] md:text-[4.5rem] leading-[1.05] font-headline font-extrabold tracking-tighter text-slate-900 dark:text-white">
            Premium Clinical <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">Cleaning</span> for the <br/>
            Modern Home.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-body">
            Experience an abstract clinical ecosystem where high-tech formulations meet organic safety. We redefine sanitation through luxury-wellness engineering.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-[1.02] hover:shadow-blue-500/50 active:scale-95 transition-all flex items-center justify-center gap-3 group">
              Explore Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold rounded-2xl hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 hover:scale-[1.02] active:scale-95 transition-all shadow-sm">
              Our Science
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          className="relative group perspective-1000"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-[3rem] blur-2xl group-hover:scale-105 transition-transform duration-700 pointer-events-none"></div>
          
          <div className="relative bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-700/50 rounded-[3rem] p-3 backdrop-blur-md shadow-2xl hover:rotate-1 hover:scale-[1.02] transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/10 pointer-events-none rounded-[3rem]" />
            <img 
              alt="Clinical Aesthetics" 
              className="rounded-[2.5rem] w-full h-[600px] object-cover shadow-inner" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhdvZ8dHyD-7GlFVtKXsCnsa0stH-Sb35Oh_CydpLou9NqKSKGvomQjzflxo7Z0DBO9llKwefiZoNK1mGcPE3KhpqzIXFC_Ft1fyB5PFK8kYXcj5IXZAYioAZSPfDmVdCm3f1F46amK3EPJo4bZ7_fHgLsE7L9oNDBuAKgbA71RXoODpkWU7KWkVU64xzus14ruW-57XMEnaC09nvdlk_wwCC0mrkN8iBpnjBEdGMqXk_UG6Nj4rQKbYsLGy96O3k77vH6-26h"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute bottom-8 right-8 p-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-xl shadow-teal-900/10 flex items-center gap-4 hover:scale-105 transition-transform cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md">
                 <Leaf className="w-6 h-6 fill-white drop-shadow-sm" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Purity Rating</p>
                <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">99.9% Sterile</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}