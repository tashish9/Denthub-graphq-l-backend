// {
//   time: 1655806415004,
//   _id: '62568f844036b51e96d6df7d',
//   username: 'Tashish Soni',
//   iat: 1655806415,
//   exp: 1656411215
// }

import mongoose from "mongoose"

type UserPayload = {
  _id : mongoose.Types.ObjectId ;
  username: string ;
  time : number ; 
  iat : number ;
  exp : number ; 
}

export {UserPayload} ; 