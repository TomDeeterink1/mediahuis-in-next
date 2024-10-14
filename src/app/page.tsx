
import styles from "./page.module.css";


export default async function Home() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
  <div>
    {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
  </div>
  );
}
