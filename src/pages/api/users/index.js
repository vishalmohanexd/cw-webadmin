// import putUser from "@/components/updateUser";
// import connectMongo from "@/database/conn"
import connectMongo from "../../../database/conn";
import { getUsers,postUser,putUser,DeleteUser } from "../../../database/controllers";
export default  function handler(req, res) {
    connectMongo().catch(()=>res.status(405).json({error:"Error in the connection"}))

    //requests
    const {method} = req
    switch(method){

        case 'GET':
            console.log("getusers called======>")
            getUsers(req,res)
            break
        case 'POST':
            console.log("postusercalled========>")
            postUser(req,res)
            break
        case 'PUT':
          console.log("put request called====>")
           putUser(req,res)
           console.log("put request called")
            break
        case 'DELETE':
            DeleteUser(req,res)
            break
        default:
            res.setHeader('ALLOW',['GET','PUT','DELETE']);
            res.status(405).end(`Method${method} Not Allowed`)
            break
    }
  }