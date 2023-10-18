import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
const Posts = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [PostsData, setPostsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeToggle = () => {
    setIsOpen(false);
  };

  const newpostClicked = () => {
    router.push("/composer/new3");
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      let jsonData = await response.json();
      setPostsData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#E5E5E5] text-[#000]">
          <div className="flex items-center">
            <Image
              src="/images/cwsuite-logo.png"
              alt="Logo"
              height={20}
              width={140}
            />
            <button onClick={closeToggle} className="ml-auto block sm:hidden">
              Close
            </button>
          </div>
          <ul className="space-y-2 font-inter mt-3 ">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#dedede] group"
              >
                <Image
                  alt="image"
                  src="/images/posts.webp"
                  width={20}
                  height={20}
                />
                <span className="ml-3 text-[#0A0213]">Posts</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#dedede] group"
              >
                <Image
                  alt="image"
                  src="/images/pages.webp"
                  width={20}
                  height={20}
                />
                <span className="flex-1 ml-3 whitespace-nowrap text-[#0A0213]">
                  Pages
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#dedede] group"
              >
                <Image
                  alt="image"
                  src="/images/media.webp"
                  width={20}
                  height={20}
                />
                <span className="flex-1 ml-3 whitespace-nowrap text-[#0A0213]">
                  Media
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#dedede] group"
              >
                <Image
                  alt="image"
                  src="/images/setting-icon.webp"
                  width={20}
                  height={20}
                />
                <span className="flex-1 ml-3 whitespace-nowrap text-[#0A0213]">
                  Settings
                </span>
              </a>
            </li>
          </ul>

          <div className="mt-[25em]">
            <ul className="space-y-2 font-inter mt-3 ">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#dedede] group"
                >
                  <Image
                    alt="image"
                    src="/images/cw.webp"
                    width={20}
                    height={20}
                  />
                  <span className="ml-3 text-[#0A0213] font-inter text-[13px] font-medium">
                    www.ajaykumar.com
                  </span>
                  <span className="ml-6">
                    <Image
                      alt="image"
                      src="/images/arrow-up.webp"
                      width={20}
                      height={20}
                    />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#dedede] group"
                >
                  <Image
                    alt="image"
                    src="/images/profile.webp"
                    width={20}
                    height={20}
                  />
                  <span className="ml-3 text-[#0A0213] font-inter text-[13px] font-medium">
                    Ajay Kumar
                  </span>
                  <span className="ml-20">
                    <Image
                      alt="image"
                      src="/images/r-arrow.webp"
                      width={17}
                      height={17}
                    />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <div>
        {isLoading ? (
          <>
            <div className="flex items-center justify-center ">
              <div className="p-4 font-inter text-[30px]  font-[700] leading-36 tracking-normal pt-28 ">
                No Posts Yet
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/no-post.png"
                alt="image"
                height={278}
                width={396}
              />
            </div>
            <div className="flex items-center justify-center font-inter text-[18px] text-[#475467] p-2">
              <p>You do not have any posts yet. Create one to get started</p>
            </div>
            <div className="flex items-center justify-center font-inter text-[13px] p-6">
              <button
                onClick={newpostClicked}
                className="w-168 h-[2px] p-4 rounded-[5px] flex items-center bg-[#89B710] text-[#fff]"
              >
                Create New Post
              </button>
            </div>
          </>
        ) : (
          PostsData && (
            <>
              <div
                className={`fixed top-10 left-[18em] z-40 w-64 h-screen transition-transform ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0`}
              >
                <div className="bg-[#fff] p-4 flex justify-between items-center border-b border-[#E8E8E8]">
                  <div className="flex items-center">
                   All Posts
                  </div>
                  <div className="flex items-center">
                    
                    <Link href="/composer/new3">
                    <span className="text-[#0C173A] font-semibold">
                     Create New Posts
                    </span>
                    </Link>
                    
                  </div>
                </div>
              </div>
              <div className="mt-[10em]">
                {PostsData.map((data) => {
                  return (
                    <>
                    <Link  className="flex items-center justify-center mt-[10px]" 
                    href={`/composer/new3?id=${data._id}`}> 
                    {
                      data._id

                    } 
                    </Link>
                    
                    </>
                  );
                })}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default Posts;
