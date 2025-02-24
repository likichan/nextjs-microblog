import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "posts"); //  path.joinでOSに応じた posts ディレクトリの絶対パスを取得 する

// mdファイルのデータを取り出す
// この関数を使い、index.jsでデータから取得する
export function getPostsData() {
  // const fetchData = await fetch("endpoint") // fetchで外部データやDBに接続して、データを取得 
  const fileNames = fs.readdirSync(postDirectory); //　postsDirectoryの中にあるファイルを配列としてオブジェクトして格納. idを取得

  const allPostsData = fileNames.map((fileName) => { // 配列を一つ一つ取り出す
    const id = fileName.replace(/\.md$/, ""); // ファイルの名前を、ファイル名から.mdを削除してidを取得　ファイル名を取得する

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postDirectory, fileName); // 各ファイルのパスを取得
    const fileContents = fs.readFileSync(fullPath, "utf8"); // ファイルの内容を文字列として読み取り、fileContentsに格納

    // マークダウンをパースする
    const matterResult = matter(fileContents); // fileContentsの中身のマークダウンのメタデータを取得
    
    // idとデータを返す
    return {
      id,
      ...matterResult.data // スプレッド構文でmdファイルのmetadataを配列としてそれぞれ取得している
    }
  });
  return allPostsData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
  /*
  return [
    {
      params: {
        id: "pre-rendering",
      },
    },
    {
      params: {
        id: "ssg-ssr",
      },
    },
  ];
  */
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHtml = String(blogContent);

  return {
    id,
    blogContentHtml,
    ...matterResult.data,
  };
}
