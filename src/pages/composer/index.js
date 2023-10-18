import Image from "next/image";

const Homepage = () => {
  return (
    <>
      <div className="bg-[#fff] p-4 flex justify-between items-center border-b border-[#E8E8E8]">
        <div className="flex items-center">
          <Image
            src="/images/cwsuite-logo.png"
            alt="Logo"
            height={20}
            width={140}
            
          />
        </div>
        <div className="flex items-center">
          <Image
            src="/images/navicon.png"
            alt="Image Logo"
            height={4}
            width={4}
            className="w-4 h-4 mr-2"
          />
          <span className="text-[#0C173A] font-semibold">Rachel Green</span>
        </div>
      </div>
      <div className="border-t border-[#E8E8E8] relative">
        <div className="text-center p-[65px] font-inter text-[#101828] text-[30px] font-bold leading-36 tracking-normal">
          <p>Create New</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
          <div className="w-[317.86px] h-[398px] bg-white shadow-lg rounded-[13px] border border-gray-300">
            <div className="relative flex p-4">
              <Image
                alt="image"
                src="/images/card-1logo.webp"
                height={40}
                width={40}
              />
              <div className="font-inter text-[#0C173A] text-[18px] font-[600] ml-2 ">
                Apps
                <p className="font-inter text-[#0C173A] text-[13px] font-[600]">
                  Web, Mobile, etc.
                </p>
              </div>
            </div>
            <div>
              <Image
                alt="image"
                src="/images/card-2img.webp"
                height={211}
                width={100}
                className="w-full p-4"
              />

              <div className="font-noto-sans text-[#475467] text-base font-normal leading-5 text-center">
                Drag and drop elements to design, customize, and deploy
                functional apps
              </div>
            </div>
          </div>
          <div className="w-[317.86px] h-[398px] bg-white shadow-lg rounded-[13px] border border-gray-300">
            <div className="relative flex p-4">
              <Image
                alt="image"
                src="/images/card-2logo.webp"
                height={40}
                width={40}
              />
              <div className="font-inter text-[#0C173A] text-[18px] font-[600] ml-2 ">
                Sites
                <p className="font-inter text-[#0C173A] text-[13px] font-[600]">
                  Website, Blog, etc.
                </p>
              </div>
            </div>
            <div>
              <Image
                alt="image"
                src="/images/card2-img.webp"
                height={211}
                width={100}
                className="w-full p-4"
              />

              <div className="font-noto-sans text-[#475467] text-base font-normal leading-5 text-center">
                Create and design websites with pre-designed templates and
                customizable elements
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
