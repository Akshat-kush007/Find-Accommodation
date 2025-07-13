import axios from "axios";

const axiosInstance = axios.create();

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = null) => {
    // console.log("URL: ",url)
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
      params,
    });

    return response;
  } catch (error) {
    console.error("API Error:", error?.response?.data || error.message);
    throw error?.response?.data || error.message;
  }
};
