import "../styles/youtubevideo.css"

const YouTubeVideo = () => {
  return (
    <section className="youtube-section">
      <div className="youtube-container">
        <h2 className="youtube-section-title">See Piaget in Action</h2>

        <div className="video-wrapper">
          <iframe
            width="100%"
            src="https://www.youtube.com/embed/KedxZzER3g8"
            title="Piaget College Video"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="youtube-player"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default YouTubeVideo
