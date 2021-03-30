import { userAuth } from "../components/Providers/Auth"
import axios from "axios"

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  // const requestUrl = getStrapiURL(path);
  // const response = await fetch(requestUrl);
  // const data = await response.json();
  
  const config = {
    method: 'get',
    url: getStrapiURL(path),
    // headers: {
    //   Authorization: `Bearer ${userAuth.jwt}`
    // }
  }
  
  const data = axios(config)

  return data;
}
