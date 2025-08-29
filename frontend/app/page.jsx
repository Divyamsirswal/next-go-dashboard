'use client';

import { useState, useEffect, useMemo } from 'react';
import { getNotes } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import NoteForm from '../components/NoteForm';
import NotesTable from '../components/NotesTable';
import NotesChart from '../components/NotesChart';
import StatCard from '../components/StatCard';
import CommandMenu from '../components/CommandMenu';
import SkeletonCard from '../components/SkeletonCard';
import { LayoutDashboard, Hash, BookCopy, BarChart4, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const Card = ({ children, className = '' }) => (
  <motion.div
    className={`bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-lg transition-all duration-300 hover:border-slate-700 hover:shadow-2xl ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ icon, title, description }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3">
      {icon}
      <h2 className="text-2xl font-semibold tracking-tight text-slate-100">{title}</h2>
    </div>
    {description && <p className="mt-1 text-slate-400">{description}</p>}
  </div>
);


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    setTimeout(async () => {
      try {
        const response = await getNotes();
        setNotes(response.data || []);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        toast.error("Failed to fetch notes:");
      } finally {
        setIsLoading(false);
      }
    }, 1200);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteCreated = () => fetchNotes();

  const stats = useMemo(() => {
    const totalNotes = notes.length;
    const categoryCounts = notes.reduce((acc, { category }) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    const mostCommonCategory = totalNotes > 0
      ? Object.keys(categoryCounts).reduce((a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b), 'N/A')
      : 'N/A';
    return { totalNotes, mostCommonCategory, categoryCounts };
  }, [notes]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      <CommandMenu notes={notes} />
      <main className="min-h-screen bg-slate-950 text-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
        </div>
        <div className="absolute top-0 left-0 h-96 w-96 animate-pulse-slow bg-purple-500/30 rounded-full blur-3xl filter"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse-slow-delay bg-teal-500/30 rounded-full blur-3xl filter"></div>

        <div className="relative z-10 mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

          <header className="mb-12 border-b border-slate-800/80 pb-6 flex flex-wrap items-center justify-between gap-y-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-teal-400 to-sky-500 p-2 rounded-lg">
                  <LayoutDashboard className="text-slate-900" size={24} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Notes Dashboard
                </h1>
              </div>
              <p className="mt-3 text-slate-400">An elegant, professional dashboard for your notes.</p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-slate-400 bg-slate-900/50 border border-slate-700/80 rounded-lg px-3 py-1.5 shadow-sm">
                Press <kbd className="font-sans font-semibold rounded-md bg-slate-700 px-1.5 py-0.5 text-slate-200">⌘K</kbd> to open command menu
              </p>
            </div>
          </header>

          {/* Stats Section */}
          <section className="mb-12">
            <SectionHeader
              icon={<BarChart4 className="text-sky-400" />}
              title="Overview"
              description="A quick summary of your notes activity."
            />
            <AnimatePresence>
              {isLoading ? (
                <motion.div key="loader" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
                </motion.div>
              ) : (
                <motion.div
                  key="stats"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <StatCard icon={<Hash size={24} className="text-teal-400" />} title="Total Notes" value={stats.totalNotes} />
                  <StatCard icon={<BarChart4 size={24} className="text-sky-400" />} title="Categories" value={Object.keys(stats.categoryCounts || {}).length} />
                  <StatCard icon={<BookCopy size={24} className="text-fuchsia-400" />} title="Most Common" value={stats.mostCommonCategory} />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section>
            <SectionHeader
              icon={<PlusCircle className="text-fuchsia-400" />}
              title="Manage Notes"
              description="Add new notes, view analytics, and browse your collection."
            />
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="lg:col-span-1 flex flex-col gap-8">
                <Card><NoteForm onNoteCreated={handleNoteCreated} /></Card>
                <Card><NotesChart notes={notes} isLoading={isLoading} /></Card>
              </div>
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <NotesTable notes={notes} isLoading={isLoading} />
                </Card>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </>
  );
}