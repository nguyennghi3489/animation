import { useEffect, useRef, useState } from "react";
import "./App.css";
import { VIDEO_AUDIO_MAP } from "./data";

function detectMob() {
  return window.innerWidth <= 800 && window.innerHeight <= 600;
}

function App() {
  const [preloadHomeVideo, setPreloadHomeVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isKeyDownRef = useRef(false);
  let db = useRef<any>(null);

  const fetchHomeVideo = async () => {
    const data = await fetch("video/Homepage.mp4");
    await data.blob();
    console.log(data);
    setTimeout(() => {
      setPreloadHomeVideo(false);
    }, 1000);
  };

  const prefetchVideos = () => {
    for (let key in VIDEO_AUDIO_MAP) {
      const videoRequest = fetch(
        VIDEO_AUDIO_MAP[key as keyof typeof VIDEO_AUDIO_MAP].video
      ).then((response) => response.blob());
      videoRequest.then((blob) => {
        const request = indexedDB.open("videosDB", 3);

        request.onsuccess = (event: any) => {
          db.current = event.target.result;
          const transaction = db.current.transaction(["videos"]);
          const objectStore = transaction.objectStore("videos");
          objectStore.transaction.oncomplete = (event: any) => {
            const videoObjectStore = db.current
              .transaction("videos", "readwrite")
              .objectStore("videos");
            videoObjectStore.add({ name: key, blob: blob });
          };
        };

        request.onupgradeneeded = (event: any) => {
          const db = event.target.result;
          db.createObjectStore("videos", {
            keyPath: "name",
          });
        };
      });
    }
  };

  const handleKeyPress = (ev: any) => {
    if (isKeyDownRef.current) {
      return;
    }
    isKeyDownRef.current = true;
    const key = ev.key as keyof typeof VIDEO_AUDIO_MAP;
    const listCharacter = Object.keys(VIDEO_AUDIO_MAP) as [
      keyof typeof VIDEO_AUDIO_MAP
    ];
    if (!listCharacter.includes(key)) {
      return;
    }
    if (db && db.current) {
      const transaction = db.current.transaction(["videos"]);
      const objectStore = transaction.objectStore("videos");
      const test = objectStore.get(key);
      test.onerror = (event: any) => {
        console.log("error");
      };
      test.onsuccess = (event: any) => {
        if (videoRef && videoRef.current) {
          videoRef.current.setAttribute(
            "src",
            window.URL.createObjectURL(test.result.blob)
          );
          if (audioRef && audioRef.current) {
            const audio =
              VIDEO_AUDIO_MAP[key as keyof typeof VIDEO_AUDIO_MAP].audio;
            audioRef.current.setAttribute("src", audio);
          }
        }
      };
    }
  };

  const reset = () => {
    isKeyDownRef.current = false;
    if (db && db.current) {
      const transaction = db.current.transaction(["videos"]);
      const objectStore = transaction.objectStore("videos");
      const test = objectStore.get("intro");
      test.onerror = (event: any) => {
        console.log("error");
      };
      test.onsuccess = (event: any) => {
        if (videoRef && videoRef.current) {
          videoRef.current.setAttribute(
            "src",
            window.URL.createObjectURL(test.result.blob)
          );
          if (audioRef && audioRef.current) {
            audioRef.current.setAttribute(
              "src",
              VIDEO_AUDIO_MAP["intro"].audio
            );
          }
        }
      };
    }
  };

  useEffect(() => {
    if (!detectMob()) {
      fetchHomeVideo();
      prefetchVideos();
      window.addEventListener("keydown", handleKeyPress, false);
      window.addEventListener("keyup", reset, false);
    } else {
      if (videoRef && videoRef.current) {
        videoRef.current.setAttribute("style", "display:none;");
        if (audioRef && audioRef.current) {
          audioRef.current.setAttribute("style", "display:none;");
        }
      }
    }
  }, []);

  return (
    <div className="App">
      {!preloadHomeVideo ? (
        <video
          width="100%"
          height="100%"
          controls={false}
          loop
          muted
          autoPlay
          preload="auto"
          ref={videoRef}
        >
          <source src="video/Homepage.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="loadingScreen">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <audio
        controls={true}
        loop={true}
        autoPlay={true}
        ref={audioRef}
        className="audio"
      >
        <source src="audio/homepage2.mp3" />
      </audio>
    </div>
  );
}

export default App;
