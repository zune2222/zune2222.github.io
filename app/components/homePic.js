import Lottie from "react-lottie-player";
import snowingLottile from "../../src/lottie/snowingLottie.json";
import Image from "next/image";
import Logo from "../../src/img/logo.png";
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
      <div className="flex z-0 bg-slate-700">
        <Image className="h-auto w-full" src={mainLogo}></Image>
      </div>
      <div className="mt-10 flex w-full h-auto z-1 flex flex-col items-center justify-center">
        <Image
          className="w-56 h-56 flex flex-auto shadow-xl shadow-indigo-500/50"
          src={Logo}
        ></Image>
        <h4 className="mt-10">zun2log 아니 폰트 적용 되라고</h4>
      </div>
    </>
  );
}
