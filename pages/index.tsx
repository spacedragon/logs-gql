import Head from "next/head";
import React from "react";
import withAuthProvider, { AuthComponentProps } from "../components/AuthProvider";
import dynamic from 'next/dynamic'

const GqlPlayground = dynamic(
  () => import('../components/GqlPlayground'),
  { ssr: false }
)


function Home(props: AuthComponentProps) {  

  return (
    <div className="container">
      <Head>
            <title>Graphql IDE</title>
            <link
                href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Source+Code+Pro:400,700"
                rel="stylesheet"
            />
        </Head>
        { <main>
            <GqlPlayground />
        </main>}
    </div>
  );
}

export default Home;
