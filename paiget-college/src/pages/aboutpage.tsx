import Footer from "../components/footer"
import Navbar from "../components/navbar"
import Abouthero from "../components/about/abouthero"
import MissionVisionPhilosophy from "../components/about/missionvisionphilosophy"
import CoreValues from "../components/about/corevalues"
import Objectives from "../components/about/objectives"
import Uniqueness from "../components/about/uniqueness"
function aboutpage() {
  return (
    <div className="Aboutpage-container">
        <Navbar />
        <Abouthero />
        <Objectives />
        <MissionVisionPhilosophy/>
        <CoreValues/>
        <Uniqueness/>
        <Footer />
    </div>
  )
}

export default aboutpage