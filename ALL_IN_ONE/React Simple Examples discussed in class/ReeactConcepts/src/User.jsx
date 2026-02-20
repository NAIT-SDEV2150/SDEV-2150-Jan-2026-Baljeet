
function User(prop)
{
    console.log(prop.name)
    console.log(prop.age)

    return(
        <div> 
            <h1> User Name: {prop.name}</h1>
            <h1> User Age: {prop.age}</h1>

        </div>
    )
}

export default User;