
import styles from "./page.module.css";


export default async function Home() {
  let api = await fetch('https://fdnd-agency.directus.app/items/mh_day?filter[date]=2024-10-08&sort=shows.mh_shows_id.from&fields=shows.mh_shows_id.show.name,shows.id,shows.mh_shows_id.show.id,shows.mh_shows_id.show.radiostation.name,shows.mh_shows_id.show.radiostation.id,shows.mh_shows_id.show.users.id,shows.mh_shows_id.show.users.mh_users_id.full_name,shows.mh_shows_id.show.users.mh_users_id.cover,shows.mh_shows_id.from,shows.mh_shows_id.until,shows.mh_shows_id.show.body,shows.mh_shows_id.show.thumbnail.id,shows.mh_shows_id.show.headermobile.id,shows.mh_shows_id.show.headerdesktop.id')
  let data = await api.json()

  return (
    <div>
  <ul>
    {data?.data?.[0]?.shows?.map(show => (
      <li key={show.id}><p>{show.id}</p></li>
    ))}
  </ul>
</div>

  );
}
