"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Meta from "@/components/Meta";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Award,
  BookOpen,
  User,
  ArrowRight,
} from "lucide-react";

const HowToApplyPage = () => {
  const metaTitle = "How to Apply | Piaget College of Education";
  const metaDescription =
    "Learn how to apply to Piaget College of Education. Follow our step-by-step application guide, placement test requirements, and important deadlines.";
  const metaKeywords =
    "how to apply, application process, admission steps, placement tests, JAMB, eligibility";

  const steps = [
    {
      number: "1",
      title: "Collect Required Materials",
      icon: FileText,
      items: [
        "Your high school and/or college transcripts",
        "Three letters of recommendation (2 from previous teachers, 1 from a personal reference)",
        "Application fee of N10,000 (bank teller, money order, or credit card)",
      ],
    },
    {
      number: "2",
      title: "Complete the Application",
      icon: BookOpen,
      items: [
        "Bring in your application or apply online at www.piaget.edu.ng",
        "Your completed application and submission payment will be loaded automatically to our database",
      ],
    },
    {
      number: "3",
      title: "Piaget Internship Teacher Preparation Program (PITPP)",
      icon: Award,
      items: [
        "Complete section G in your application if interested",
        "Take ALL proficiency tests to qualify",
        "Make meaningful connections between classroom fieldwork and NCE coursework",
        "Complete fieldwork concurrently with academic coursework in a paid teaching position",
      ],
      isOptional: true,
    },
    {
      number: "4",
      title: "Take Placement Tests",
      icon: CheckCircle,
      items: [
        "English Placement Test (EPT) - unless exempt",
        "Entry Level Mathematics (ELM) exam - unless exempt",
        "Take tests as soon as possible after admission",
      ],
    },
    {
      number: "5",
      title: "Check Admission Status",
      icon: Mail,
      items: [
        "Receive application acknowledgment from Piaget",
        "Read carefully and follow instructions about documents and placement tests",
        "Check email or mailing address for communication",
        "Respond to college requirements and meet enrollment deadlines",
      ],
    },
    {
      number: "6",
      title: "Pre-NCE Admission",
      icon: Clock,
      items: [
        "Placement tests can be taken after your Pre-NCE course",
        "Tests must be completed before entry into NCE",
      ],
      isOptional: true,
    },
  ];

  return (
    <div className="bg-light-850!">
      <Meta
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary-100 to-primary-200 py-16! md:py-24! px-4! md:px-6! mt-17.5! md:mt-20!">
        <div className="max-w-6xl mx-auto!">
          <h1 className="text-4xl! md:text-5xl! font-bold text-white mb-4!">
            How to Apply
          </h1>
          <p className="text-lg! text-secondary-200 max-w-2xl">
            Follow our step-by-step guide to submit your application to Piaget
            College of Education
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12! md:py-16! px-4! md:px-6!">
        <div className="max-w-6xl mx-auto!">
          {/* When to Apply */}
          <div className="mb-12! bg-light-800 border-l-4 border-primary-100 p-6! md:p-8! rounded-r-lg">
            <div className="flex gap-3! items-start mb-3!">
              <Clock size={28} className="text-primary-100 flex-shrink-0" />
              <h2 className="text-2xl! font-bold text-primary-100">
                When Can I Apply for Admission?
              </h2>
            </div>
            <p className="text-text-primary mb-3!">
              You are urged to apply as early as possible. If applying after the
              initial filing period, consult Piaget's Admission Office for
              current information or email us at:{" "}
              <a
                href="mailto:admin@piagetcoe.edu.ng"
                className="text-primary-100 font-semibold hover:underline"
              >
                admin@piagetcoe.edu.ng
              </a>
            </p>
          </div>

          {/* Application Steps */}
          <div className="mb-12!">
            <h2 className="text-3xl! font-bold text-primary-100 mb-8! flex items-center gap-3!">
              <BookOpen size={32} />
              Application Steps
            </h2>

            <div className="space-y-6!">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6! md:p-8! shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4! md:gap-6! items-start">
                      {/* Step Number Badge */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12! h-12! rounded-full bg-primary-100 text-white font-bold text-lg!">
                          {step.number}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2! mb-3!">
                          <h3 className="text-xl! md:text-2xl! font-bold text-primary-100">
                            {step.title}
                          </h3>
                          {step.isOptional && (
                            <span className="inline-block px-2! py-1! bg-secondary-200 text-primary-100 text-xs! font-semibold rounded">
                              Optional
                            </span>
                          )}
                        </div>

                        {/* Items List */}
                        <div className="space-y-2!">
                          {step.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex gap-2! items-start"
                            >
                              <ArrowRight
                                size={18}
                                className="text-secondary-500 flex-shrink-0 mt-1!"
                              />
                              <p className="text-text-primary">{item}</p>
                            </div>
                          ))}
                        </div>

                        {/* Additional Info for PITPP */}
                        {step.number === "3" && (
                          <div className="mt-4! pt-4! border-t">
                            <p className="text-sm! text-text-primary italic">
                              One goal of our program is to make meaningful
                              connections between classroom fieldwork and the
                              NCE coursework. For more information, please
                              contact the college.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Placement Test Exemptions */}
          <div className="mb-12!">
            <h2 className="text-3xl! font-bold text-primary-100 mb-6! flex items-center gap-3!">
              <Award size={32} />
              Placement Test Exemptions
            </h2>

            <div className="space-y-6!">
              {/* English Placement Test */}
              <div className="bg-white rounded-lg p-6! md:p-8! shadow-sm">
                <h3 className="text-xl! font-bold text-secondary-500 mb-3!">
                  English Placement Test (EPT)
                </h3>
                <p className="text-text-primary mb-4!">
                  The English Placement Test (EPT) assesses the level of reading
                  and writing skills of students entering Piaget College of
                  Education. The EPT must be completed by all non-exempt
                  students prior to enrollment in any course.
                </p>
                <div className="bg-light-800 p-4! rounded-lg mb-4!">
                  <h4 className="font-semibold text-primary-100 mb-3! text-sm!">
                    Exemptions are granted to those who present proof of:
                  </h4>
                  <ul className="space-y-2!">
                    <li className="flex gap-2! items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-600 flex-shrink-0 mt-0.5!"
                      />
                      <span className="text-sm! text-text-primary">
                        A score of "Exempt" or "Ready for college-level English
                        courses" on the Piaget Early Assessment Program (EAP)
                        Standard Test
                      </span>
                    </li>
                    <li className="flex gap-2! items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-600 flex-shrink-0 mt-0.5!"
                      />
                      <span className="text-sm! text-text-primary">
                        A score of credit or above on the English section of the
                        WAEC/NECO/SSCE/TC II/CAMBRIDGE
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Entry Level Mathematics */}
              <div className="bg-white rounded-lg p-6! md:p-8! shadow-sm">
                <h3 className="text-xl! font-bold text-secondary-500 mb-3!">
                  Entry Level Mathematics (ELM) Examination
                </h3>
                <p className="text-text-primary mb-4!">
                  The Entry Level Mathematics (ELM) Examination is designed to
                  assess and measure the level of mathematics skills acquired
                  through three years of rigorous senior secondary mathematics
                  coursework of students entering Piaget College of Education.
                </p>
                <div className="bg-light-800 p-4! rounded-lg">
                  <h4 className="font-semibold text-primary-100 mb-3! text-sm!">
                    Exemptions are granted to those who present proof of:
                  </h4>
                  <ul className="space-y-2!">
                    <li className="flex gap-2! items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-600 flex-shrink-0 mt-0.5!"
                      />
                      <span className="text-sm! text-text-primary">
                        A score of "Exempt" or "Ready for college-level
                        mathematics courses" on the Piaget Early Assessment
                        Program (EAP) Standard Test
                      </span>
                    </li>
                    <li className="flex gap-2! items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-600 flex-shrink-0 mt-0.5!"
                      />
                      <span className="text-sm! text-text-primary">
                        A score of credit or above on the Mathematics section of
                        the WAEC/NECO/SSCE/TC II/CAMBRIDGE
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Application Routing */}
          <div className="mb-12! bg-white rounded-lg p-6! md:p-8! shadow-sm border-l-4 border-secondary-500">
            <div className="flex gap-3! items-start mb-3!">
              <User size={28} className="text-secondary-500 flex-shrink-0" />
              <h3 className="text-2xl! font-bold text-primary-100">
                What Happens if My First-Choice Major is Full?
              </h3>
            </div>
            <p className="text-text-primary">
              If your first-choice school is unable to accommodate you after the
              initial filing period, it may be possible to "reroute" your
              application to another major school major that is "open." Contact
              the Admission Office for more details on this process.
            </p>
          </div>

          {/* Important Tips */}
          <div className="bg-secondary-200 border-l-4 border-primary-100 p-6! md:p-8! rounded-r-lg">
            <div className="flex gap-3! items-start mb-4!">
              <AlertCircle
                size={24}
                className="text-primary-100 flex-shrink-0 mt-1!"
              />
              <h3 className="text-lg! font-bold text-primary-100">
                Important Tips
              </h3>
            </div>
            <ul className="space-y-3! list-disc list-inside">
              <li className="text-text-primary">
                Apply as early as possible to ensure consideration
              </li>
              <li className="text-text-primary">
                Keep your correct email address and mailing address on file with
                Piaget
              </li>
              <li className="text-text-primary">
                Carefully read the application acknowledgment and follow all
                instructions
              </li>
              <li className="text-text-primary">
                Do not miss enrollment or acceptance deadlines
              </li>
              <li className="text-text-primary">
                Contact the Admission Office if you have questions at{" "}
                <a
                  href="mailto:admin@piagetcoe.edu.ng"
                  className="text-primary-100 font-semibold hover:underline"
                >
                  admin@piagetcoe.edu.ng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowToApplyPage;
