import logBooks from "../../../src/img/logBooks.png";
import Image from "next/image";
export default function LogPic() {
  return (
    <>
      <div className="flex bg-red-50 flex-row w-full z-1 h-auto">
        <div className="mt-5 flex z-0">
          <Image
            alt="BooksLog"
            className="h-auto w-full"
            src={logBooks}
          ></Image>
        </div>
      </div>
    </>
  );
}
