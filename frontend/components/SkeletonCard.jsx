const SkeletonCard = ({ className = '' }) => {
    return (
        <div className={`p-4 bg-slate-900 border border-slate-800 rounded-xl ${className}`}>
            <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="h-8 bg-slate-800 rounded col-span-1"></div>
                    <div className="h-8 bg-slate-800 rounded col-span-2"></div>
                </div>
                <div className="h-12 bg-slate-800 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;