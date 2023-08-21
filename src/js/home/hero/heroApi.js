import axios from 'axios';
const INITIAL_REQUEST = `https://tasty-treats-backend.p.goit.global/api/events`;
export async function fetchEvent(){
    try {
      const response = await axios.get(INITIAL_REQUEST);
      if (response.status === 404) {
        throw new Error(response.status);
      };
      return response.data;
    } catch (error) {
      console.log(error);
    };
  };