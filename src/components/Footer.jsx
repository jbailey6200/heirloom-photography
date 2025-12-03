import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="text-4xl font-script text-white">Heirloom</span>
              <span className="block text-[10px] tracking-[0.3em] uppercase font-sans text-stone-400 mt-1">
                & Co. Photography
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed font-sans mb-6">
              Capturing timeless moments for generations to treasure. 
              Wedding and lifestyle photography serving North Alabama.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/heirloomphotosco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61580635599116" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-6 font-sans">
              Service Areas
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li className="text-stone-400 hover:text-white transition-colors cursor-default">
                Cullman, Alabama
              </li>
              <li className="text-stone-400 hover:text-white transition-colors cursor-default">
                Huntsville & Madison
              </li>
              <li className="text-stone-400 hover:text-white transition-colors cursor-default">
                Decatur & Hartselle
              </li>
              <li className="text-stone-400 hover:text-white transition-colors cursor-default">
                Birmingham Area
              </li>
              <li className="text-stone-400 hover:text-white transition-colors cursor-default">
                All of North Alabama
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-6 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <Link to="/pricing" className="text-stone-400 hover:text-white transition-colors">
                  Pricing Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-400 hover:text-white transition-colors">
                  Meet Marie
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-stone-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/galleries" className="text-stone-400 hover:text-white transition-colors">
                  Client Galleries
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-400 hover:text-white transition-colors">
                  Book a Session
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-6 font-sans">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a 
                href="mailto:heirloomandcophotos@gmail.com"
                className="flex items-start text-stone-400 hover:text-white transition-colors text-sm font-sans group"
              >
                <svg className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-stone-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>heirloomandcophotos@gmail.com</span>
              </a>
              
              <div className="pt-4">
                <Link 
                  to="/contact"
                  className="inline-flex items-center px-6 py-2.5 border border-stone-600 text-stone-300 text-xs tracking-[0.15em] uppercase font-sans hover:bg-white hover:text-stone-900 hover:border-white transition-all duration-200"
                >
                  Inquire Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone-500 text-xs tracking-wide font-sans">
              © {currentYear} Heirloom & Co. Photography. All rights reserved.
            </p>
            <p className="text-stone-600 text-xs font-sans">
              Serving Cullman, Huntsville, Decatur & North Alabama
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}