import Image from "next/image";
import styles from "./page.module.css";
import HomeSection1 from "./Components/HomeComponexts/HomeSection1";
import HomeSection2 from "./Components/HomeComponexts/HomeSection2";
import Home from "./Components/aboutpage/aboutpage";

export default function Main() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
         <Home />
      </main>
    </div>
  );
}
