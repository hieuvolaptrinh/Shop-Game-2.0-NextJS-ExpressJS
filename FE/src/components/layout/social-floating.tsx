"use client";


export default function SocialFloating() {
  return (
    <>
      <style jsx global>{`
        @keyframes shake-pause {
          0% { transform: rotate(0deg); }
          5% { transform: rotate(-10deg); }
          10% { transform: rotate(10deg); }
          15% { transform: rotate(-10deg); }
          20% { transform: rotate(10deg); }
          25% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-shake-slow {
          animation: shake-pause 3s infinite ease-in-out;
          transform-origin: center;
        }
      `}</style>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* Zalo */}
        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 hover:scale-110 transition-transform duration-200 group relative animate-shake-slow"
          style={{ animationDelay: "0s" }}
        >
          <span className="sr-only">Contact via Zalo</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png"
            alt="Zalo"
            className="w-8 h-8 object-contain"
          />
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
            Chat Zalo
          </span>
        </a>

        {/* TikTok */}
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:scale-110 transition-transform duration-200 group relative border border-white/10 animate-shake-slow"
          style={{ animationDelay: "1s" }}
        >
          <span className="sr-only">Follow on TikTok</span>
          <img
            src="/images/icons/icon_tiktok.gif"
            alt="TikTok"
            className="w-full h-full object-cover rounded-full"
          />
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
            TikTok Channel
          </span>
        </a>
      </div>
    </>
  );
}
