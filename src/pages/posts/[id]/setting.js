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
      <h1>Setting page</h1>
      <h1>{id}</h1>
      <input
        placeholder="Add post name"
        defaultValue={postData?.postname}
        onChange={(e) => setPostName(e.target.value)}
        className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-[#475467] focus:outline-none focus:ring-0 dark:bg-black dark:text-white border"
      />
      <button onClick={handleSaveClick}>Save Changes</button>
    </>
  );
}
