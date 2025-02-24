import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";

export async function getStaticPaths() { // Next.jsの関数
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // パスに対応するページがない場合は404ページを表示
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHtml }} />
      </article>
    </Layout>
    // サニタイズの処理をしないとHTMLを埋め込むときにXSS攻撃を受ける可能性がある
  );
}
