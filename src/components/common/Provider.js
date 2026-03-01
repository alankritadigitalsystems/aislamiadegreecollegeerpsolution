import axios from "axios";

export const get = async (url) => {
  try {
    return await axios.get(url);
  } catch (err) {
    return err.response;
  }
};

export const post = async (url, payload = {}) => {
  try {
    return await axios.post(url, payload);
  } catch (err) {
    return err.response;
  }
};

export const deleteMethod = async (url, payload = {}) => {
  try {
    return await axios.delete(url, { data: payload });
  } catch (err) {
    return err.response;
  }
};

export const put = async (url, payload = {}) => {
  try {
    return await axios.put(url, payload);
  } catch (err) {
    return err.response;
  }
};
