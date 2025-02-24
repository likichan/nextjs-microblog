import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Lomichan";
export const siteTitle = "Next.js blog";

export default function Layout({ children, home }) {
  return (
    <div className={styles.header}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img src="/images/profile.png" alt="profile" 
            className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img src="/images/profile.png" alt="profile" 
            className={`${utilStyles.borderCircle }`} />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && ( // ホームページでない場合
        <div>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
    </div>
  )
}