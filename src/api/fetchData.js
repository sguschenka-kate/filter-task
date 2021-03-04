import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get("https://venbest-test.herokuapp.com/");
    const arr = response.data;
    return arr || [];
  } catch (err) {
    console.log(err);
  }
};

export { fetchData };
