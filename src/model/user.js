import {Schema,model,models} from 'mongoose'

const userSchema =new Schema({
    data: JSON || String,
    pagename:String || Number || JSON,
    title:String || null,
    description:String || null 
},{ versionKey: false })

const Users =models.user || model('user',userSchema)

export default Users;