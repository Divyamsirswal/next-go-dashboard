export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-6 h-6 border-2 border-slate-500 border-t-indigo-400 rounded-full animate-spin"></div>
        </div>
    );
}
