import {
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        
        {/* Left: Logo & Tagline */}
        <div>
          <h3 className="text-2xl font-bold mb-2">CareerTraits</h3>
          <p className="text-sm text-gray-400">
            Discover your ideal tech career path through personalized assessment and insights.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#how" className="hover:text-white">How It Works</a></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/assessment" className="hover:text-white">Take Assessment</a></li>
          </ul>
        </div>

        {/* Right: Contact Info */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5 text-purple-400" />
              support@careertraits.com
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-purple-400" />
              +1 (800) 123-4567
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CareerTraits. All rights reserved.
      </div>
    </footer>
  );
}
