import connectMongo from "../../../database/conn";
import { getUser,getUsers,postUser,putUser,DeleteUser } from "../../../database/controllers";

export default async function handaler(req,res){
    connectMongo().catch(()=>res.status(405).json({error:"Error in the connection"}))
    const {method}=req
    switch(method){
        case 'GET':
          console.log("single user called")
            getUser(req,res);
            break
        case 'PUT':
            putUser(req,res)
            console.log("put request called frommmmm------------")
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


  export const config = {
    api: {
      bodyParser: {
        sizeLimit: '500mb', 
      },
    },
  };
  