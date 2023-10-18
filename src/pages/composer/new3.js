import { Content } from "next/font/google";
import { Editor } from "novel";
import { useEffect, useState } from "react";
import addUser from "../../lib/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { updateUser } from "../../lib/helper";

const NovelEditor = () => {
  const router = useRouter();
  const id = router.query.id;
  

  const [saveStatus, setSaveStatus] = useState("Saved");
  const [editordata, setEditorData] = useState([]);
  const [PostData, setPostData] = useState(null);
  // console.log("postdata======>",PostData)

  const saveData = () => {
    try {
      addUser({ data: editordata })
        .then((result) => {
          console.log("result===>", result);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Failed data:", error);
    }
  };

  const UpdatePostData = () =>{
    try {
      updateUser({ id,data: editordata })
      
    } catch (error) {

      console.log("errorrrrrrrrrr",error)
      
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/singleuser?userId=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      let jsonData = await response.json();
      setPostData(jsonData);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  return (
    <>
      <div className="bg-[#fff] p-4 flex justify-between items-center border-b border-[#E8E8E8] mb-10">
        <div className="flex items-center">
          <Link href="/composer/new2">
          Back to post
          </Link>
         
        </div>
        <div className="flex items-center">
          <span className="text-[#0C173A] font-semibold" onClick={saveData}>Save</span>
        </div>
      </div>

      {/* {saveStatus} */}
      
      {PostData && (
        <div className="flex justify-center items-center">
          <Editor
            // onGetContent={(content) =>
            //   setContent(content)
            // }
            onUpdate={(content) => {
              // console.log("content on update======>", content.getJSON());
               setEditorData(content.getJSON());
              // setSaveStatus("Unsaved");
              console.log("getjson from editor for update",content.getJSON())
              updateUser({ id,data: content.getJSON()})
            }}
            onDebouncedUpdate={() => {
              setSaveStatus("Saving...");
              setTimeout(() => {
                setSaveStatus("Saved");
              }, 500);
            }}
            defaultValue={PostData.data}
          />
        </div>
      )}
    </>
  );
};

export default NovelEditor;
