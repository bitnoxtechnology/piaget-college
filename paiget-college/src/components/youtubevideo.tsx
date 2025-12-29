import "../styles/youtubevideo.css"

const YouTubeVideo = () => {
  return (
    <section className="youtube-section">
      <div className="youtube-container">
        <h2 className="youtube-section-title">Featured Video</h2>

        <div className="video-wrapper">
          <iframe
            width="100%"
            height="600"
            src="https://www.youtube.com/embed/KedxZzER3g8"
            title="Piaget College Video"
            frameBorder="0"
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
