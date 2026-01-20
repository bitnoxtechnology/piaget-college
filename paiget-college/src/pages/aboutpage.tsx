import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Abouthero from "../components/about/abouthero";
import MissionVisionPhilosophy from "../components/about/missionvisionphilosophy";
import CoreValues from "../components/about/corevalues";
import Objectives from "../components/about/objectives";
import Uniqueness from "../components/about/uniqueness";
import Meta from "../components/Meta";
function aboutpage() {
  return (
    <div className="Aboutpage-container">
      <Meta
        title="About Piaget College | Mission, Vision & Values"
        description="Learn about Piaget College of Education's mission, vision, core values, objectives, and what makes us unique. Discover our commitment to quality education and student success."
        keywords="about Piaget College, mission, vision, core values, objectives, education institution, Abeokuta"
      />
      <Navbar />
      <Abouthero />
      <Objectives />
      <MissionVisionPhilosophy />
      <CoreValues />
      <Uniqueness />
      <Footer />
    </div>
  );
}

export default aboutpage;
