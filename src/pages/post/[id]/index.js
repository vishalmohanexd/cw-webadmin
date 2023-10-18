import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Blogs = () => {
    const router = useRouter();
    const id = router.query.id;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cw-webadmin.vercel.app/api/singleuser?userId=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();

        // Check if data is an array or object
        const transformedData = Array.isArray(jsonData) ? jsonData : [jsonData];

        setData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "900px" }}>
    
        {data?.map((item) => (
          <div key={item._id}>
            {item?.data?.content.map((contentItem, index) => {
              if (contentItem.type === "paragraph" && contentItem.content && contentItem.content.length > 0) {
                // console.log(contentItem);
                return (
                  <div key={index}>
                    {contentItem.content.map((textItem, textIndex) => {
                      //  console.log(textItem.marks[0].type);
                      //  console.log(textItem.marks[0].attrs.color);
                       if(textItem.marks && textItem.marks[0].type === 'textStyle' && textItem.marks[0].attrs.color){
                        return(
                          <p key={textIndex} className="text-[19px]" style={{color:`${textItem.marks[0].attrs.color}`}}>{textItem.text}</p>
                        )
                       }
                     else if (textItem.marks && textItem.marks[0].type === "bold") {
                        return (
                          <strong key={textIndex} className="text-[19px]">
                            {textItem.text}
                          </strong>
                        );
                      } else if (
                        textItem.marks &&
                        textItem.marks[0].type === "italic"
                      ) {
                        return (
                          <em key={textIndex} style={{ fontWeight: "italic" }} className="text-[19px]">
                            {textItem.text}
                          </em>
                        );
                      } 
                       else {
                        return (
                          <p
                            key={textIndex}
                            style={{
                              fontSize: "19px",
                              marginTop: "20px",
                              marginBottom: "20px",
                            }}
                          >
                            {textItem.text}
                          </p>
                        );
                      }
                    })} 
                  </div>
                );
              } else if (contentItem.type === "image") {
                return (
                  <>
                    <img
                      className="rounded"
                      key={index}
                      src={contentItem.attrs.src}
                      alt={contentItem.attrs.alt}
                      title={contentItem.attrs.title}
                      width={700}
                      height={500}
                      style={{ marginTop: "20px", marginBottom: "20px" }}
                    />
                  </>
                );
              } else if (contentItem.type === "bulletList") {
                return (
                  <div key={index}>
                    {contentItem.content.map((textItem, textIndex) => {
                      //console.log(textItem.content[0].content[0]);
                      //  console.log(textItem.content[0].content[1]);
                      if (
                        textItem.content[0].content[0].marks &&
                        textItem.content[0].content[1]
                      ) {
                        return (
                          <>
                            <div key={textIndex}>
                              <ul
                                className="ml-6 mt-4 text-[19px]"
                                style={{
                                  listStyleType: "disc",
                                  fontSize: "19px",
                                }}
                              >
                                <li>
                                  {textItem.content[0].content[0].marks.some(
                                    (mark) => mark.type === "bold",
                                  ) ? (
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "19px",
                                      }}
                                    >
                                      {textItem.content[0].content[0].text}
                                    </span>
                                  ) : textItem.content[0].content[0].marks.some(
                                      (mark) => mark.type === "italic",
                                    ) ? (
                                    <span
                                      style={{
                                        fontStyle: "italic",
                                        fontSize: "19px",
                                      }}
                                    >
                                      {textItem.content[0].content[0].text}
                                    </span>
                                  ) : (
                                    textItem.content[0].content[0].text
                                  )}
                                  {textItem.content[0].content[1].text}
                                </li>
                              </ul>
                            </div>
                          </>
                        );
                      } else if (textItem.content[0].content[0].text) {
                        return (
                          <>
                            <div key={textIndex}>
                              <ul
                                className="mt-4"
                                style={{
                                  listStyleType: "disc",
                                  fontSize: "19px",
                                }}
                              >
                                <li className="ml-6 mt-4 text-[19px]">
                                  {textItem.content[0].content[0].text}
                                </li>
                              </ul>
                            </div>
                          </>
                        );
                      }
                    })}
                  </div>
                );
              } else if (contentItem.type === "orderedList") {
                return (
                  <div key={index}>
                    <ol className="list-decimal">
                      {contentItem.content.map((textItem, textIndex) => {
                        //console.log(textItem.content[0].content[0]);
                        //console.log(textItem.content[0].content[1]);
                        if (
                          textItem.content[0].content[0].marks &&
                          textItem.content[0].content[1]
                        ) {
                          return (
                            <>
                              <li
                                key={textIndex}
                                className="ml-6 mt-4 text-[19px]"
                              >
                                {textItem.content[0].content[0].marks.some(
                                  (mark) => mark.type === "bold",
                                ) ? (
                                  <span className="text-[19px] font-bold ">
                                    {textItem.content[0].content[0].text}
                                  </span>
                                ) : textItem.content[0].content[0].marks.some(
                                    (mark) => mark.type === "italic",
                                  ) ? (
                                  <span className="text-[19px] italic">
                                    {textItem.content[0].content[0].text}
                                  </span>
                                ) : (
                                  textItem.content[0].content[0].text
                                )}
                                {textItem.content[0].content[1].text}
                              </li>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <li className="ml-6 mt-4 text-[19px]">
                                {textItem.content[0].content[0].text}
                              </li>
                            </>
                          );
                        }
                      })}
                    </ol>
                  </div>
                );
              } else if (contentItem.type === "heading") {
                // console.log(contentItem.attrs.level);
                if (contentItem.attrs.level === 1) {
                  return (
                    <div key={index}>
                      {contentItem.content.map((textItem, textIndex) => {
                        // console.log(textItem);

                        if (
                          textItem.marks &&
                          textItem.marks[0]?.type === "bold"
                        ) {
                          return (
                            <h1
                              key={textIndex}
                              className="text-[52px] font-bold "
                            >
                              {textItem.text}
                            </h1>
                          );
                        } else {
                          return (
                            <h1
                              key={textIndex}
                              className="text-[52px] font-bold "
                            >
                              {textItem.text}
                            </h1>
                          );
                        }
                      })}
                    </div>
                  );
                } else if (contentItem.attrs.level === 2) {
                  console.log("level 2")
                  return (
                    <div key={index}>
                      {contentItem.content.map((textItem, textIndex) => {
                        // console.log(textItem);
                        if (
                          textItem.marks &&
                          textItem.marks[0]?.type === "bold"
                        ) {
                          return (
                            <h2
                              key={textIndex}
                              className="text-[32px] font-bold "
                            >
                              {textItem.text}
                            </h2>
                          );
                        } else {
                          return <h2 key={textIndex} className="text-[32px] font-bold ">{textItem.text}</h2>;
                        }
                      })}
                    </div>
                  );
                } else if (contentItem.attrs.level === 3) {
                  return (
                    <div key={index}>
                      {contentItem.content.map((textItem, textIndex) => {
                        // console.log(textItem);
                        if (
                          textItem.marks &&
                          textItem.marks[0]?.type === "bold"
                        ) {
                          return (
                            <h3
                              key={textIndex}
                              className="text-[20px] font-bold "
                            >
                              {textItem.text}
                            </h3>
                          );
                        } else {
                          return <h3 key={textIndex}  className="text-[20px] font-bold ">{textItem.text}</h3>;
                        }
                      })}
                    </div>
                  );
                }
              } else if (contentItem.type === "taskList") {                
                // if(contentItem.content.length ===1 && contentItem.content[0].attrs.checked === false || contentItem.content[0].attrs.checked === true ){
                //   if(contentItem.content[0].attrs.checked === false){
                //     return (
                //           <>
                //             <div className="flex items-center">
                //               <input
                //                 type="checkbox"
                //                 id="myCheckbox"
                //                 className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                //               />
                //               <label
                //                 htmlFor="myCheckbox"
                //                 className="ml-2 text-gray-700"
                //               >
                //                 {contentItem.content[0].content[0].content[0].text}
                //               </label>
                //             </div>
                //           </>
                //         );
                //   }
                //   if(contentItem.content[0].attrs.checked === true){
                //     return(
                //       <>
                //       <div className="flex items-center">
                //          <input
                //           type="checkbox"
                //           id="myCheckbox"
                //           defaultChecked
                //           className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                //         />
                //         <label
                //           htmlFor="myCheckbox"
                //           className="ml-2 text-gray-700 line-through"
                //         >
                //           {contentItem.content[1].content[0].content[0].text}
                //         </label>
                //       </div>
                //       </>
                //     )
                //   }
                //   console.log("single tasklist present here")
                // }
                if (contentItem.content.length === 1) {
                  if (contentItem.content[0].attrs.checked === false) {
                    return (
                      <>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="myCheckbox"
                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          
                          <label htmlFor="myCheckbox" className="ml-2 text-gray-700">
                            {contentItem.content[0].content[0].content[0].text}
                          </label>
                        </div>
                      </>
                    );
                  } else if (contentItem.content[0].attrs.checked === true) {
                    return (
                      <>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="myCheckbox"
                            defaultChecked
                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <label
                            htmlFor="myCheckbox"
                            className="ml-2 text-gray-700 line-through"
                          >
                            {contentItem.content[0].content[0].content[0].text}
                          </label>
                        </div>
                      </>
                    );
                  }
                }
                
                if (contentItem.content.length > 1) {
                  // console.log("many tasklists present");

                  const taskItems = contentItem.content.map(
                    (taskitem, index) => {
                      if (taskitem.attrs.checked === true) {
                        // console.log(taskitem.content[0].content[0].text);
                        return (
                          <>
                            <div key={index} className="flex items-center mt-4">
                              <input
                                type="checkbox"
                                id="myCheckbox"
                                defaultChecked
                                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                              />
                              <label
                                htmlFor="myCheckbox"
                                className="ml-2 text-gray-700 line-through"
                              >
                                {taskitem.content[0].content[0].text}
                              </label>
                            </div>
                          </>
                        );
                      }

                      if (taskitem.attrs.checked === false) {
                        // console.log(taskitem.content[0].content[0].text);
                        return (
                          <>
                            <div key={index} className="flex items-center mt-4">
                              <input
                                type="checkbox"
                                id="myCheckbox"
                                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                              />
                              <label
                                htmlFor="myCheckbox"
                                className="ml-2 text-gray-700"
                              >
                                {taskitem.content[0].content[0].text}
                              </label>
                            </div>
                          </>
                        );
                      }

                      return null;
                    },
                  );

                  return <>{taskItems}</>;
                }
              
              } else if (contentItem.type === "blockquote") {
                // console.log(contentItem.content[0].content[0].text)
                // console.log(contentItem.content.length)
                // console.log(contentItem)
                if (contentItem.content.length === 1) {
                  if (contentItem.content[0].content[0].text) {
                    return (
                      <>
                        
                        <div className="border-l-4 border-black h-8 mt-4">
                          <p key={index} className="text-[19px] ml-4 ">{contentItem.content[0].content[0].text}</p>
                          </div>
                      </>
                    );
                  } 
                }
                
                if (contentItem.content.length > 1) {
                  // console.log("many tasklists present");

                  const taskItems = contentItem.content.map(
                    (taskitem, index) => {
                      if(taskitem.content[0].marks[0].attrs){
                        // console.log(taskitem.content[0].marks[0].attrs.color)
                        return(
                          <>
                         
                          <div className="border-l-4 border-black h-10 ">
                            <p key={index} className="text-[19px] ml-4" style={{color:`${taskitem.content[0].marks[0].attrs.color}`}}>
                              {taskitem.content[0].text}
                            </p>
                            </div>
                          </>
                        )
                        
                      }
                     
                    //  console.log(taskitem.content[0].text)
                        // console.log(taskitem.content[0].content[0].text);
                     else if(taskitem.content[0].marks[0].type==='bold'){
                          return (
                            
                           <>
                            <div className="border-l-4 border-black h-10 ">
                            <strong key={index} className="text-[19px] ml-4">
                              {taskitem.content[0].text}
                            </strong>
                            </div>
                           </>
                          );
                        }
                        else if(taskitem.content[0].marks[0].type==='code'){
                          console.log(taskitem.content[0].text)
                          return(
                            <>
                            <div className="border-l-4 border-black h-10 ">
                            <p key={index} className="text-[19px] ml-4">
                              {taskitem.content[0].text}
                            </p>
                            </div>
                            </>

                          )

                        }
                        // else if(taskitem.content[0].marks[0].type==='textStyle'){
                        //   return(
                        //     <p key={index} style={{color:`${taskitem.marks[0].attrs.color}`}}>{taskitem.content[0].text}</p>
                        //   )
                        // }
                        // return (
                        //   <>
                        //   <div className="border-l-4 border-black h-10 ">
                        //   <p key={index} className="text-[19px] ml-4 ">{taskitem.content[0].text}</p>
                        //   </div>
                        //   </>
                        // );
                    },
                  );

                  return <>{taskItems}</>;
                }
              } else if (contentItem.type === "codeBlock") {
                // console.log(contentItem.content[0].text);
                const lines = contentItem.content[0].text.split("\n"); 
                return (
                  <>
                    <div>
                      {lines.map((line, index) => (
                        <React.Fragment key={index} >
                         <p className="text-[19px]"> {line}</p>
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                );
                // return(
                //   <>
                //   <p>{contentItem.content[0].text}</p>
                //   </>
                // )
              }
              else {
                return null;
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
