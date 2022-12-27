import { selector } from "recoil";
import axios from "axios";

export const dummyUsers = selector({
    key: "DummyUsers",
    get: async() => {
        try {   
            const dummyUserRequest = await axios.get("https://jsonplaceholder.typicode.com/users");
            return dummyUserRequest.data || [];
            
        } catch(e: any) {
            throw new Error(e)
        }
    }
})