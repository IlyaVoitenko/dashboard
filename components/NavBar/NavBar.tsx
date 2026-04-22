"use client";
import Link from "next/link";
import { PAGES } from "@/configs";
import styles from "./styles.module.scss";
import { useState } from "react";

const NavBar = () => {
  const [isShowNav, setIsShowNav] = useState(false);
  return (
    <header className={styles.container}>
      {isShowNav ? (
        <button className={styles.btnMenu} onClick={() => setIsShowNav(false)}>
          &#9776;
        </button>
      ) : (
        <button className={styles.btnMenu} onClick={() => setIsShowNav(true)}>
          x
        </button>
      )}

      <nav role="navigation" className={styles.containerNav}>
        <Link
          href={PAGES.dashboard}
          title="Dashboard"
          className={isShowNav ? styles.hideNav : styles.showNav}
        >
          Dashboard
        </Link>
        <Link
          href={PAGES.tables}
          title="Tables"
          className={isShowNav ? styles.hideNav : styles.showNav}
        >
          Tables
        </Link>
        <Link
          href={PAGES.settings}
          title="Settings"
          className={isShowNav ? styles.hideNav : styles.showNav}
        >
          Settings
        </Link>
        <Link
          href={PAGES.profile}
          title="Profile"
          className={isShowNav ? styles.hideNav : styles.showNav}
        >
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
