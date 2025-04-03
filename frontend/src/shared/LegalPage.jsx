import React from "react";
import { Link } from "react-router-dom";

export const LegalPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Legal Information</h1>
        <div className="flex justify-center space-x-6">
          <a href="#privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
          <a href="#terms" className="text-blue-600 hover:text-blue-800">Terms of Service</a>
          <a href="#cookies" className="text-blue-600 hover:text-blue-800">Cookie Policy</a>
          <a href="#accessibility" className="text-blue-600 hover:text-blue-800">Accessibility</a>
        </div>
      </div>

      <div className="space-y-16">
        {/* Privacy Policy Section */}
        <section id="privacy" className="scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
          <div className="space-y-4 text-gray-700">
            <p><strong>Last Updated:</strong> January 1, 2023</p>
            
            <h3 className="text-lg font-semibold mt-6">1. Information We Collect</h3>
            <p>We collect information you provide directly, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Personal details (name, email, contact information)</li>
              <li>Account credentials</li>
              <li>Content you submit to our platform</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">2. How We Use Your Information</h3>
            <p>Your information helps us:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Communicate with you about updates</li>
              <li>Ensure platform security</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">3. Data Sharing</h3>
            <p>We do not sell your personal data. We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Service providers under confidentiality agreements</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners during mergers or acquisitions</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">4. Your Rights</h3>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access and request copies of your data</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>
        </section>

        {/* Terms of Service Section */}
        <section id="terms" className="scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>
          <div className="space-y-4 text-gray-700">
            <h3 className="text-lg font-semibold">1. Account Responsibilities</h3>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide accurate account information</li>
              <li>Maintain the security of your credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">2. Acceptable Use</h3>
            <p>You may not:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Violate any laws or third-party rights</li>
              <li>Upload malicious content or spam</li>
              <li>Attempt unauthorized access to our systems</li>
              <li>Use automated tools to scrape data</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">3. Content Ownership</h3>
            <p>You retain ownership of content you submit, but grant us a worldwide license to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Host, display, and distribute your content</li>
              <li>Modify content to conform with technical requirements</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">4. Termination</h3>
            <p>We may terminate accounts that violate these terms without notice.</p>
          </div>
        </section>

        {/* Cookie Policy Section */}
        <section id="cookies" className="scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Policy</h2>
          <div className="space-y-4 text-gray-700">
            <h3 className="text-lg font-semibold">1. What Are Cookies?</h3>
            <p>Cookies are small text files stored on your device when you visit websites.</p>

            <h3 className="text-lg font-semibold mt-6">2. How We Use Cookies</h3>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Authenticate users and maintain sessions</li>
              <li>Remember preferences and settings</li>
              <li>Analyze site usage and improve services</li>
              <li>Deliver targeted advertising (with consent)</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">3. Cookie Types</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Essential:</strong> Required for basic functionality</li>
              <li><strong>Performance:</strong> Help improve our services</li>
              <li><strong>Functional:</strong> Remember your preferences</li>
              <li><strong>Advertising:</strong> Used for targeted ads</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">4. Managing Cookies</h3>
            <p>You can control cookies through your browser settings or our consent manager.</p>
          </div>
        </section>

        {/* Accessibility Section */}
        <section id="accessibility" className="scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Accessibility Statement</h2>
          <div className="space-y-4 text-gray-700">
            <h3 className="text-lg font-semibold">1. Our Commitment</h3>
            <p>We strive to ensure our platform is accessible to all users, regardless of ability.</p>

            <h3 className="text-lg font-semibold mt-6">2. Accessibility Features</h3>
            <p>Our platform includes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>Adjustable text sizing</li>
              <li>High contrast options</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">3. Ongoing Efforts</h3>
            <p>We continuously work to improve accessibility by:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Following WCAG 2.1 AA guidelines</li>
              <li>Conducting regular accessibility audits</li>
              <li>Training our development team</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">4. Feedback</h3>
            <p>If you encounter accessibility barriers, please contact us at <a href="mailto:accessibility@opportunet.com" className="text-blue-600">accessibility@opportunet.com</a>.</p>
          </div>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Return to Home
        </Link>
      </div>
    </div>
  );
};