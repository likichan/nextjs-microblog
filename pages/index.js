import Head from "next/head";
import Image from "next/image";
import Layout from "/components/Layout";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import { getPostsData } from "../lib/post"; // idとmatterResult.dataをallPostsDataに格納
import { siteTitle } from "../components/Layout";

// SSGの場合（外部から一度だけデータを持ってくる）
export async function getStaticProps(context) { // getStaticPropsはNext.jsの関数
  const allPostsData = getPostsData(); //id, title, date, thumbnailを取得
  return { // 取得したデータをpropsに格納し、Homeコンポーネントに渡す
    props: { allPostsData },
  };
} 

// // SSRの場合（ユーザーのリクエストごとにデータを持ってくる）
// export async function getServerSideProps() { // getServerSidePropsはNext.jsの関数
//   const allPostsData = getPostsData(); //id, title, date, thumbnailを取得
//   return { // 取得したデータをpropsに格納し、Homeコンポーネントに渡す
//     props: { // コンポーネントに渡すためのprops  },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>私はロミちゃんです。</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}> 
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => ( // map関数で分解
            <article key={id}>
            <Link href= {`/posts/${id}`}>
              <img 
                src={thumbnail}
                className={styles.thumbnailImage}
              />
            </Link>
            <Link href={`/posts/${id}`} className={utilStyles.boldText}>
              {title}
            </Link>
            <br />
            <small className={utilStyles.lightText}>{date}</small>
          </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
