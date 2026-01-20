"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Meta from "@/components/Meta";
import { CheckCircle, AlertCircle, BookOpen } from "lucide-react";

const EntryRequirementsPage = () => {
  return (
    <div className="bg-light-850!">
      <Meta
        title="Entry Requirements | Piaget College Admissions"
        description="Discover the admission requirements for NCE and Pre-NCE programs at Piaget College of Education. Learn about WAEC/NECO scores, JAMB requirements, and eligibility criteria."
        keywords="entry requirements, admission criteria, NCE admission, JAMB, WAEC, NECO, education requirements"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary-100 to-primary-200 py-16! md:py-24! px-4! md:px-6! mt-17.5! md:mt-20!">
        <div className="max-w-6xl mx-auto!">
          <h1 className="text-4xl! md:text-5xl! font-bold text-white mb-4!">
            Entry Requirements
          </h1>
          <p className="text-lg! text-secondary-200 max-w-2xl">
            Discover the admission criteria for our NCE programs at Piaget
            College of Education
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12! md:py-16! px-4! md:px-6!">
        <div className="max-w-6xl mx-auto!">
          {/* General Requirements */}
          <div className="mb-12!">
            <div className="flex items-center gap-3! mb-6!">
              <BookOpen size={32} className="text-primary-100" />
              <h2 className="text-3xl! font-bold text-primary-100">
                General NCE Requirements
              </h2>
            </div>

            <div className="space-y-4! bg-white rounded-lg p-6! md:p-8! shadow-sm">
              {/* Requirement 1 */}
              <div className="pb-4! border-b last:border-b-0">
                <div className="flex gap-3! items-start">
                  <CheckCircle
                    size={24}
                    className="text-green-600 flex-shrink-0 mt-1!"
                  />
                  <div>
                    <h3 className="text-lg! font-semibold text-primary-100 mb-2!">
                      Senior Secondary School Certificate
                    </h3>
                    <p className="text-text-primary">
                      A senior secondary school certificate (SSC), WAEC, NECO or
                      GCE 'O' Level, NABTEB and any other equivalent with{" "}
                      <span className="font-semibold">Four (4) credits</span> at
                      one or two sittings. Two of the credits must be relevant
                      to the course you wish to offer. Credits in English and/or
                      Mathematics may be required in some courses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 2 */}
              <div className="pb-4! border-b last:border-b-0">
                <div className="flex gap-3! items-start">
                  <CheckCircle
                    size={24}
                    className="text-green-600 flex-shrink-0 mt-1!"
                  />
                  <div>
                    <h3 className="text-lg! font-semibold text-primary-100 mb-2!">
                      Grade II Teacher Certificate (TC II)
                    </h3>
                    <p className="text-text-primary">
                      A Grade II Teacher Certificate (TC II) with credit or
                      merit in{" "}
                      <span className="font-semibold">five subjects</span>, two
                      of which must be relevant to the course you wish to offer.
                      Credit/merit in English Language and/or Mathematics may be
                      required in some courses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 3 */}
              <div className="pb-4! border-b last:border-b-0">
                <div className="flex gap-3! items-start">
                  <CheckCircle
                    size={24}
                    className="text-green-600 flex-shrink-0 mt-1!"
                  />
                  <div>
                    <h3 className="text-lg! font-semibold text-primary-100 mb-2!">
                      Pre-NCE Final Examinations
                    </h3>
                    <p className="text-text-primary">
                      Successful candidates in the Pre-NCE final examinations
                      who in addition to taking and succeeding in a selection
                      examination organized by an accredited matriculation body
                      would also be qualified for admission.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 4 */}
              <div className="pb-4! border-b last:border-b-0">
                <div className="flex gap-3! items-start">
                  <CheckCircle
                    size={24}
                    className="text-green-600 flex-shrink-0 mt-1!"
                  />
                  <div>
                    <h3 className="text-lg! font-semibold text-primary-100 mb-2!">
                      Pre-NCE Admission Criteria
                    </h3>
                    <p className="text-text-primary">
                      For Pre-NCE admission, a minimum of{" "}
                      <span className="font-semibold">
                        3 credits and 2 passes
                      </span>{" "}
                      is required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 5 */}
              <div className="pb-4! border-b last:border-b-0">
                <div className="flex gap-3! items-start">
                  <CheckCircle
                    size={24}
                    className="text-green-600 flex-shrink-0 mt-1!"
                  />
                  <div>
                    <h3 className="text-lg! font-semibold text-primary-100 mb-2!">
                      Selection Examination
                    </h3>
                    <p className="text-text-primary">
                      All candidates wishing to be considered for admission must
                      write and pass the selection examination organized by an
                      accredited body such as JAMB at a{" "}
                      <span className="font-semibold">
                        satisfactory grade score
                      </span>{" "}
                      level.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 6 */}
              <div>
                <div className="flex gap-3! items-start">
                  <AlertCircle
                    size={24}
                    className="text-primary-200 flex-shrink-0 mt-1!"
                  />
                  <div>
                    <h3 className="text-lg! font-semibold text-primary-100 mb-2!">
                      Additional Tests and Interviews
                    </h3>
                    <p className="text-text-primary">
                      It should be noted that some schools and the college may,
                      in addition to all of the above, administer their own
                      tests and/or interviews for some courses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Requirements */}
          <div>
            <div className="flex items-center gap-3! mb-6!">
              <BookOpen size={32} className="text-primary-100" />
              <h2 className="text-3xl! font-bold text-primary-100">
                Additional Admission Requirements by Department
              </h2>
            </div>

            <div className="space-y-6!">
              {/* Department of Social Sciences */}
              <div className="bg-white rounded-lg p-6! md:p-8! shadow-sm">
                <h3 className="text-2xl! font-bold text-primary-100 mb-4!">
                  Department of Social Sciences
                </h3>

                <div className="ml-4!">
                  <div className="pb-4!">
                    <h4 className="text-xl! font-semibold text-secondary-500 mb-3!">
                      🔹 Christian Religious Knowledge (CRS)
                    </h4>
                    <div className="flex gap-3! items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 flex-shrink-0 mt-0.5!"
                      />
                      <p className="text-text-primary">
                        Without prejudice to the general admission requirements,
                        candidates with relevant diploma from the seminaries or
                        Certificate in Theology from recognized institutions may
                        be considered for admission after clearance from the
                        Commission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department of Sciences */}
              <div className="bg-white rounded-lg p-6! md:p-8! shadow-sm">
                <h3 className="text-2xl! font-bold text-primary-100 mb-4!">
                  Department of Sciences
                </h3>

                <div className="ml-4! space-y-6!">
                  {/* Biology */}
                  <div className="pb-6! border-b last:border-b-0">
                    <h4 className="text-xl! font-semibold text-secondary-500 mb-3!">
                      🔹 Biology (BIO)
                    </h4>
                    <div className="flex gap-3! items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 flex-shrink-0 mt-0.5!"
                      />
                      <p className="text-text-primary">
                        Pre-NCE candidates should have a minimum of{" "}
                        <span className="font-semibold">2.0 GPA</span> before
                        transiting to read Biology at NCE level.
                      </p>
                    </div>
                  </div>

                  {/* Integrated Science */}
                  <div>
                    <h4 className="text-xl! font-semibold text-secondary-500 mb-3!">
                      🔹 Integrated Science (SINGLE MAJOR: NCE)
                    </h4>
                    <div className="space-y-3!">
                      <p className="text-text-primary">
                        Candidates wishing to study Integrated Science at NCE
                        level must satisfy the general admission requirements.
                        The credit pass must be from any two of the following
                        groups:
                      </p>

                      <div className="bg-light-800 p-4! rounded-lg ml-0!">
                        <div className="space-y-2!">
                          <div className="flex gap-3! items-start">
                            <span className="text-primary-100 font-bold">
                              a)
                            </span>
                            <span className="text-text-primary">Biology</span>
                          </div>
                          <div className="flex gap-3! items-start">
                            <span className="text-primary-100 font-bold">
                              b)
                            </span>
                            <span className="text-text-primary">Physics</span>
                          </div>
                          <div className="flex gap-3! items-start">
                            <span className="text-primary-100 font-bold">
                              c)
                            </span>
                            <span className="text-text-primary">Chemistry</span>
                          </div>
                          <div className="flex gap-3! items-start">
                            <span className="text-primary-100 font-bold">
                              d)
                            </span>
                            <span className="text-text-primary">
                              General Science/Integrated Science
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-text-primary text-sm! italic">
                        For candidates with Senior Secondary School Certificate
                        or GCE 'O' Level: the credit pass must be from any two
                        of the above groups.
                      </p>
                      <p className="text-text-primary text-sm! italic">
                        For candidates with Grade II Certificate: the credit or
                        merit passes must be from any two of the above groups.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="mt-12! bg-secondary-200 border-l-4 border-primary-100 p-6! md:p-8! rounded-r-lg">
            <div className="flex gap-3! items-start">
              <AlertCircle
                size={24}
                className="text-primary-100 flex-shrink-0 mt-1!"
              />
              <div>
                <h3 className="text-lg! font-semibold text-primary-100 mb-2!">
                  Important Note
                </h3>
                <p className="text-text-primary">
                  These are the minimum entry requirements for admission to
                  Piaget College of Education. Applicants are encouraged to
                  verify all requirements before submitting their applications.
                  The college reserves the right to conduct additional screening
                  procedures including written examinations, practical tests,
                  and interviews as deemed necessary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EntryRequirementsPage;
