import React from "react";
import Layout from "../components/Layouts/layout";
import Seo from "../components/Global/seo";
import { fetchAPI } from "../lib/api";
import { userAuth } from "../components/Providers/Auth";  

const Home = ({ coachingRequests }) => {
  
  return (
    <Layout>
      {coachingRequests.map((coachingRequest) => (
        <div value={coachingRequest._id}>
          <h1>{coachingRequest.title}</h1>
          <p>{coachingRequest.content}</p>
          <ul>
            {coachingRequest.comments.map((comment) => (
              <li key={comment._id}> {comment.content} </li>
            ))}
          </ul>
        </div>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  // const authData = userAuth()
  // console.log(authData)

  // Run API calls in parallel
  const [coachingRequests] = await Promise.all([
    fetchAPI("/coaching-requests"),
  ]);

  return {
    props: { coachingRequests },
    revalidate: 1,
  };
}

export default Home;
