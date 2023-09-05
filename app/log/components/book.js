import CardHover from "../../components/cardHover";
import Image from "next/image";
import { appleFontB } from "../../components/fontZip";
import bookLogo from "../../../src/img/bookLogo.png";
export default function Book({ title: title }) {
  return (
    <CardHover className="cursor-pointer">
      <div className="flex toc-class pl-2 opacity-0 translate-y-6 bg-stone-200 shadow-2xl h-56 w-40 rounded drop-shadow-md">
        <div className="h-full w-5 bg-white "></div>
        <div className="flex-col">
          <div
            className={`text-lg mt-5 mr-1 h-16 w-full text-black text-center items-center justify-center ${appleFontB.className}`}
          >
            {title}
          </div>
          <Image src={bookLogo} className="w-30 h-30 pr-1"></Image>
        </div>
      </div>
    </CardHover>
  );
}
