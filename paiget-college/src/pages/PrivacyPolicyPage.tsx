import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Meta from "@/components/Meta";
import { Shield } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-light-850!">
      <Meta
        title="Privacy Policy | Piaget College of Education"
        description="Privacy policy for Piaget College of Education website. Learn how we protect and handle your personal information."
        keywords="privacy policy, data protection, personal information, Piaget College"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary-100 to-primary-200 py-16! md:py-24! px-4! md:px-6! mt-17.5! md:mt-20!">
        <div className="max-w-6xl mx-auto!">
          <div className="flex items-center gap-4 mb-6!">
            <Shield className="text-white" size={40} />
            <h1 className="text-4xl! md:text-5xl! font-bold text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg! text-secondary-200 max-w-2xl">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16! md:py-20! px-4! md:px-6!">
        <div className="max-w-4xl mx-auto!">
          <div className="space-y-10! text-gray-700">
            {/* Introduction */}
            <div className="bg-light-800 p-6! md:p-8! rounded-lg border-l-4 border-primary-100">
              <h2 className="text-2xl! font-bold text-primary-100 mb-4!">
                Introduction
              </h2>
              <p className="leading-relaxed">
                Piaget College of Education ("we," "us," "our," or "Company")
                operates the website. This page informs you of our policies
                regarding the collection, use, and disclosure of personal data
                when you use our Service and the choices you have associated
                with that data.
              </p>
            </div>

            {/* Information Collection */}
            <div>
              <h2 className="text-2xl! font-bold text-gray-900 mb-4! flex items-center gap-2">
                <span className="text-primary-100">📋</span> Information We
                Collect
              </h2>
              <div className="space-y-4! pl-0 md:pl-8">
                <p>We may collect the following types of information:</p>
                <ul className="space-y-2! list-disc list-inside">
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, and other contact details you provide when
                    applying or contacting us.
                  </li>
                  <li>
                    <strong>Application Data:</strong> Information submitted
                    through our application forms, including educational
                    background and personal preferences.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you
                    interact with our website, including IP address, browser
                    type, and pages visited.
                  </li>
                  <li>
                    <strong>Cookies:</strong> Small data files stored on your
                    device to enhance your browsing experience.
                  </li>
                </ul>
              </div>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-2xl! font-bold text-gray-900 mb-4! flex items-center gap-2">
                <span className="text-primary-100">🎯</span> How We Use Your
                Information
              </h2>
              <div className="space-y-4! pl-0 md:pl-8">
                <p>
                  We use the information we collect for the following purposes:
                </p>
                <ul className="space-y-2! list-disc list-inside">
                  <li>Processing your application for admission</li>
                  <li>
                    Communicating with you about your application and College
                    programs
                  </li>
                  <li>Improving our website and services</li>
                  <li>Sending newsletters and updates (with your consent)</li>
                  <li>
                    Responding to your inquiries and providing customer support
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Protection */}
            <div>
              <h2 className="text-2xl! font-bold text-gray-900 mb-4! flex items-center gap-2">
                <span className="text-primary-100">🔒</span> Data Protection &
                Security
              </h2>
              <p className="leading-relaxed pl-0 md:pl-8">
                We are committed to protecting your personal information. We
                implement appropriate technical and organizational measures to
                safeguard your data against unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission
                over the Internet is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </div>

            {/* Third Party Sharing */}
            <div>
              <h2 className="text-2xl! font-bold text-gray-900 mb-4! flex items-center gap-2">
                <span className="text-primary-100">🤝</span> Sharing Your
                Information
              </h2>
              <div className="space-y-4! pl-0 md:pl-8">
                <p>
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share information with:
                </p>
                <ul className="space-y-2! list-disc list-inside">
                  <li>
                    College staff and departments for admission processing
                  </li>
                  <li>
                    Service providers who assist in website operation (with
                    confidentiality agreements)
                  </li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl! font-bold text-gray-900 mb-4! flex items-center gap-2">
                <span className="text-primary-100">✋</span> Your Rights
              </h2>
              <div className="space-y-4! pl-0 md:pl-8">
                <p>You have the right to:</p>
                <ul className="space-y-2! list-disc list-inside">
                  <li>Access your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>
                    Request deletion of your data (subject to legal obligations)
                  </li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-primary-100 bg-opacity-10 p-6! md:p-8! rounded-lg border-l-4 border-primary-100">
              <h2 className="text-2xl! font-bold text-white mb-4!">
                Contact Us
              </h2>
              <p className="leading-relaxed mb-4!">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us at:
              </p>
              <div className="space-y-2!">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@piagetcoe.edu.ng"
                    className="text-white hover:underline"
                  >
                    info@piagetcoe.edu.ng
                  </a>
                </p>
                <p>
                  <strong>Address:</strong> Piaget College of Education,
                  Abeokuta, Ogun State, Nigeria
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+2348097729616"
                    className="text-white hover:underline"
                  >
                    +234-8097729616
                  </a>
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center pt-8! border-t border-gray-300">
              <p className="text-gray-600">
                <strong>Last Updated:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
