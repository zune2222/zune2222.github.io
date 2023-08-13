import Lottie from "react-lottie-player";
import snowingLottile from "../../src/lottie/snowingLottie.json";
import Image from "next/image";
import mainLogo from "../../src/img/mainSnowing.png";
export default function HomePic() {
  return (
    <>
      <div className="flex flex-row absolute w-full z-10 h-auto">
        <Lottie
          className="flex-auto w-full h-auto"
          loop
          animationData={snowingLottile}
          play
        ></Lottie>
        <Lottie
          className="flex-auto w-full h-auto"
          loop
          animationData={snowingLottile}
          play
        ></Lottie>
        <Lottie
          className="flex-auto w-full h-auto"
          loop
          animationData={snowingLottile}
          play
        ></Lottie>
      </div>
      <div className="absolute z-0 bg-slate-700">
        <Image className="h-auto w-full" src={mainLogo}></Image>
      </div>
    </>
  );
}
