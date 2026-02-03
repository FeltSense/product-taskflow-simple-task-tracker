import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-white border-t border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">TaskFlow</h3>
              <p className="text-sm text-gray-500 mt-1">Simple Task Tracker</p>
            </div>
            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              Streamline your workflow with our intuitive task management platform designed for modern teams.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="https://github.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github size={18} />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin size={18} />
              </Link>
              <Link href="mailto:hello@taskflow.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Mail size={18} />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}