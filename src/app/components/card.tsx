
import styles from "../page.module.css"; // Import CSS module
import { useEffect, useRef, useState } from 'react';

export default function ProgramCard({
  imgSrc = '',           // Default image source if no image is passed
  programName = 'Unnamed Program',
  time = '00:00 - 00:00',
  programLink = '/'
}) {
  const [status, setStatus] = useState('');
  const [isOverflowing, setIsOverflowing] = useState(false);
  const wrapperRef = useRef(null);
  const wrapper2Ref = useRef(null);

  // Parse the start and end time
  let parts = time.split(' - ');
  let start = parseInt(parts[0].replace(':', ''), 10);
  let end = parseInt(parts[1].replace(':', ''), 10);

  start = start / 2.001953;
  end = end / 2.001953;

  // Get the current time in hh:mm format
  const d = new Date();
  const currentTime = d.getHours() * 100 + d.getMinutes();

  useEffect(() => {
    // Convert program times to numbers for comparison
    const startTime = parseInt(parts[0].replace(':', ''), 10);
    const endTime = parseInt(parts[1].replace(':', ''), 10);

    // Check if the current time falls between the program's start and end times
    if (startTime <= currentTime && currentTime <= endTime) {
      setStatus('active');
    } else {
      setStatus('');
    }

    // Check if the wrapper2 width is less than 400px
    checkWidth();

    // Add resize event listener to check width dynamically
    window.addEventListener('resize', checkWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, [time, currentTime]);

  function checkWidth() {
    if (wrapper2Ref.current && wrapper2Ref.current.clientWidth < 400) {
      wrapper2Ref.current.classList.add('narrow');
    } else if (wrapper2Ref.current) {
      wrapper2Ref.current.classList.remove('narrow');
    }
  }

  return (
    <a
      className={`${styles.card} ${styles[status]}`} // Dynamic class with CSS module
      href={programLink}
      style={{ "--start": start, "--end": end }} // Inline CSS style binding
    >
      <picture className={styles.image}>
        <img
          loading="lazy"
          src={imgSrc ? `https://fdnd-agency.directus.app/assets/${imgSrc}` : "/path/to/default/image.jpg"}
          alt={programName}
        />
      </picture>

      <article className={styles.content}>
        <div className={styles["title-wrapper"]}>
          <h2 className={isOverflowing ? styles.overflowing : ""}>{programName}</h2> {/* Conditional class */}
        </div>

        <div className={styles["time-stamp"]}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.33301 8.00004C1.33301 4.32671 4.32634 1.33337 7.99967 1.33337C11.673 1.33337 14.6663 4.32671 14.6663 8.00004C14.6663 11.6734 11.673 14.6667 7.99967 14.6667C4.32634 14.6667 1.33301 11.6734 1.33301 8.00004ZM2.66634 8.00004C2.66634 10.94 5.05967 13.3334 7.99967 13.3334C10.9397 13.3334 13.333 10.94 13.333 8.00004C13.333 5.06004 10.9397 2.66671 7.99967 2.66671C5.05967 2.66671 2.66634 5.06004 2.66634 8.00004ZM7.33301 8.27337V4.00004H8.66634V7.72671L11.1397 10.1934L10.193 11.14L7.33301 8.27337Z"
              fill="#8B8B8B"
            />
          </svg>
          <span>{time}</span>
        </div>
      </article>

      <div className={styles["visit-url"]}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_208_1034)">
            <path
              d="M5.13683 2.47016C4.87729 2.7297 4.87715 3.15045 5.13651 3.41016L8.82085 7.09956C9.21092 7.49016 9.2107 8.12295 8.82037 8.51329L5.13713 12.1965C4.87748 12.4562 4.87748 12.8772 5.13713 13.1368C5.39667 13.3963 5.81744 13.3965 6.07713 13.1371L10.7057 8.51377C11.0966 8.12331 11.0968 7.48984 10.7061 7.09915L6.07715 2.47016C5.81749 2.2105 5.39649 2.2105 5.13683 2.47016Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_208_1034">
              <rect
                width="6.74667"
                height="11.6067"
                fill="white"
                transform="translate(4.66699 2)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </a>
  );
}


//  <div className={styles.schedule}>
//       <h1>Program Schedule</h1>
//       {data && data.data && data.data[0] && data.data[0].shows ? (
//         // Een logische if else statement, in essentie checkt het laag voor laag of de data beschikbaar is of niet.
//         <div className={styles.schedule__radiostationrow}>
//           {data.data[0].shows.map((show) => (
//              // Als de data ingeladen is laat hij de card componend in, hier geef ik de juiste data mee
//             <Card 
//                 programName= {show.mh_shows_id.show.name}
//                 imgSrc= {getImageSource(show)}
//                 programLink = "shows/{show.mh_shows_id.show.id}"
//             />
//           ))}
//         </div>
//       ) : (
//         <p>No shows available for the selected date.</p>
//       )}
//     </div>