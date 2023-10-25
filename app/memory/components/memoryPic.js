import memoryTower from "../../../src/img/memoryLogo.png";
import Image from "next/image";
export default function MemoryPic() {
  return (
    <>
      <div className="flex-row w-full z-1 h-auto">
        <div className="flex z-0">
          <Image
            placeholder="blur"
            alt="parisTower"
            className="h-auto w-full"
            src={memoryTower}
          ></Image>
        </div>
      </div>
    </>
  );
}
