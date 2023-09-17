import { Box } from "@mui/material";
import SubtitleList from "../../components/public/subtitles/SubtitleList";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  subtitleApi,
  useGetSubtitlesQuery,
} from "../../features/subtitle/subtitleApi";
import { useEffect, useState } from "react";

const MusicsPage = () => {
  const { pathname } = useLocation();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetSubtitlesQuery({
    type: pathname.split("/")[1],
    media_type: "music",
  });

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        subtitleApi.endpoints.getMoreSubtitles.initiate({
          type: pathname.split("/")[1],
          media_type: "music",
          page,
        })
      );
    }
  }, [dispatch, page, pathname]);

  useEffect(() => {
    if (data?.total > 0) {
      const more = Math.ceil(data?.total / Number(36)) > page;

      setHasMore(more);
    }
  }, [data, page]);
  return (
    <Box>
      <SubtitleList
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchMore={fetchMore}
        hasMore={hasMore}
      />
    </Box>
  );
};

export default MusicsPage;
