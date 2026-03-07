//import { useState } from "react"

export default function AddUser({user, setUser}){

return(
    <>
        <h1> UserName : {user} </h1>
        <input type="text" onChange={(e)=> setUser(e.target.value)}/>

<hr/>

    </>
)


}
