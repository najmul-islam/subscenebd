import { useParams } from "react-router-dom";

const GenreSubtitleList = () => {
  const { genreName } = useParams();
  console.log(genreName);
  return <div>GenreSubtitleList</div>;
};
export default GenreSubtitleList;
