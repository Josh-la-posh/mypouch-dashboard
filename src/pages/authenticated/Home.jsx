import React from "react";
import Button from "../../components/Button";

const Home = () => {
  return (
    <div className="">
      <h1>Welcome to the Starter Dashboard</h1>;
      <Button onClick={() => alert("Clicked!")}>Get Started</Button>
    </div>
  );
};

export default Home;
