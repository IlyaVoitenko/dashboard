"use client";
import styles from "./styles.module.scss";
import dynamic from "next/dynamic";

const SalesChart = dynamic(() => import("@/components/SalesChart"), {
  ssr: false,
  loading: () => <div>SalesChart loading...</div>,
});
const Dashboard = () => {
  return (
    <div className={styles.container}>
      <SalesChart />
    </div>
  );
};

export default Dashboard;
