// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import download from "downloadjs";
// import { Button } from "@mui/material";

// const url = "/api/subs";

// const Home = () => {
//   const [subtitles, setSubtitles] = useState([]);

//   const fetchSubtitle = async () => {
//     try {
//       const response = await axios.get(url);
//       setSubtitles(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchSubFile = async (id, path, mimetype) => {
//     try {
//       const result = await axios.get(`${url}/${id}/download`, {
//         responseType: "blob",
//       });
//       const split = path.split("/");
//       const filename = split[split.length - 1];

//       return download(result.data, filename, mimetype);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchSubtitle();
//   }, []);

//   const handleClick = (id) => {};

//   console.log(subtitles);
//   return (
//     <>
//       {subtitles.map((subtitle) => (
//         <div>
//           <h1>{subtitle.title}</h1>
//           <h3>{subtitle.releaseDate}</h3>
//           {/* <button type="button" onClick={() => handleClick(subtitle._id)}>
//             Download
//           </button> */}

//           <a
//             href="#/"
//             onClick={() =>
//               fetchSubFile(subtitle._id, subtitle.sublink, subtitle.mimetype)
//             }
//           >
//             Download
//           </a>
//         </div>
//       ))}

//       <Button>Click me</Button>
//     </>
//   );
// };

// export default Home;

import React from "react";

const Home = () => {
  return <div>Home</div>;
};

export default Home;
