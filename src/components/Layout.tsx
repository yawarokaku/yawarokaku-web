import { Link } from 'gatsby'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 bg-white mb-6">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold">
            <Link
              to="/"
              className="text-gray-900 no-underline hover:text-gray-700"
            >
              やわろ書く
            </Link>
          </h1>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
          <p>&copy; 2025 yawarokaku.jp</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
