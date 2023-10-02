import logBooks from "../../../src/img/memoryLogo2.png";
import Image from "next/image";
export default function MemoryPic() {
  return (
    <>
      <div className="flex-row w-full z-1 h-auto">
        <div className="mt-5 flex z-0">
          <Image
            placeholder="blur"
            alt="BooksLog"
            className="h-auto w-full"
            src={logBooks}
          ></Image>
        </div>
      </div>
    </>
  );
}
