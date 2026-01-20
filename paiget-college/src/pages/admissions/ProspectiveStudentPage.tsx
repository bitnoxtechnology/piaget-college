"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Meta from "@/components/Meta";
import {
  Heart,
  BookOpen,
  Zap,
  Users,
  Star,
  Award,
  Clock,
  Laptop,
  TrendingUp,
  CheckCircle,
  Lightbulb,
} from "lucide-react";

const ProspectiveStudentPage = () => {
  const benefits = [
    {
      icon: Award,
      title: "Government Approved (NCCE)",
      description:
        "Piaget College of Education is a privately owned college in Abeokuta, Ogun State, and is officially Government Approved by NCCE.",
    },
    {
      icon: Clock,
      title: "Flexible Learning Options",
      description:
        "Full-time or part-time pace. Attend classes only during long vacation and complete your program in just 3 years while working full-time.",
    },
    {
      icon: TrendingUp,
      title: "University Admission",
      description:
        "Your NCE allows you to gain admission to university with 2nd year status and complete your bachelor's degree in 3 years instead of 4.",
    },
    {
      icon: Laptop,
      title: "Great Value & Savings",
      description:
        "All courses include FREE BASIC COMPUTER CLASSES & Desktop Publishing. Our tuition is 70% less than any four-year institution.",
    },
    {
      icon: Zap,
      title: "No Time Wasted",
      description:
        "Complete your education on time with no strikes or delays. Guarantees for your future with consistent academic progress.",
    },
    {
      icon: Users,
      title: "Personal Attention",
      description:
        "Smaller class sizes taught by caring lecturers in a safe and secure environment dedicated to your success.",
    },
    {
      icon: Star,
      title: "Professional Qualification",
      description:
        "If you own a school, Teaching Certification is now a must. We help you with Teachers Registration Certification.",
    },
    {
      icon: BookOpen,
      title: "Quality Education",
      description:
        "Learn from the best with an education tailored to your unique interests and goals in a supportive community.",
    },
  ];

  const expectations = [
    "Commitment to academics and your Piaget education fully",
    "An engaged and active attitude in and out of the classroom",
    "Willingness to contribute to the Piaget community through service and integrity",
    "Dedication to real-world experience and practical learning",
    "Respect for our community values and academic standards",
  ];

  const applicationTips = [
    {
      title: "Official Secondary School Credentials",
      description:
        "Ensure your transcripts and certificates are official and properly submitted with your application.",
    },
    {
      title: "WAEC/NECO/SSCE/TC II/CAMBRIDGE Scores",
      description:
        "Include all relevant examination scores that demonstrate your academic capability.",
    },
    {
      title: "Application Fee",
      description:
        "Submit the non-refundable N10,000 fee as part of your application package.",
    },
    {
      title: "Admission Interview Performance",
      description:
        "Perform well during your admission interview - this makes a significant impression on our admissions team.",
    },
    {
      title: "Strong Letters of Recommendation",
      description:
        "Secure quality letters from 2 academic teachers and 1 personal reference. Make them count!",
    },
  ];

  return (
    <div className="bg-light-850!">
      <Meta
        title="Prospective Students | Piaget College of Education"
        description="Learn about Piaget College's programs, benefits, and what we expect from our students. Discover why Piaget is the right choice for your teacher education journey."
        keywords="prospective students, NCE programs, teacher education, student life, admissions, education"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary-100 to-primary-200 py-16! md:py-24! px-4! md:px-6! mt-17.5! md:mt-20!">
        <div className="max-w-6xl mx-auto!">
          <h1 className="text-4xl! md:text-5xl! font-bold text-white mb-4!">
            Dear Prospective Student
          </h1>
          <p className="text-lg! text-secondary-200 max-w-3xl">
            Welcome to Piaget College of Education
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12! md:py-16! px-4! md:px-6!">
        <div className="max-w-6xl mx-auto!">
          {/* Welcome Message */}
          <div className="mb-12! bg-white rounded-lg p-6! md:p-8! shadow-sm border-l-4 border-primary-100">
            <div className="flex gap-3! items-start mb-4!">
              <Heart size={28} className="text-primary-100 shrink-0 mt-1!" />
              <div>
                <h2 className="text-2xl! font-bold text-primary-100 mb-3!">
                  Thank You for Considering Piaget
                </h2>
                <p className="text-text-primary mb-3!">
                  Thank you for considering Piaget College of Education for your
                  National Certificate of Education (NCE), Pre-NCE Programmes
                  and Professional Diploma in Education (PDE). It's great that
                  you're looking at us, and we'd like to tell you more about
                  what it takes.
                </p>
                <p className="text-text-primary mb-3!">
                  The admissions process is fairly quick and easy, but you'll
                  want to stay on top of it all the way. Are you ready to accept
                  the challenge of being a Piaget student?
                </p>
                <p className="text-lg! font-semibold text-primary-100">
                  At Piaget we believe YOU matter. We look forward to working
                  with you.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12!">
            <div className="flex items-center gap-3! mb-8!">
              <Star size={32} className="text-primary-100" />
              <h2 className="text-3xl! font-bold text-primary-100">
                Benefits of Our Programmes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6!">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6! shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4! items-start mb-3!">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12! h-12! rounded-full bg-primary-100 text-white">
                          <IconComponent size={24} />
                        </div>
                      </div>
                      <h3 className="text-lg! font-bold text-primary-100 mt-0.5!">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-text-primary text-sm!">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Academics Section */}
          <div className="mb-12! bg-light-800 rounded-lg p-6! md:p-8!">
            <div className="flex items-center gap-3! mb-6!">
              <BookOpen size={32} className="text-primary-100" />
              <h2 className="text-3xl! font-bold text-primary-100">
                Academics: Learn from the Best
              </h2>
            </div>

            <div className="space-y-4! text-text-primary">
              <p>
                At Piaget you'll get an education that has real value. We give
                our students an education tailored to their unique interests and
                goals. This includes:
              </p>
              <ul className="space-y-3! list-disc list-inside">
                <li>Classes taught by dedicated experts in their fields</li>
                <li>A supportive community committed to academic excellence</li>
                <li>
                  Real-world experience and practical learning opportunities
                </li>
                <li>
                  Preparation for an exciting and fulfilling career in education
                </li>
                <li>Interactive and engaging learning methods</li>
              </ul>
            </div>
          </div>

          {/* What We Expect Section */}
          <div className="mb-12!">
            <div className="flex items-center gap-3! mb-8!">
              <Lightbulb size={32} className="text-secondary-500" />
              <h2 className="text-3xl! font-bold text-primary-100">
                What We Expect
              </h2>
            </div>

            <div className="bg-white rounded-lg p-6! md:p-8! shadow-sm border-l-4 border-secondary-500">
              <p className="text-text-primary mb-6!">
                At Piaget we provide a strong foundation combined with
                interactive, real-world experience. In return, we ask that our
                students commit to their Piaget education fully. We expect
                students to:
              </p>

              <div className="space-y-3!">
                {expectations.map((expectation, index) => (
                  <div key={index} className="flex gap-3! items-start">
                    <CheckCircle
                      size={24}
                      className="text-green-600 flex-shrink-0 mt-1!"
                    />
                    <p className="text-text-primary">{expectation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Make Your Application Stand Out */}
          <div className="mb-12!">
            <div className="flex items-center gap-3! mb-8!">
              <Award size={32} className="text-primary-100" />
              <h2 className="text-3xl! font-bold text-primary-100">
                Make Your Application Stand Out
              </h2>
            </div>

            <p className="text-text-primary mb-6! bg-light-800 p-4! rounded-lg">
              We look at a candidate's entire application. One factor that makes
              a big impression on us is your performance during the admission
              interview as well as the quality of your letters of
              recommendations. So make them count!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
              {applicationTips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-5! shadow-sm border-t-4 border-primary-100"
                >
                  <h4 className="text-lg! font-bold text-primary-100 mb-2!">
                    {tip.title}
                  </h4>
                  <p className="text-sm! text-text-primary">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Your Complete Application Package */}
          <div className="bg-linear-to-r from-primary-100 to-primary-200 rounded-lg p-6! md:p-8! text-white">
            <h3 className="text-2xl! font-bold mb-4!">
              Your Complete Application Package Must Include:
            </h3>
            <ul className="space-y-2! list-disc list-inside">
              <li>Official secondary school credentials</li>
              <li>WAEC/NECO/SSCE/TC II/CAMBRIDGE scores</li>
              <li>Non-refundable N10,000 application fee</li>
              <li>2 letters of recommendation from academic teachers</li>
              <li>1 letter of recommendation from a personal reference</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-12! text-center">
            <h3 className="text-2xl! font-bold text-primary-100 mb-4!">
              Ready to Join Piaget?
            </h3>
            <p className="text-lg! text-text-primary mb-6!">
              Take the next step in your educational journey. Apply now and
              become part of our supportive and innovative community.
            </p>
            <a
              href="/apply"
              className="inline-block bg-primary-100 hover:bg-primary-200 text-white font-bold py-3! px-8! rounded-lg transition-colors duration-300"
            >
              Start Your Application
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProspectiveStudentPage;
