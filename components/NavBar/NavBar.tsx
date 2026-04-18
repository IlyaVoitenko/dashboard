import Link from "next/link";
import { PAGES } from "@/configs";
import styles from "./styles.module.scss";

const NavBar = () => {
  return (
    <nav role="navigation" className={styles.container}>
      <Link href={PAGES.dashboard} title="Dashboard" />
      <Link href={PAGES.tables} title="Tables" />
      <Link href={PAGES.settings} title="Settings" />
      <h2>Account pages</h2>
      <Link href={PAGES.profile} title="Profile" />
    </nav>
  );
};

export default NavBar;
