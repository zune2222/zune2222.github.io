import Image from "next/image";

export default function ImageWrap(props) {
  return <Image alt="wrap" src={props.src} alt={props.alt} />;
}
