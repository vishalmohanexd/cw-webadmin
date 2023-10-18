// import { Content } from "next/font/google";
// import { Editor } from "novel";
// import { useEffect, useState } from "react";
// import addUser from "../../../lib/helper";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { updateUser } from "../../../lib/helper";

// const NovelEditor = () => {
//   const router = useRouter();
//   const id = router.query.id;
//   const [saveStatus, setSaveStatus] = useState("Saved");
//   const [editordata, setEditorData] = useState([]);
//   const [PostData, setPostData] = useState(null);

 

//   const fetchData = async (ids) => {
//     if(ids){
//       try {
//         const response = await fetch(
          
//           `https://cw-webadmin.vercel.app/api/singleuser?userId=${ids}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         let jsonData = await response.json();
//         setPostData(jsonData);
//       } catch (error) {
//         console.error(error);
//       }

//     }
   
//   };

//   useEffect(() => {
//     fetchData(id);
//   }, [id]);

//   const backtoPost = () => {
//     localStorage.clear();
//     router.push("/composer/new2");
//     // setPostData("");
//   };

//   return (
//     <>
//       <div className="bg-[#fff] p-4 flex justify-between items-center border-b border-[#E8E8E8] mb-10">
//         <div className="flex items-center">
//           <button onClick={backtoPost}>Back to post</button>
//         </div>
//         <div className="flex items-center">
//           <span
//             className="font-semibold flex h-8 w-36 items-center justify-center bg-[#89B710] text-[#fff] rounded-lg"
//             // onClick={saveData}
//           >
//             Publish
//           </span>
//         </div>
//       </div>

//       {/* {saveStatus} */}
//       {/* <p>{PostData?.pagename}</p><br />
//           <p>{PostData?.title}</p><br />
//        */}

//       {PostData && (
//         <div className="p-8">
//           <div className=" border-b border-[#E8E8E8]">
//             <input
//               type="text"
//               placeholder="Title..."
//               defaultValue={PostData?.title || ""}
//               autoFocus
//               onChange={(e) => updateUser({ id, title: e.target.value })}
//               className="dark:placeholder-text-[#101828] border-none px-0 font-cal text-3xl placeholder:text-[#101828] focus:outline-none focus:ring-0 dark:bg-black dark:text-white font-semibold"
//             />
//             <input
//               placeholder="Write a short description for your blog here"
//               defaultValue={PostData?.description || ""}
//               onChange={(e) => updateUser({ id, description: e.target.value })}
//               className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-[#475467] mt-2 focus:outline-none focus:ring-0 dark:bg-black dark:text-white mb-2"
//             />
//           </div>
//           <div className=" border-t border-[#E8E8E8]">
//             <Editor
//               onUpdate={(content) => {
//                 setEditorData({ ...editordata, data: content.getJSON() });
//                 updateUser({ id, data: content.getJSON() });
//               }}
//               onDebouncedUpdate={() => {
//                 setSaveStatus("Saving...");
//                 setTimeout(() => {
//                   setSaveStatus("Saved");
//                 }, 500);
//               }}
//               defaultValue={PostData.data}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };


// export default NovelEditor;



import { Editor } from "novel";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { updateUser } from "../../../lib/helper";

const NovelEditor = () => {
  const router = useRouter();
  const id = router.query.id;
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [editorData, setEditorData] = useState([]);
  const [postData, setPostData] = useState(null);

  const fetchData = async (ids) => {
    if (ids) {
      try {
        const response = await fetch(
          `https://cw-webadmin.vercel.app/api/singleuser?userId=${ids}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setPostData(jsonData);
      } catch (error) {
        console.error(error);
        // Handle the error gracefully, e.g., set an error state or show a message.
      }
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const backtoPost = () => {
    localStorage.clear();
    router.push("/composer/new2");
  };

  return (
    <>
      <div className="bg-[#fff] p-4 flex justify-between items-center border-b border-[#E8E8E8] mb-10">
        <div className="flex items-center">
          <button onClick={backtoPost}>Back to post</button>
        </div>
        <div className="flex items-center">
          <span
            className="font-semibold flex h-8 w-36 items-center justify-center bg-[#89B710] text-[#fff] rounded-lg"
          >
            Publish
          </span>
        </div>
      </div>

      {postData && (
        <div className="p-8">
          <div className=" border-b border-[#E8E8E8]">
            <input
              type="text"
              placeholder="Title..."
              defaultValue={postData?.title || ""}
              autoFocus
              onChange={(e) => updateUser({ id, title: e.target.value })}
              className="dark:placeholder-text-[#101828] border-none px-0 font-cal text-3xl placeholder:text-[#101828] focus:outline-none focus:ring-0 dark:bg-black dark:text-white font-semibold"
            />
            <input
              placeholder="Write a short description for your blog here"
              defaultValue={postData?.description || ""}
              onChange={(e) => updateUser({ id, description: e.target.value })}
              className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-[#475467] mt-2 focus:outline-none focus:ring-0 dark:bg-black dark:text-white mb-2"
            />
          </div>
          <div className=" border-t border-[#E8E8E8]">
            <Editor
              onUpdate={(content) => {
                setEditorData({ ...editorData, data: content.getJSON() });
                updateUser({ id, data: content.getJSON() });
              }}
              onDebouncedUpdate={() => {
                setSaveStatus("Saving...");
                setTimeout(() => {
                  setSaveStatus("Saved");
                }, 500);
              }}
              defaultValue={postData.data}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NovelEditor;

