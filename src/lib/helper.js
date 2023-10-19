// const BASE_URl ="http://localhost:3000"

//  acces hot navt tyamule url blank kelela ahe
const BASE_URl = "https://cw-webadmin.vercel.app";

//all users
export const getUser = async () => {
  const response = await fetch(`${BASE_URl}/api/users`);
  const json = await response.json();
  return json;
};

//single user

export const getUsers = async (userId) => {
  const response = await fetch(`${BASE_URl}/api/users/${userId}`);
  const json = await response.json();
  const revalid=await fetch(`${BASE_URl}/api/revalidate`)
  if (json) {
    return json;
  } else {
    console.log("Else block exicuted successfully");

    return {};
  }
};

//posting user

export default async function addUser(code, pagename, title,postname) {
  console.log("pagename======>", pagename);

  try {
    const Options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(code, pagename, title,postname),
    };
    // console.log("options===========>", Options);
    const response = await fetch(`/api/users`, Options);
    const json = await response.json();
    const revalid=await fetch(`${BASE_URl}/api/revalidate`)
    return json;
  } catch (error) {
    return error;
  }
}

//update user
// export async function updateUser(formData) {
//   // console.log("userId=====>", userId);
//   console.log("formData=======>", formData);
//   console.log("formdata.id",formData.id)
//   console.log("formdata.data",formData.data)
//   try {
//     const Options = {
//       method: "PUT",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(formData),
//     };

//     console.log("Options============>",Options)
//     const datas=await fetch(`${BASE_URl}/api/users/${formData.id}`);
//     const data=await datas.json()
//     console.log("data we need to update===============>",data)

//     const response = await fetch(`${BASE_URl}/api/users`, Options);
//     if (response.status === 200) {
//       console.log("Response Status:=============>", response.status);
//       const text = await response.text(); // Log the response content as text.
//       console.log("Response Content:=========>", text);
//     } else {
//       console.error(`Server responded with status ${response.status}`);
//       return null;
//     }
//   } catch (error) {
//     console.log(error);
//     return "";
//   }
// }

export async function updateUser(formData) {
  const formData2 = {
    id: formData.id,
    data: formData.data,
    title: formData.title,
    description: formData.description,
    isPublished: formData.isPublished,
    postname:formData.postname
  };

  try {
    const Options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData2),
    };
    const response = await fetch(
      `${BASE_URl}/api/users/${formData.id}`,
      Options
    );
    const result = await response.json();
    const revalid = await fetch(`${BASE_URl}/api/revalidate`);
    console.log("revalid========>", revalid);
  } catch (error) {
    console.log("errrrrrrrrrrr", error);
    return "";
  }
}

//delete user

export async function deleteUser(userId) {
  // console.log("userIdin helperrrrrrrrrrrrrrrrrrrrr",userId)
  try {
    // formData.userId = userId;
    const Options = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URl}/api/users/${userId}`, Options);

    // Return the JSON response
    return response.json();
  } catch (error) {
    console.log(error);
    return "";
  }
}
