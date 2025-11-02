import Image from "next/image";

const Loading = () => {
  return (
    <div className='w-full items-center flex text-center mx-auto'>
      <Image
        src='assets/icons/loader.svg'
        width={150}
        height={150}
        alt='loader'
        className='object-contain mx-auto'
      />
    </div>
  );
};

export default Loading;
