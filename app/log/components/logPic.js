import logBooks from "../../../src/img/logBooks.png";
import Image from "next/image";
export default function LogPic() {
  return (
    <>
      <div className="bg-red-50 flex-row w-full z-1 h-auto">
        <div className="flex z-0">
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
