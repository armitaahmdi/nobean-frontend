export default function ProgressBar({ progressPercent }) {
    return (
        <div className="w-full h-4 rounded-full bg-white/20 border border-white/30 shadow-inner overflow-hidden backdrop-blur-sm">
            <div
                className="h-full transition-all duration-500 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                style={{ width: `${progressPercent}%` }}
            />
        </div>
    );
}
