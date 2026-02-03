import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = '' }) => (
  <Link
    href={href}
    className={`text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 ${className}`}
  >
    {children}
  </Link>
)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-semibold text-gray-900">TaskFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/signin"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4">
              <NavLink href="/features" className="block px-2 py-1">
                Features
              </NavLink>
              <NavLink href="/pricing" className="block px-2 py-1">
                Pricing
              </NavLink>
              <NavLink href="/about" className="block px-2 py-1">
                About
              </NavLink>
              <NavLink href="/contact" className="block px-2 py-1">
                Contact
              </NavLink>
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                <Link
                  href="/signin"
                  className="text-gray-600 hover:text-gray-900 font-medium px-2 py-1 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}