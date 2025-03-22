"use client";

import styles from "./page.module.css"
import Navbar from "@/components/navbar";

export default function Home() {
  return (<>
      <Navbar></Navbar>
      <div className={styles.background}>
      </div>
      <div className={styles.main}>
        <div className="w-full h-full flex-row justify-center items-center flex pr-[20%]">
          <div>
            <h1 className="font-montserrat text-5xl font-bold  drop-shadow-[2px_2px_0px_black]">welcome to studyrooms</h1>
            <button className="font-montserrat text-2xl bg-oldRose border-2 border-black rounded-lg p-2">get started</button>
          </div>
        </div>
      </div>
    </>
  );
}