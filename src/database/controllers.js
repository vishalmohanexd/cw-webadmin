//controller
// import { use } from "react"

import Users from "../model/user";

export async function getUsers(req, res) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).json({ error: "data not found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "error while fetching the data" });
  }
}

// export async function getUser(req, res) {
//   try {
//     const { userId } = req.query;
//     console.log("userID=========>",userId)
//     // const id="6523a5d58cb19629b9ef27f1"

//     if (userId) {
//       const user = await Users.findOne({ pagename: userId });
//       console.log("userrrrrrrrrrrrrrrrr=>",user)
//       // const user = await Users.findById(userId);
//       res.status(200).json(user);
//     }
//     res.status(404).json({ error: "user is not selected" });
//   } catch (error) {
//     res.status(404).json({ 1: "cannot get the user" });
//   }
// }

export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    console.log("userID=========>", userId);

    if (userId) {
      const user = await Users.findOne({ pagename: userId });
      console.log("userrrrrrrrrrrrrrrrr=>", user);

      if (user) {
        // If a user is found, send a 200 response
        res.status(200).json(user);
      } else {
        // If no user is found, send a 404 response
        res.status(404).json({ error: "User not found" });
      }
    } else {
      // Send a 404 response if the 'userId' query parameter is missing
      res.status(404).json({ error: "User ID not provided" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Send a 500 response for internal errors
  }
}

export async function getsingleuserpost(req, res) {
  // try {
  //   const { userId } = req.query;
  //   // const id="6523a5d58cb19629b9ef27f1"

  //   console.log("geting id in controller:",userId)

  //   if (userId) {
  //     const user = await Users.findOne({ postname: userId });
  //     // const user = await Users.findById(userId);
  //     res.status(200).json(user);
  //     console.log("getting user record :",user)
  //   }
  //   res.status(404).json({ error: "user is not selected" });
  // } catch (error) {
  //   res.status(404).json({ 1: "cannot get the user" });
  // }

  try {
    const { userId } = req.query;
    console.log("userID=========>", userId);

    if (userId) {
      const user = await Users.findOne({ postname: userId });
      console.log("userrrrrrrrrrrrrrrrr=>", user);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(404).json({ error: "User ID not provided" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Send a 500 response for internal errors
  }
}


export async function postUser(req, res) {
  const data = req.body;
  console.log("data============>", data);
  const newUser = new Users({
    data: data.data,
    pagename: data.pagename,
    title: data.title,
    postname:data.postname
  });
  try {
    const user = await newUser.save();

    console.log("user addedd from controller", user);

    //success
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}

// export async function putUser(req, res) {
//   try {
//     const { id, data } = req.body;
//     console.log("id==========>", id);
//     console.log("data,data=====>", data);
//     if (id && data) {
//       const updatedData = await Users.updateOne({ _id: id },data);
//       console.log("updated data==========>", updatedData);

//       res.status(200).json(updatedData);
//     } else {
//       res.status(400).json({ error: "Invalid data" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error while updating data" });
//   }
// }

//12-oct-2023

// export async function putUser(req, res) {
//   try {
//     const { id, data ,pagename,title,descriptiom} = req.body;
//     console.log("req.body=================>",req.body)
//     console.log("id from controller for updating record==========>",id);
//     console.log("pagename from controller=====>", pagename);
//     console.log("data from controller=====>", data);
//     console.log("descriptiom from controller=====>", descriptiom);
//     console.log("title from controller=====>", title);
    
//     if (id && data) {
//       const query = { pagename: id };
//       const update = { $set: { data: data} };
//       const updatedData = await Users.updateOne(query, update);
//       console.log("updated data==========>", updatedData);

//       if (updatedData.nModified === 0) {
//         res.status(404).json({ error: "User not found" });
//       } else {
//         res.status(200).json({ message: "User updated successfully" });
//       }
//     } else {
//       res.status(400).json({ error: "Invalid data" });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Error while updating data" });
//   }
// }

export async function putUser(req, res) {
  try {
    const { id, data, pagename, title, description,isPublished,postname } = req.body;
    if (id) {
      const query = { pagename: id };
      const update = { $set: {} };

      if (data !== undefined) {
        update.$set.data = data;
      }
      if (pagename !== undefined) {
        update.$set.pagename = pagename;
      }
      if (title !== undefined) {
        update.$set.title = title;
      }
      if (description !== undefined) {
        update.$set.description = description;
      }
      if(isPublished !== undefined){
        update.$set.isPublished = isPublished;
      }
      if(postname !==undefined){
        update.$set.postname = postname;
      }


      const updatedData = await Users.updateOne(query, update);
      // console.log("updated data==========>", updatedData);

      if (updatedData.nModified === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json({ message: "User updated successfully" });
        // const revalid=await fetch('http://localhost:3000/api/revalidate')

      }
    } else {
      res.status(400).json({ error: "Invalid data" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error while updating data" });
  }
}





export async function DeleteUser(req, res) {
  console.log("heiowjdsojlfwdnscwskss;", req, res);
  var userId = req.body.id;

  try {
    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      if (user == null) {
        return res.json("User does not exits.");
      } else {
        return res.json(user);
      }
    }
  } catch (err) {
    return res.status(400).json("Errorrrrrrrrrrrrrcontrolller file: " + err);
  }
}
