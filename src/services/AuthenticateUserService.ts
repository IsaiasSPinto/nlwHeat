import axios from "axios"
import { response } from "express"

interface AccessTokenRepsonse {
    access_token : string
}

interface IUserResponse {
    avatar_url: string
    id: number
    login: string 
    name: string
}

class AuthenticateUserService {
    async execute(code:string){
        const url = "https://github.com/login/oauth/access_token"

        const {data: accessTokenResponse } = await axios.post<AccessTokenRepsonse>(url, null , {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret : process.env.GITHUB_CLIENT_SECRECT,
                code,
            },
            headers : {
                "Accept": "application/json"
            }
        })

        const response = await axios.get<IUserResponse>("https://api.github.com/user" , {
            headers : { 
                autorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        return response.data
    }

}

export { AuthenticateUserService}