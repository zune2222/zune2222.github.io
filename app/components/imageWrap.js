import Image from "next/image";

export default function ImageWrap(props) {
  return <Image src={props.src} alt={props.alt} />;
}
