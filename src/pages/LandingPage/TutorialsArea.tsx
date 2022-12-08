import VideoPreview from "../../assets/images/Video.svg"
// import YouTube from "react-youtube"
import { useState } from "react"
import { useEffect } from "react"
import landingServive from "../../services/landingService"

const TutorialsArea = () => {
  const [tutorialsList, setTutorialsList] = useState([])
  const [selectedNumber, setSelectedNumber] = useState(0)
  // const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    const fetchTutorialsList = () => {
      // landingServive.getTutorialsList().then((res) => {
      //   setTutorialsList(
      //     res.map((el) => {
      //       var videoid = el.video_url.match(
      //         /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
      //       )

      //       return {
      //         ...el,
      //         video_url: videoid ? videoid?.[1] : null,
      //       }
      //     })
      //   )
      //   // setSelectedVideo(res.video_url)
      // })
    }

    fetchTutorialsList()
  }, [])

  return (
    <div className="videos-section container" id="tutorials">
      <div className="side">
        <h2 className="small-title">Метод работы в Kiber</h2>
        <p className="text">
          С системой Kiber Вы легко можете освоить работу с ним, т.к. она
          удобная для зрительного восприятия и понятный интерфейс. В случае
          возникновения вопросов можете дополнительно получить в Телеграм-группе
          «Kiber — вопросы и ответы». А для пользователей тарифа "Платный"
          доступны индивидуальные консультации наших специалистов.
        </p>
        <div className="nav-block">
          {tutorialsList?.map((tutorial, index) => (
            <div
              onClick={() => setSelectedNumber(index)}
              className={`nav-element ${selectedNumber === index && "active"} `}
            >
              {index + 1}
            </div>
          ))}

          {/* <div className="nav-element active">2</div>
          <div className="nav-element">3</div>
          <div className="nav-element">4</div>
          <div className="nav-element">5</div>
          <div className="nav-element">6</div>
          <div className="nav-element">7</div>
          <div className="nav-element">8</div> */}
        </div>
      </div>
      <div className="side">
        {/* <YouTube videoId={tutorialsList?.[selectedNumber]?.video_url ?? null} /> */}
      </div>
    </div>
  )
}

export default TutorialsArea
