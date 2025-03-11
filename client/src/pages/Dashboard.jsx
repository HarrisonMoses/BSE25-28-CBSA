import React from "react";
import Layout from "../components/layout";
import FarmCard from "../components/FarmCard";
import Button from "../components/Button";

const Dashboard = () => {
  function name() {
    console.log("hello world");
  }

  return (
    <Layout>
      <Button name="Add New Farm" action={name} />
      <div className="flex flex-wrap gap-4 mt-8">
        <FarmCard
          farmname="Kayunga"
          location="Ug"
          size="20 acres"
          crops="maize"
          status="Active"
          func={name}
        />
        <FarmCard
          farmname="Kayunga"
          location="Ug"
          size="20 acres"
          crops="maize"
          status="Active"
          func={name}
        />
        <FarmCard
          farmname="Kayunga"
          location="Ug"
          size="20 acres"
          crops="maize"
          status="Maintenence"
          func={name}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
