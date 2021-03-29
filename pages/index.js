import React from "react";
import Layout from "../components/Layouts/layout";
import Seo from "../components/Global/seo";
import { fetchAPI } from "../lib/api";

const Home = ({ coachingRequests }) => {
  return (
    <Layout>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          {coachingRequests.map((coachingRequest) => (
            <h1>{coachingRequest.title}</h1>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [ coachingRequests ] = await Promise.all([
    fetchAPI("/coaching-requests"),
  ]);

  return {
    props: { coachingRequests },
    revalidate: 1,
  };
}

export default Home;
