import { selector } from "recoil";
import axios from "axios";
import { getErrorMessage } from "../../utils/errorTyping";

export const dummyUsers = selector({
  key: "DummyUsers",
  get: async () => {
    try {
      const dummyUserRequest = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return dummyUserRequest.data || [];
    } catch (error: unknown) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);

      getErrorMessage({ message });
    }
  },
});
