import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

interface FooterProps {}

export default function Footer({}: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">TaskFlow</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                Simple task tracker for modern teams. Stay organized, collaborate effectively, 
                and get more done with less complexity.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Integrations</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Status</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Community</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            © 2024 TaskFlow. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}