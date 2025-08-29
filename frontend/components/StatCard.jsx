'use client';
import { motion } from 'framer-motion';

export default function StatCard({ icon, title, value }) {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div>
            <motion.div
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 shadow-lg"
                variants={variants}
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg">{icon}</div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">{title}</p>
                        <p className="text-2xl font-semibold text-slate-50">{value}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}