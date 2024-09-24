import { useState } from 'react'
//import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"
import LogoutButton from '../components/LogoutButton.jsx'


export default function Header({ userName = "John Doe", userImage = "/vite.svg" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-lg bg-slate-400">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo placeholder with hover effect */}
            {/* <div className="w-12 h-12 bg-primary-foreground/10 flex items-center justify-center rounded-full transition-transform hover:scale-110">
              <span className="text-2xl font-bold text-primary-foreground">Logo</span>
            </div> */}
            {/* You can replace the div above with an Image component when you have a logo */}
            <a href="/">
              <img src="/games_icon.png" alt="Logo" width={48} height={48} className="rounded-full transition-transform hover:scale-110" />
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-foreground/30 transition-all duration-300 group-hover:ring-primary-foreground/60">
                <img
                  src={userImage}
                  alt={`${userName}'s profile`}
                  width={40}
                  height={40}
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{userName}</span>
              </div>
            </div>
            <LogoutButton />
          </div>

          {/* Mobile menu button */}
          <button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-4 py-4 border-t border-primary-foreground/10 md:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={userImage}
                    alt={`${userName}'s profile`}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userName}</span>
                </div>
              </div>
              
                <LogoutButton />
              
            </div>
          </div>
        )}
      </div>
    </header>
  )
}