import React, { useState } from "react";
import axios from "axios";
import baseLink from "../components/baselink";
import logo from "../assets/video-player.png";
import { ThreeCircles } from "react-loader-spinner";
import "./css/homePage.css";
function HomePage() {
  let [link, SetLink] = useState("");
  let [videos, setvideos] = useState();
  let [loading, setLoading] = useState(false);
  let handelLink = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let { data } = await axios.post(`${baseLink}/api/yt/download`, {
        url: link,
      });
      // console.log(data);
      setvideos(data);
      SetLink("");
      setLoading(false);
    } catch (error) {
      alert("someting went wrong");
      setLoading(false);
    }
  };
  return (
    <div className="home-container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="main">
        <form onSubmit={handelLink}>
          <input
            type="text"
            placeholder="Paste your link"
            value={link}
            onChange={(e) => {
              SetLink(e.target.value);
            }}
          />
          <button type="submit">Download</button>
        </form>
        <div className="videoData">
          {videos ? (
            <>
              <div className="videoDataImage">
                <img src={videos[0].thumbnailUrl} alt="" />
                <p>{videos[0].title}</p>
              </div>
              <div className="downloadList">
                <ul>
                  {videos &&
                    videos.map((item, index) => {
                      return (
                        <>
                          <li>
                            {item.quality ? item.quality : "mp3"}
                            <span className="download-btn">
                              <a
                                href={item.url}
                                download={`${item.title}.${
                                  item.quality ? ".mp4" : ".mp3"
                                }`}
                              >
                                Download
                              </a>
                            </span>
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            </>
          ) : loading ? (
            <>
              <div className="loader">
                <ThreeCircles
                  height="100"
                  width="100"
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
