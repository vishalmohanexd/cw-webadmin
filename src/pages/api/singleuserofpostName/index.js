// import putUser from "@/components/updateUser";
// import connectMongo from "@/database/conn"
import connectMongo from "../../../database/conn";
import { getsingleuserpost,postUser,putUser,DeleteUser } from "../../../database/controllers";
export default  function handler(req, res) {
    connectMongo().catch(()=>res.status(405).json({error:"Error in the connection"}))

    //requests
    const {method} = req
    switch(method){

        case 'GET':
            getsingleuserpost(req,res)
            break
        case 'POST':
            postUser(req,res)
            break
        case 'PUT':
           putUser(req,res)
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