import Navbar from "../components/navbar"
import Herosection from "../components/herosection"
import Services from "../components/services"
import Welcome from "../components/welcome"
import ProgrammeInfo from "../components/programmeinfo"
import NewsEvents from "../components/newsevent"
import YouTubeVideo from "../components/youtubevideo"
import Footer from "../components/footer"
function homepage() {
  return (
    <div>
        <Navbar />
        <Herosection />
        <Services />
        <Welcome />
        <ProgrammeInfo />
        <NewsEvents />
        <YouTubeVideo/>
        <Footer />
    </div>
  )
}

export default homepage