import React, { useEffect, useRef } from "react";
import "./App.css";

const videoMap = {
  intro: "M_multiverse_of_sadness.mp4",
  a: "A_art_nouveau.mp4",
  b: "B_bauhaus.mp4",
  c: "C_cubism.mp4",
  d: "D_dadaism.mp4",
  e: "E_expressionism.mp4",
  f: "F_fauvism.mp4",
  g: "G_glass_painting.mp4",
  h: "H_handrawing.mp4",
  i: "I_impressionism.mp4",
  j: "J_japonism.mp4",
  k: "K_kawaii.mp4",
  l: "L_lofi.mp4",
  m: "M_mosaic.mp4",
  n: "N_nostagia.mp4",
  o: "O_op_art.mp4",
  p: "P_Psychedelic.mp4",
  q: "Q_queencore.mp4",
  r: "R_retro_futurism.mp4",
  s: "S_surrealism.mp4",
  t: "T_textile.mp4",
  u: "U_utopia.mp4",
  v: "V_Vaporwave.mp4",
  w: "W_woodcut.mp4",
  x: "X_xenomorph.mp4",
  y: "Y_y2k.mp4",
  z: "Z_zine.mp4",
};

const audioMap = {
  intro: "M_multiverse_of_sadness.mp4",
  a: "A_art_nouveau.mp4",
  b: "B_bauhaus.mp4",
  c: "C_cubism.mp4",
  d: "D_dadaism.mp4",
  e: "E_expressionism.mp4",
  f: "F_fauvism.mp4",
  g: "G_glass_painting.mp4",
  h: "H_handrawing.mp4",
  i: "I_impressionism.mp4",
  j: "J_japonism.mp4",
  k: "K_kawaii.mp4",
  l: "L_lofi.mp4",
  m: "M_mosaic.mp4",
  n: "N_nostagia.mp4",
  o: "O_op_art.mp4",
  p: "P_Psychedelic.mp4",
  q: "Q_queencore.mp4",
  r: "R_retro_futurism.mp4",
  s: "S_surrealism.mp4",
  t: "T_textile.mp4",
  u: "U_utopia.mp4",
  v: "V_Vaporwave.mp4",
  w: "W_woodcut.mp4",
  x: "X_xenomorph.mp4",
  y: "Y_y2k.mp4",
  z: "Z_zine.mp4",
};
function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isKeyDownRef = useRef(false);
  let db = useRef<any>(null);

  const prefetchVideos = () => {
    for (let key in videoMap) {
      const videoRequest = fetch(videoMap[key as keyof typeof videoMap]).then(
        (response) => response.blob()
      );
      videoRequest.then((blob) => {
        const request = indexedDB.open("videosDB", 3);

        request.onsuccess = (event: any) => {
          db.current = event.target.result;
          console.log(key);
          const transaction = db.current.transaction(["videos"]);
          const objectStore = transaction.objectStore("videos");
          objectStore.transaction.oncomplete = (event: any) => {
            console.log(key);
            console.log("key complete");
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
    const key = ev.key as keyof typeof videoMap;
    const listCharacter = Object.keys(videoMap) as [keyof typeof videoMap];
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
        }
      };
    }
  };

  useEffect(() => {
    console.log("START PREFETCH");
    prefetchVideos();
    window.addEventListener("keydown", handleKeyPress, false);
    window.addEventListener("keyup", reset, false);
  }, []);

  return (
    <div className="App">
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
        <source src="M_multiverse_of_sadness.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default App;
