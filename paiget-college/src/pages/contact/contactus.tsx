"use client";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ContactHero from "./contact-hero";
import ContactInfo from "./contact-info";
import ContactForm from "./contact-form";
import Meta from "../../components/Meta";
import "../../styles/pages/contactus.css";

function ContactUs() {
  return (
    <div className="contact-page">
      <Meta
        title="Contact Us | Piaget College of Education"
        description="Get in touch with Piaget College of Education. Find our contact information, office hours, and reach out to our admissions team with your questions."
        keywords="contact Piaget College, admissions office, phone, email, location, Abeokuta"
      />
      <Navbar />
      <ContactHero />

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactUs;
