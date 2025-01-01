import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/CardDetails.module.css";

export async function getStaticFetch({ id }) {
  // No next atual, nao se usa mais a função getStaticProps
  // mas sim passa-se um parametro de cache para o metodo fetch
  // também pode-se usar o parametro { next: { revalidate: N } } que faz a
  // revalidação em Segundo Plano, ou seja, após o intervalo definido (N segundos),
  // a página será reconstruída no servidor quando houver uma nova solicitação.
  // Também durante o intervalo de revalidação, os dados
  // antigos permanecem no cache e são servidos rapidamente aos usuários.
  // ssa abordagem substitui a necessidade de configurar revalidação
  // diretamente em funções como getStaticProps, usada no Pages Router.
  // Tambem ha o parametro {cache: 'force-cache'}, útil para otimizar o
  // desempenho e reduzir o custo em casos de dados estáticos ou que
  // mudam raramente, como no caso de documentação, apresentações, about..
  // É muito otimizado para SEO e ideal para os dados estaticos, como mencionado
  // Se precisar atualizar os dados periodicamente,
  // prefira { next: { revalidate } }. Para cenários que exigem sempre
  // dados em tempo real, use cache: 'no-store'.

  const urlAPI = "https://pokeapi.co/api/v2/pokemon/";
  const cacheParameter = { cache: "force-cache" };
  const revalidateTimeInSeconds = 3600;
  const nextParameter = { next: { revalidate: revalidateTimeInSeconds } };

  const resp = await fetch(`${urlAPI}${id}`, nextParameter);
  const data = await resp.json();

  return data;
}

export default async function CardDetails({ params }) {
  const { id } = await params;
  console.log(`O id: ${id}`);
  const pokemon = await getStaticFetch({ id });

  // ajustando para o formato 000 do id
  const imgId = ("000" + pokemon.id).slice(-3);

  return (
    <div className={styles.details_container}>
      <h1>{pokemon.name}</h1>
      <Image
        src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${imgId}.png`}
        alt={pokemon.name}
        width="180"
        height="180"
      />
      <div>
        <h3>Número</h3>
        <p>{`#${pokemon.id}`}</p>
      </div>
      <div>
        <h3>Tipo</h3>
        <div className={styles.types_container}>
          {pokemon.types.map((item, index) => (
            <span
              key={index}
              className={`${styles.type} ${styles["type_" + item.type.name]}`}
            >
              {item.type.name}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.phisical_dates}>
        <div className={styles.right_border}>
          <h4>Altura</h4>
          <p>{`${pokemon.height * 10} cm`}</p>
        </div>
        <div>
          <h4>Peso</h4>
          <p>{`${pokemon.weight} kg`}</p>
        </div>
      </div>
    </div>
  );
}
