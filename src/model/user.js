import {Schema,model,models} from 'mongoose'

const userSchema =new Schema({
    data: JSON || String,
    pagename:String || Number || JSON,
    title:String || null,
    description:String || null ,
    isPublished:Boolean || String,
    postname:String || Number || JSON
},{ versionKey: false })

const Users =models.user || model('user',userSchema)

export default Users;