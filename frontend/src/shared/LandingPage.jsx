import React from "react";
import appLogo from "../../public/appLogo.png";
import { Button } from "../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import AnimationJob from "../assets/AnimationJob.json";
import AnimationFind from "../assets/AnimationFind.json";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white font-sans">
      <header className="w-full px-4 lg:px-16 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={appLogo} className="h-10" alt="OpportuNet Logo" />
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Solutions
            </a>
            <a
              href="#community"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Community
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          <div className="flex space-x-4">
            <Button
              text={"Sign In"}
              onClick={() => navigate("/user/sign_in")}
              className={
                "px-4 py-2 text-blue-600 border border-blue-600 hover:bg-blue-50"
              }
            />
            <Button
              text={"Join Now"}
              onClick={() => navigate("/user/sign_up")}
              className={"px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"}
            />
          </div>
        </div>
      </header>

      <section className="w-full px-4 lg:px-16 py-16 md:py-20 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-15 2xl:mb-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Elevate Your <span className="text-blue-600">Professional</span>{" "}
              Journey
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover a world of limitless career possibilities, forge powerful
              connections with industry leaders, and fast-track your
              professional growth with OpportuNet. Our platform is designed to
              empower you with the tools and resources to unlock your full
              potential and achieve your career aspirations like never before.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                text={"Get Started"}
                onClick={() => navigate("/feed")}
                className={
                  "px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium"
                }
              />
              <Link
                to="/features"
                className="px-8 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-md inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Lottie
              animationData={AnimationJob}
              loop={true}
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section id="features" className="w-full px-4 lg:px-16 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Powerful Features for Your Career Growth
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover tools designed to help you connect, grow, and succeed in
              your professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Smart Networking",
                description:
                  "Build meaningful connections with professionals in your industry.",
                icon: "👥",
              },
              {
                title: "Job Matching",
                description:
                  "Find opportunities that align with your skills and aspirations.",
                icon: "🔍",
              },
              {
                title: "Skill Development",
                description:
                  "Access courses and resources to enhance your professional skills.",
                icon: "📚",
              },
              {
                title: "Career Insights",
                description:
                  "Get valuable data and trends about your industry and role.",
                icon: "📊",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="w-full px-4 lg:px-16 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Comprehensive Solutions for Businesses
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're looking to hire top talent or build your employer
              brand, OpportuNet provides the tools you need for successful
              recruitment.
            </p>
            <ul className="space-y-4">
              {[
                "Advanced candidate matching algorithms",
                "Employer branding tools",
                "Diversity and inclusion analytics",
                "Streamlined interview scheduling",
                "Comprehensive talent analytics",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2">
            <Lottie
              animationData={AnimationFind}
              loop={true}
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section
        id="community"
        className="w-full px-4 lg:px-16 py-20 bg-blue-600 text-white"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-lg mb-8">
              Connect with professionals across industries and discover new
              opportunities through our vibrant community.
            </p>
            <Button
              text={"Explore Community"}
              onClick={() => navigate("/feed")}
              className={
                "px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 font-medium"
              }
            />
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                {[
                  "50K+ Members",
                  "100+ Industries",
                  "30 Countries",
                  "24/7 Support",
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 p-4 rounded-lg text-center"
                  >
                    <p className="text-2xl font-bold">{stat.split("+")[0]}+</p>
                    <p>{stat.split("+")[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full px-4 lg:px-16 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions or want to learn more? Reach out to our team.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button
                  text={"Send Message"}
                  className={
                    "px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium"
                  }
                />
              </form>
            </div>

            <div className="lg:w-1/2 bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600">OpportuNet@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Phone</h4>
                    <p className="text-gray-600">+212 682-718535</p>
                    <p className="text-gray-600">+212 659-523000</p>
                    <p className="text-gray-600">+212 688-943313</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Address</h4>
                    <p className="text-gray-600">Tiznit, 85000</p>
                    <p className="text-gray-600">Morocco</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(
                    (social, index) => (
                      <a
                        key={index}
                        href="#"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {social}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full px-4 lg:px-16 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={appLogo} className="h-8" alt="OpportuNet Logo" />
                <span className="text-xl font-semibold">OpportuNet</span>
              </div>
              <p className="text-gray-400">
                The professional network designed to help you connect, grow, and
                succeed.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#solutions"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="#pricing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="#resources"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#careers"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#press"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/legalPAge"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legalPAge"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legalPAge"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legalPAge"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} OpportuNet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
