import React, { useEffect, useState } from "react";
import appLogo from "../../public/appLogo.png";
import { Button } from "../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import AnimationJob from "../assets/AnimationJob.json";
import AnimationFind from "../assets/AnimationFind.json";
import { isUserAuth } from "../protectedRoutes/PersisReload";
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline"

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const [subject,setSubject] = useState('')
  const [message,setMessage] = useState('')

  useEffect(() => {
    const isUserAuthenticated = async () => {
      const isAuthenticated = await isUserAuth();
      if (isAuthenticated) {
        setIsAuth(true);
      }
    };
    isUserAuthenticated();
  }, []);

  const sendMail = (e) =>{
      e.preventDefault()
      window.location.href = `mailto:soufianeboukir0@gmail.com?subject=${subject}&body=${message}`;
  }

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

          {!isAuth ? (
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
                className={"px-4 py-2 bg-blue-600 text-white hover:bg-blue-500"}
              />
            </div>
          ) : null}
        </div>
      </header>

      <div className="w-full px-4 lg:px-16 pb-16 md:py-20 bg-gradient-to-r from-blue-100 to-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-10 md:mb-15 2xl:mb-1 mt-20">
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
              <a
                href="#solutions"
                className="px-8 py-1 border cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-md inline-flex items-center justify-center"
              >
                Learn More
              </a>
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
      </div>

      <div id="features" className="w-full px-4 lg:px-16 py-20 bg-blue-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features for Your Career Growth
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Discover tools designed to help you connect, grow, and succeed in
              your professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Smart Networking
              </h3>
              <p className="text-gray-600">
                Build meaningful connections with professionals in your
                industry.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Job Matching
              </h3>
              <p className="text-gray-600">
                Find opportunities that align with your skills and aspirations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Professional Profile Building
              </h3>
              <p className="text-gray-600">
              Add experience, education, and skills to highlight your professional background.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Job Insights
              </h3>
              <p className="text-gray-600">
              Explore job trends, and relevant opportunities in your field.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="solutions" className="w-full px-4 lg:px-16 py-20 bg-gradient-to-r from-gray-50 to-blue-100">
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
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span className="text-gray-700">
                  Advanced candidate matching algorithms
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span className="text-gray-700">Create and publish posts with text, images, hashtags, and mentions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span className="text-gray-700">
                Send and receive private messages between users
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span className="text-gray-700">
                Follow other users and view their content
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span className="text-gray-700">
                Like, comment, share, report, and save posts
                </span>
              </li>
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
      </div>

      

      <div id="contact" className="w-full px-4 lg:px-16 py-20 bg-blue-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Have questions or want to learn more? Reach out to our team.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <form className="space-y-6" onSubmit={sendMail}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button
                  text={"Send Message"}
                  type={'submit'}
                  className={
                    "px-8 py-3 bg-blue-600 text-white hover:bg-blue-400 font-medium"
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
                    <EnvelopeIcon className="w-7"/>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600">OpportuNet@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <PhoneIcon className="w-7"/>
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
                    <MapPinIcon className="w-7"/>
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
                <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800"
                      >Facebook
                      </a><a
                        href="#"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Twitter
                      </a><a
                        href="#"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Instagram
                      </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full px-4 lg:px-16 py-12 bg-gray-200 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={appLogo} className="h-8" alt="OpportuNet Logo" />
              </div>
              <p className="text-gray-600">
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
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#solutions"
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="#pricing"
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="#resources"
                    className="text-gray-600 hover:text-white transition-colors"
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
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#careers"
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#blog"
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#press"
                    className="text-gray-600 hover:text-white transition-colors"
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
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legalPAge"
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legalPAge"
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legalPAge"
                    className="text-gray-600 hover:text-white transition-colors"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-600">
              © {new Date().getFullYear()} OpportuNet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
