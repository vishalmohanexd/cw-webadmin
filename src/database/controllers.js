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

export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    console.log("userID=========>",userId)
    // const id="6523a5d58cb19629b9ef27f1"

    if (userId) {
      const user = await Users.findOne({ pagename: userId });
      console.log("userrrrrrrrrrrrrrrrr=>",user)
      // const user = await Users.findById(userId);
      res.status(200).json(user);
      res.status(404).json(user);
    }
    res.status(404).json({ error: "user is not selected" });
  } catch (error) {
    res.status(404).json({ 1: "cannot get the user" });
  }
}

export async function postUser(req, res) {
  const data = req.body;
  console.log("data============>", data);
  const newUser = new Users({
    data: data.data,
    pagename: data.pagename,
    title: data.title,
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
    const { id, data, pagename, title, description } = req.body;
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

      const updatedData = await Users.updateOne(query, update);
      // console.log("updated data==========>", updatedData);

      if (updatedData.nModified === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json({ message: "User updated successfully" });
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
