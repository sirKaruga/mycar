import axios from "axios";

export default function apiCalls(data, route) {
  return axios({
    url: `http://192.168.43.205:4000${route}`,
    method: "post",
    withCredentials: true,
    data: data,
  });
}
