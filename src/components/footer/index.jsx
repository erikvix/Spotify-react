import { Facebook, Github, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:gap-2 justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div>
              <a
                href="https://pixmeacoffee.vercel.app/jusu"
                className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-colors"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C256.1 224.4 247.9 224.5 242.4 218.9L165.7 142.2C151.5 127.1 132.6 120.2 112.6 120.2H103.3L200.7 22.8C231.1-7.6 280.3-7.6 310.6 22.8L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C365.3 148.1 378.8 142.5 392.6 142.5H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 368.9H392.6C378.8 368.9 365.3 363.3 355.5 353.5L278.5 276.5C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.2C139.1 363 126.4 368.6 112.6 368.6H80.8L22.8 310.6C-7.6 280.3-7.6 231.1 22.8 200.8L80.8 142.7H112.6z"
                  />
                </svg>
                Pix me a coffee
              </a>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://x.com/oerikcarvalho"
                className="hover:text-blue-400"
              >
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 30 30"
                  fill="#fff"
                >
                  <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/erikvix"
                className="hover:text-indigo-500"
              >
                <Github size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com/jusu.py"
                className="hover:text-pink-600"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Semaninha. All rights reserved.
        </div>
      </div>
    </footer>
  );
}