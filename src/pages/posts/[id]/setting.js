import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { updateUser } from "../../../lib/helper";

export default function SettingPage() {
  const router = useRouter();
  const { id } = router.query;
  const [postName, setPostName] = useState("");
  const [postData, setPostData] = useState(null);

  const fetchData = async (userId) => {
    if (userId) {
      try {
        const response = await fetch(
          `https://cw-webadmin.vercel.app/api/singleuser?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setPostData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
  };

  const handleSaveClick = async () => {
    const result = await updateUser({ id, postname: postName });
    console.log("Result for updateuser:", result);
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <>
      <h1 className="text-center font-bold text-[2em]">Setting page</h1>
      <div className="p-10">
        <div className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
          <div className="p-8">
            <h1 className=" font-bold text-[1.5em]">Post Slug</h1>
            <div class="mb-6 mt-4">
              <label
                for="default-input"
                class="block mb-2 text-sm  text-gray dark:text-white"
              >
                The slug is the URL-friendly version of the name.It is usually
                all lowercase and contains only letters, numbers, and hyphens.
              </label>
              <input
                placeholder="Add post name"
                defaultValue={postData?.postname}
                onChange={(e) => setPostName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              change the postname from here
            </p>
            <button className="flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10 border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800">
              <p onClick={handleSaveClick}>Save Changes</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
