import Image from "next/image";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.about}>
      <h1>Sobre</h1>
      <p>Projeto desenvolvido visando aprender o framework NextJs</p>
      <Image
        src="/images/charizard.png"
        alt="Imagem da pagina sobre"
        width="300"
        height="300"
      ></Image>
    </div>
  );
}
