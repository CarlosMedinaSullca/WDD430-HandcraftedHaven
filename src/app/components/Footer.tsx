export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12 w-full">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Handcrafted Haven
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Crafting quality artisan products for your everyday life.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-800 font-medium">Quick Links</h3>
          <ul className="text-gray-600 text-sm flex flex-col gap-1">
            <li>
              <a href="/about" className="hover:text-gray-900 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-gray-900 transition">
                Shop
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-900 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-gray-900 transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-gray-800 font-medium">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Facebook
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Instagram
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Twitter
            </a>
          </div>
        </div>
      </div>

      <div className="border-t text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Handcrafted Haven . All rights reserved.
      </div>
    </footer>
  );
}
