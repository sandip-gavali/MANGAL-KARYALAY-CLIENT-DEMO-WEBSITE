import React from 'react'
import { Sparkles, ShieldAlert, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export const DemoNoticeBanner: React.FC = () => {
  return (
    <div className="bg-[#4A0814] text-[#FAF3E1] text-xs py-2 px-4 border-b border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center gap-1 bg-[#800020] px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider text-[#DFBF77] uppercase border border-[#C5A059]/40">
            <Sparkles className="w-3 h-3 text-[#E5C365]" />
            Client Demo Prototype
          </span>
          <span className="text-[#FAF3E1]/90 hidden md:inline">
            Interactive demonstration with browser storage persistence. Fictitious sample data for presentation.
          </span>
          <span className="text-[#FAF3E1]/90 md:hidden">
            Interactive client presentation demo.
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 mx-auto sm:mx-0 text-xs font-medium">
          <Link 
            to="/admin" 
            className="inline-flex items-center gap-1 text-[#E5C365] hover:text-white transition-colors underline decoration-[#C5A059]/50 hover:decoration-white"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#E5C365]" />
            Owner Admin Portal (Demo Login)
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
