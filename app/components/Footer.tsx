export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-10 px-4">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Home</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Brand
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Featured Movies
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Live Streaming
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Movies</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Genres
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trending
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                New Release
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Popular
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shows</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Genres
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trending
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                New Release
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Popular
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscription</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Plans
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Features
              </a>
            </li>
          </ul>
        </div>

        {/* Column 6 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2024 MovieNest, All Rights Reserved</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
