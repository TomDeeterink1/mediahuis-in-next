"use client";
import styles from "../page.module.css"; // Import CSS module
import Card from "./card";
import Header from "./header";
import { useMemo, useEffect, useState } from "react";

// header

// Main Home Component
export default function Home() {
  const [groupedShows, setGroupedShows] = useState({}); // State to hold the grouped shows
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(
          'https://fdnd-agency.directus.app/items/mh_day?filter[date]=2024-10-08&sort=shows.mh_shows_id.from&fields=shows.mh_shows_id.show.name,shows.id,shows.mh_shows_id.show.id,shows.mh_shows_id.show.radiostation.name,shows.mh_shows_id.show.radiostation.id,shows.mh_shows_id.show.users.id,shows.mh_shows_id.show.users.mh_users_id.full_name,shows.mh_shows_id.show.users.mh_users_id.cover,shows.mh_shows_id.from,shows.mh_shows_id.until,shows.mh_shows_id.show.body,shows.mh_shows_id.show.thumbnail.id,shows.mh_shows_id.show.headermobile.id,shows.mh_shows_id.show.headerdesktop.id'
        );
        const data = await response.json();

        // Process the data and group it by radio station
        const grouped = groupByRadioStation(
          (data && data.data && data.data[0] && data.data[0].shows) || []
        );

        setGroupedShows(grouped);
      } catch (err) {
        setError('Failed to fetch shows');
      } finally {
        setLoading(false);
      }
    };

    fetchShows(); // Trigger the fetch when component mounts
  }, []);

  // Helper function to group shows by radio station
  function groupByRadioStation(shows) {
    const radioStation = {};

    for (const show of shows) {
      const showId = show.mh_shows_id;

      const programShow = showId && showId.show;
      const station = programShow && programShow.radiostation;
      const stationName = station && station.name ? station.name : 'Unknown Station';

      if (!radioStation[stationName]) {
        radioStation[stationName] = [];
      }

      radioStation[stationName].push(show);
    }

    // Sort each station's shows by 'from' time
    for (const stationName in radioStation) {
      radioStation[stationName].sort((a, b) => {
        const fromA = a.mh_shows_id?.from || '00:00';
        const fromB = b.mh_shows_id?.from || '00:00';
        return fromA.localeCompare(fromB);
      });
    }

    return radioStation;
  }

  function getShowTime(show) {
    const showId = show.mh_shows_id
    // Haalt de tijden op, als er geen tijden zijn, gebruik dan 00:00
    const from = showId && showId.from ? showId.from : '00:00';
    const until = showId && showId.until ? showId.until : '00:00';

    // Verkleint de tijd van 04:00:00 naar 04:00
    const formattedFrom = from.slice(0, 5);
    const formattedUntil = until.slice(0, 5);

    return `${formattedFrom} - ${formattedUntil}`;
}

  // Helper function to get the image source
function getImageSource(show) {
    const programShow = show.mh_shows_id.show;
    const firstUser =
      programShow &&
      programShow.users &&
      programShow.users[0] &&
      programShow.users[0].mh_users_id &&
      programShow.users[0].mh_users_id.cover;
  
    const thumbnail = programShow && programShow.thumbnail && programShow.thumbnail.id;
  
    return firstUser ? `/${firstUser}` : thumbnail ? `/${thumbnail}` : '/default-image.jpg';
  }
  
  

  // Render Loading, Error or Shows
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (

    <div className={styles.schedule}>
      {Object.keys(groupedShows).length > 0 ? (
        Object.entries(groupedShows).map(([stationName, stationShows]) => (
          <div key={stationName} className={styles.schedule__stationrow}>
            <h2>{stationName}</h2>
            <div className={styles.schedule__stationshows}>
              {stationShows.map((show, i) => (
                <Card 
                programName= {show.mh_shows_id.show.name}
                imgSrc= {getImageSource(show)}
                programLink = "shows/{show.mh_shows_id.show.id}"
                time={getShowTime(show)}
             />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Er zijn geen programma's</p>
      )}
    </div>
  );
}


