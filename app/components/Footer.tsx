"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", link: "/about" },
      { name: "Contact", link: "/contact" },
      { name: "Careers", link: "/careers" },
      { name: "Press", link: "/press" }
    ],
    support: [
      { name: "Help Center", link: "/help" },
      { name: "Terms of Service", link: "/terms" },
      { name: "Privacy Policy", link: "/privacy" },
      { name: "Cookie Policy", link: "/cookies" }
    ],
    content: [
      { name: "VOD Library", link: "/pages/videoOnDemand" },
      { name: "Live Events", link: "/pages/Live" },
      { name: "Channels", link: "/pages/Channels" },
      { name: "Categories", link: "/pages/Category" }
    ]
  };

  const socialLinks = [
    { icon: FaFacebook, link: "https://facebook.com" },
    { icon: FaTwitter, link: "https://twitter.com" },
    { icon: FaInstagram, link: "https://instagram.com" },
    { icon: FaYoutube, link: "https://youtube.com" }
  ];

  return (
    <footer className="bg-black border-t-[0.5px] text-white w-full py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4">
            <Image src="/logo/vbox.png" width={100} height={100} alt="logo" />
            <p className="text-sm text-gray-400">
              Your premier destination for streaming entertainment and live events.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="text-sm text-gray-400 hover:text-white hover:underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.link}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={24} />
                  </Link>
                );
              })}
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} VBox. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;