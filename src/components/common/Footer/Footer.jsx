import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-top">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-2xl font-semibold playfair-display-font">
              WEDDING DREAM
            </h1>
            <p className="text-red-900 italic text-center inria-serif-font font-bold">
              Since 2024
            </p>
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="font-bold">ABOUT OUR WORKS</h2>
            <p className="hover:text-red-500 cursor-pointer transition duration-300">
              Wedding Planner
            </p>
            <p className="hover:text-red-500 cursor-pointer transition duration-300">
              Vr Experience
            </p>
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="font-bold">ABOUT OUR SERVICE</h2>
            <p className="hover:text-red-500 cursor-pointer transition duration-300">
              Wedding Planning
            </p>
            <p className="hover:text-red-500 cursor-pointer transition duration-300">
              Styling & Decoration
            </p>
            <p className="hover:text-red-500 cursor-pointer transition duration-300">
              VR Experiences
            </p>
          </div>
          <div className="text-center md:text-left">
            <h2 className="hover:text-red-500 cursor-pointer transition duration-300 font-bold">
              OUR FEEDBACK
            </h2>
            <h2 className="hover:text-red-500 cursor-pointer transition duration-300 font-bold">
              BLOG
            </h2>
            <h2 className="hover:text-red-500 cursor-pointer transition duration-300 font-bold">
              CONTACT
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
