import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import addUser from "../../lib/helper";

const Posts = () => {

  // console.log("data====================== from new2=>",data)
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [PostsData, setPostsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const id = uuidv4();
  // console.log("dataaaaaaaaaaaa=>", data)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeToggle = () => {
    setIsOpen(false);
  };

  const newpostClicked = () => {
    router.push("/composer/new3");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cw-webadmin.vercel.app/api/users");
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
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            fill="black"
          ></path>
        </svg>
      </button>
      <div className="flex">
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-64"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-[#E5E5E5] text-[#000]">
            <div className="h-full px-3 py-4 overflow-y-auto bg-[#E5E5E5] text-[#000]">
              <div className="flex items-center">
                <Image
                  src="/images/cwsuite-logo.png"
                  alt="Logo"
                  height={20}
                  width={140}
                />
                <button
                  onClick={closeToggle}
                  className="ml-auto block sm:hidden"
                >
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

              <div className="mt-[20em]">
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
                      <span className=" ml-1 text-[#0A0213] font-inter text-[13px] font-medium">
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
          </div>
        </aside>
        <div className="w-full sm:ml-64">
          {PostsData ? (
            <div>
              {/* Content based on data */}
              <div className="flex justify-between p-4 mt-[10px]">
                <div className="font-inter text-2xl font-semibold leading-6 text-left text-[#101828]">
                  All Posts
                </div>
                <button
                  onClick={() =>
                    startTransition(async () => {
                      const pagename = uuidv4();
                      const title = "";
                      const description = "";
                      try {
                        const result = await addUser({
                          data: {},
                          pagename,
                          title,
                          description,
                        });
                        console.log("result ===>", result);
                      } catch (error) {
                        console.error("Failed data:", error);
                      }
                      router.push(`/posts/${pagename}`);
                    })
                  }
                  className="flex h-8 w-36 items-center justify-center bg-[#89B710] text-[#fff] rounded-lg"
                >
                  Create New Post
                </button>
              </div>
              {/* <div className="flex flex-wrap p-[70px]">
                {data.map((data, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                  >
                    <Link href={`/posts/${data.pagename}`}>
                      <div className="border border-[#E4E7EC] w-full rounded-lg">
                        <div className="bg-white shadow-lg rounded-lg flex flex-col h-64">
                          <div className="bg-[#F4F4F4] h-32 w-full flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full border border-[#EAEAEA] flex items-center justify-center">
                              <Image
                                src="/images/image_icon.png"
                                alt={`Post ${index}`}
                                height={20}
                                width={20}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="p-2">
                            <h2 className="text-lg font-semibold text-gray-900" style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                maxWidth: "100%", // Set the max width to control the element's width
                              }}>
                              {data.title}
                            </h2>
                          </div>
                          <div className="p-2">
                            <h2 className="text-sm font-inter  text-gray-900" style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                maxWidth: "100%", // Set the max width to control the element's width
                              }}>
                              {data.description}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div> */}
              <div className="flex flex-wrap p-[70px]">
                {PostsData.map((data, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                  >
                   <div className="border border-[#E4E7EC] w-full rounded-lg">
                      <div className="bg-white shadow-lg rounded-lg flex flex-col h-72">
                        <Link href={`/posts/${data.pagename}`}>
                          <div className="bg-[#F4F4F4] h-32 w-full flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full border border-[#EAEAEA] flex items-center justify-center">
                              <Image
                                src="/images/image_icon.png"
                                alt={`Post ${index}`}
                                height={20}
                                width={20}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="p-2">
                            {data.title ? (
                              <h2
                                className="text-lg font-semibold text-gray-900"
                                style={{
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  maxWidth: "100%", // Set the max width to control the element's width
                                }}
                              >
                                {data.title}
                              </h2>
                            ) : (
                              <div style={{ height: "1rem" }}></div> // Empty space placeholder
                            )}
                          </div>
                          <div className="p-2">
                            {data.description ? (
                              <h2 className="text-sm font-inter text-gray-900">
                                {data.description}
                              </h2>
                            ) : (
                              <div style={{ height: "1rem" }}></div> // Empty space placeholder
                            )}
                          </div>
                          <div className="p-2">
                            {data.isPublished === true ? (
                              <h2 className="text-sm font-bold font-inter text-gray-900">
                                Published
                              </h2>
                            ) : (
                              <div className="text-sm font-bold font-inter text-gray-900" style={{ height: "1rem" }}>Unpublished</div> // Empty space placeholder
                            )}
                          </div>
                        </Link>
                        <Link
                          href={`/post/${data.pagename}`}
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: "100%", // Set the max width to control the element's width
                          }}
                          className="bg-gray-200 rounded-md mt-1"
                        >
                          cw-webadmin.vercel.app/{data.pagename}
                        </Link>
                      </div>
                    </div>

                    {/* <Link
                      href={` https://cw-webadmin.vercel.app/post?${data.pagename}`}
                    >
                      cw-webadmin.vercel.app/{data.pagename}
                    </Link> */}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Content when data is not present */}
              <div className="flex items-center justify-center">
                <div className="p-4 font-inter text-[30px] font-[700] leading-36 tracking-normal pt-28">
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
                  onClick={() =>
                    startTransition(async () => {
                      const pagename = uuidv4();
                      const title = "";
                      const description = "";
                      try {
                        const result = await addUser({
                          data: {},
                          pagename,
                          title,
                          description,
                        });
                        console.log("result ===>", result);
                      } catch (error) {
                        console.error("Failed data:", error);
                      }
                      router.push(`/posts/${pagename}`);
                    })
                  }
                  className="flex h-8 w-36 items-center justify-center bg-[#89B710] text-[#fff] rounded-lg"
                >
                  Create New Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// export async function getStaticProps() {
//   const response = await fetch("https://cw-webadmin.vercel.app/api/users");
//   let jsonData = await response.json();

//   return {
//     props: {
//       data: jsonData,
//     },
//     revalidate: false,
//   };
// }

export default Posts;
