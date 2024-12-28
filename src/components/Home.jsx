import {React, useContext} from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
export default function Home() {
  
  return (
    <>
      <NavBar />
      <div className="mt-32 z-100">
        <h3 className="text-center ml-8 mr-8 mt-8 text-gray-600 md:mt-12 text-3xl md:text-5xl font-bold">
          Write, compile, and run directly in your browser.
        </h3>
        <p className="m-6 text-center">
          CodeIt is an online compiler that supports multiple programming
          languages, enabling users to write, compile, and execute code directly
          in their browser. It offers a seamless coding experience without the
          need for additional installations.
        </p>
      </div>
      <hr className="ml-32 mr-32 bg-gray-800 h-0.5 border-none" />

      {/* Language List */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 m-4">
        {[
          {
            name: "python",
            displayName: "Python",
            img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
            href: "/livecode/codenow.html?language=python",
          },
          {
            name: "javascript",
            displayName: "JavaScript",
            img: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
            href: "/livecode/codenow.html?language=javascript",
          },
          {
            name: "java",
            displayName: "Java",
            img: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
            href: "/livecode/codenow.html?language=java",
          },
          {
            name: "cpp",
            displayName: "C++",
            img: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
            href: "/livecode/codenow.html?language=cpp",
          },
          {
            name: "csharp",
            displayName: "C#",
            img: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png",
            href: "/livecode/codenow.html?language=csharp",
          },
          {
            name: "ruby",
            displayName: "Ruby",
            img: "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg",
            href: "/livecode/codenow.html?language=ruby",
          },
          {
            name: "go",
            displayName: "Go",
            img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg",
            href: "/livecode/codenow.html?language=go",
          },
          {
            name: "php",
            displayName: "PHP",
            img: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
            href: "/livecode/codenow.html?language=php",
          },
          {
            name: "rust",
            displayName: "Rust",
            img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg",
            href: "/livecode/codenow.html?language=rust",
          },
          {
            name: "swift",
            displayName: "Swift",
            img: "https://developer.apple.com/assets/elements/icons/swift/swift-64x64_2x.png",
            href: "/livecode/codenow.html?language=swift",
          },
        ].map((language, index) => (
          <Link
            to={`/codenow/${language.name}`}
            key={index}
            href={language.href}
            className="flex items-center justify-center p-6 border rounded-lg shadow hover:bg-gray-200 transform hover:scale-105 transition-all"
          >
            <p className="text-sm md:text-xl font-semibold mr-4 text-center">
              {language.displayName}
            </p>
            <img
              src={language.img}
              alt={`${language.name} Logo`}
              className="h-5 w-5 md:w-14 md:h-14"
            />
          </Link>
        ))}
      </div>

      {/* Features Section */}
      {[
        {
          icon: "text-green-500 bg-green-100",
          title: "Completely Free to Use",
          text: "CodeIt allows you to write, compile, and run code without any hidden fees. Whether you are a beginner or an expert, you can enjoy all features without paying a cent.",
        },
        {
          icon: "text-blue-500 bg-blue-100",
          title: "Supports Multiple Languages",
          text: "CodeIt supports a wide range of programming languages, including Python, JavaScript, Java, C++, and more. This allows you to work on a variety of projects and learn new languages without switching platforms.",
        },
        {
          icon: "text-yellow-500 bg-yellow-100",
          title: "Save Your Code",
          text: "With CodeIt, you can save your code online and return to it later, even from a different device. Perfect for ongoing projects or practice sessions, so you never lose progress.",
        },
        {
          icon: "text-red-500 bg-red-100",
          title: "Share Code with Others",
          text: "Collaborate easily with peers by sharing your code via a unique link. Get feedback or work together on projects in a simple and efficient way, making teamwork seamless.",
        },
        {
          icon: "text-purple-500 bg-purple-100",
          title: "No Signup or Sign-in Required",
          text: "You can start coding immediately without the need to create an account. CodeIt makes it quick and easy to begin working on your projects without the hassle of sign-up processes.",
        },
      ].map((feature, index) => (
        <div key={index} className="flex flex-col items-center p-6">
          <div
            className={`flex flex-row items-center space-x-4 mb-4 bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105`}
          >
            <span className={`text-4xl p-3 rounded-full ${feature.icon}`}>
              ✔
            </span>
            <h1 className="text-2xl font-semibold">{feature.title}</h1>
          </div>
          <p className="text-lg text-gray-700 text-center">{feature.text}</p>
        </div>
      ))}
      <Footer />
    </>
  );

  // footer
  function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-300 py-6 mt-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* About Us */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-white">About Us</h3>
            <p className="text-sm mt-2">
              CodeIt is an online compiler that supports multiple programming
              languages, enabling users to write, compile, and execute code
              directly in their browser. It offers a seamless coding experience
              without the need for additional installations..
            </p>
          </div>

          {/* Contact Us */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
            <p className="text-sm mt-2">
              Email:{" "}
              <a href="mailto:contact@codeit.com" className="text-blue-400">
                contact@codeit.com
              </a>
            </p>
            <p className="text-sm">
              Phone:{" "}
              <a href="tel:+1234567890" className="text-blue-400">
                +1 (234) 567-890
              </a>
            </p>
          </div>

          {/* Copyright Information */}
        </div>
        <hr className="ml-12 mr-12 mb-4 mt-4"/>
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CodeIt. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
}
