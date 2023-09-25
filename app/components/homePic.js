import Lottie from "react-lottie-player";
import snowingLottile from "../../src/lottie/snowingLottie.json";
import Image from "next/image";
import Logo from "../../src/img/logo.png";
import mainLogo from "../../src/img/mainSnowing.png";
import Link from "next/link";
import { appleFontEB } from "../components/fontZip";
import CardHover from "./cardHover";
export default function HomePic() {
  return (
    <>
      <div className="flex flex-row absolute w-full z-1 h-auto">
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
        <Image alt="main logo" className="h-auto w-full" src={mainLogo}></Image>
      </div>
      <div className="mt-10 flex w-full h-auto z-2 flex flex-col items-center justify-center">
        <CardHover className="cursor-pointer">
          <Link
            href={
              "https://zune2222.notion.site/Pak-Jun-Yi-2c6ae27311c94be48543fc00c0ea861a?pvs=4"
            }
            target="_blank"
            passHref
          >
            <Image
              alt="logo"
              className="toc-class opacity-0 translate-y-6 w-56 h-56 rounded-3xl shadow-2xl"
              src={Logo}
            ></Image>
          </Link>
        </CardHover>
      </div>
    </>
  );
}
