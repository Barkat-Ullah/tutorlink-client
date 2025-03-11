"use client";
import { useUser } from "@/context/UserContext";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      <h1 className="text-center text-6xl font-semibold  ">Dashboard</h1>
      <h2 className="text-center text-4xl font-medium mt-2">
        Name: {user?.name}{" "}
      </h2>
      <h2 className="text-center text-2xl font-medium mt-2">
        Email: {user?.email}{" "}
      </h2>
    </div>
  );
};

export default Dashboard;
