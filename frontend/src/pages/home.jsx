import React, { useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1724407111224.json";

const Home = () => {
  const animationRef = useRef(null);

  return (
    <div className="min-h-screen flex justify-center items-center lg:mx-48">
      <div className=" dark:text-white">
        <div className="flex gap-2 justify-center">
          <button
            className="bg-sky-300 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-300 transition-colors duration-300"
            onClick={() => {
              window.location.href = "/About";
            }}
          >
            Bienvenido
          </button>
        </div>
      </div>
      <Lottie
        onComplete={() => {
          animationRef.current?.setDirection(-1);
          animationRef.current?.play();
        }}
        lottieRef={animationRef}
        loop={true}
        animationData={animationData}
        style={{ width: 600, height: 600 }}
      />
    </div>
  );
};

export default Home;
