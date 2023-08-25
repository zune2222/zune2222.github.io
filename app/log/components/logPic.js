import logBooks from "../../../src/img/logBooks.png";
import Image from "next/image";
export default function LogPic() {
  return (
    <>
      <div className="flex flex-row absolute w-full z-1 h-auto">
        <div className="flex z-0 bg-slate-700">
          <Image className="h-auto w-full" src={logBooks}></Image>
        </div>
      </div>
    </>
  );
}
