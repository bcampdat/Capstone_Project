import React, { useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1724407111224.json";

const Home = () => {
  const animationRef = useRef(null);

  return (
    <div className="min-h-screen flex justify-center items-center lg:mx-48">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Página de inicio</h1>
        
        <div className="flex gap-2 justify-center">
          <button className="bg-amber-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors duration-300"
          >Bienvenido</button>
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
