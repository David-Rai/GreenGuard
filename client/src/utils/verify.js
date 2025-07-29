
//checking the jwt token validation
export const verify = async () => {
    const res = await fetch("http://localhost:1111/verify", {
        credentials: 'include'
    })
    const data = await res.json()
    console.log(data)
}