import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "./App.css";
import { NUMBER_TO_CHARACTER_LIST, VIDEO_AUDIO_MAP } from "./data";

function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function App() {
  const [preloadHomeVideo, setPreloadHomeVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isKeyDownRef = useRef(false);
  let db = useRef<any>(null);

  const fetchHomeVideo = async () => {
    const data = await fetch("video/Homepage.mp4");
    const blob = await data.blob();
    if (videoRef && videoRef.current) {
      videoRef.current.setAttribute("src", window.URL.createObjectURL(blob));
      setPreloadHomeVideo(false);
    }
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
          audioRef.current.setAttribute("style", "visibilty:hidden;");
        }
      }
    }
  }, []);

  const images = [
    {
      original: "images/Homepage.gif",
      originalClass: "image",
    },
    {
      original: "images/A_art_nouveau.gif",
      originalClass: "image",
    },
    {
      original: "images/B_bauhaus.gif",
      originalClass: "image",
    },
    {
      original: "images/C_cubism.gif",
      originalClass: "image",
    },
    {
      original: "images/D_dadaism.gif",
      originalClass: "image",
    },
    {
      original: "images/E_expressionism.gif",
      originalClass: "image",
    },
    {
      original: "images/F_fauvism.gif",
      originalClass: "image",
    },
    {
      original: "images/G_glass_painting.gif",
      originalClass: "image",
    },
    {
      original: "images/H_handrawing.gif",
      originalClass: "image",
    },
    {
      original: "images/I_impressionism.gif",
      originalClass: "image",
    },
    {
      original: "images/J_japonism.gif",
      originalClass: "image",
    },
    {
      original: "images/K_kawaii.gif",
      originalClass: "image",
    },
    {
      original: "images/L_lofi.gif",
      originalClass: "image",
    },
    {
      original: "images/M_mosaic.gif",
      originalClass: "image",
    },
    {
      original: "images/N_nostalgia.gif",
      originalClass: "image",
    },
    {
      original: "images/O_op_art.gif",
      originalClass: "image",
    },
    {
      original: "images/P_Psychedelia.gif",
      originalClass: "image",
    },
    {
      original: "images/Q_queencore.gif",
      originalClass: "image",
    },
    {
      original: "images/R_retro_futurism.gif",
      originalClass: "image",
    },
    {
      original: "images/S_surrealism.gif",
      originalClass: "image",
    },
    {
      original: "images/T_textile.gif",
      originalClass: "image",
    },
    {
      original: "images/U_utopia.gif",
      originalClass: "image",
    },
    {
      original: "images/V_vaporwave.gif",
      originalClass: "image",
    },
    {
      original: "images/W_woodcut.gif",
      originalClass: "image",
    },
    {
      original: "images/X_xenomorph.gif",
      originalClass: "image",
    },
    {
      original: "images/Y_Y2K.gif",
      originalClass: "image",
    },
    {
      original: "images/Z_zine.gif",
      originalClass: "image",
    },
  ];

  const hanldeSlide = (index: any) => {
    const key = NUMBER_TO_CHARACTER_LIST[index];
    if (audioRef && audioRef.current) {
      const audio = VIDEO_AUDIO_MAP[key as keyof typeof VIDEO_AUDIO_MAP].audio;
      console.log(audio);
      audioRef.current.setAttribute("src", audio);
      audioRef.current.play();
    }
  };

  return (
    <div className="App">
      <video
        style={{ position: "relative", zIndex: preloadHomeVideo ? 10 : 1000 }}
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
      <div className="gallery">
        <ImageGallery
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
          onSlide={hanldeSlide}
        />
      </div>
      <div
        className="loadingScreen"
        style={{ display: preloadHomeVideo ? "flex" : "none" }}
      >
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
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
