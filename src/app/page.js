import Image from "next/image";
import styles from "./styles/Home.module.css";
import Card from "./components/Card";

export async function getStaticFetch() {
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

  const urlAPI = "https://pokeapi.co/api/v2/pokemon";
  const limit = 50;
  const cacheParameter = { cache: "force-cache" };
  const revalidateTimeInSeconds = 3600;
  const nextParameter = { next: { revalidate: revalidateTimeInSeconds } };

  const resp = await fetch(`${urlAPI}/?limit=${limit}`, nextParameter);
  const data = await resp.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return data;
}

export default async function Home() {
  const pokemons = await getStaticFetch();

  return (
    <>
      <div className={styles.title_container}>
        <h1>
          Poke<span>Next</span>
        </h1>
        <Image
          alt="pokeball"
          src="/images/pokeball.png"
          width="50"
          height="50"
        />
      </div>
      <div className={styles.cards_container}>
        {pokemons.results.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}
