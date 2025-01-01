import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Card.module.css";

export default function Card({ pokemon }) {
  // ajustando para o formato 000 do id
  const imgId = ("000" + pokemon.id).slice(-3);

  return (
    <div className={styles.card}>
      <Image
        src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${imgId}.png`}
        alt={pokemon.name}
        width="150"
        height="150"
      />
      <p className={styles.id}>#{pokemon.id}</p>
      <h3 className={styles.name}>{pokemon.name}</h3>
      <Link className={styles.link} href={`/pokemon/${pokemon.id}`}>
        Detalhes
      </Link>
    </div>
  );
}
