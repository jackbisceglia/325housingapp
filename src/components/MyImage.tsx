import Image from "next/image";

type MyImagePropTypes = {
  src: string;
  alt: string;
  className?: string;
};

const MyImage = ({ src, alt, className = "" }: MyImagePropTypes) => {
  return (
    <div className={`relative  ${className} `}>
      <Image
        className=" drag- select-none rounded-md border-4 border-marooon-700"
        src={src}
        alt={alt}
        layout="fill"
      />
    </div>
  );
};

export default MyImage;
