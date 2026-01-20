import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import WorkshopsHero from "./workshops-hero";
import WorkshopCards from "./workshop-cards";
// import RSVPForm from "./rsvp-form";
import WorkshopGallery from "./workshop-gallery";

function Workshopspage() {
  return (
    <div className="workshops-page">
      <Navbar />
      <WorkshopsHero />
      <WorkshopCards />
      {/* <RSVPForm /> */}
      <WorkshopGallery />
      <Footer />
    </div>
  );
}

export default Workshopspage;
