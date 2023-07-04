import React, { useEffect, useState } from "react";
import moment from "moment";
import JSZip from "jszip";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { movieApi } from "../../../features/movie/movieApi";
import { usePostSubtitleMutation } from "../../../features/subtitle/subtitleApi";

const MovieSubCreate = () => {
  const [subtitleFiles, setSubtitleFiles] = useState([]);
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();
  const dispatch = useDispatch();

  // post subtitle api
  const [postSubtitle, { data: subtitle }] = usePostSubtitleMutation();

  // formik initial value obj
  const initialValues = {
    subtitle: null,
    description: "",
    release_name: [""],
    release_type: "",
  };

  // formik on submit func
  const onSubmit = (values) => {
    // title
    const original_title =
      movie?.title === movie?.original_title
        ? ""
        : ` (${movie?.original_title})`;
    const title = `${movie?.title}${original_title}`.trim();

    // release name
    const release_name = JSON.stringify(
      values.release_name.filter((value) => value !== "")
    );

    // genres
    const genres = JSON.stringify(movie?.genres.map((genre) => genre.name));

    // release date
    const release_date = moment(movie.release_date).year();
    
    // append form
    const formData = new FormData();
    formData.append("subtitle", values.subtitle);
    formData.append("tmdbId", movie?.id);
    formData.append("title", title);
    formData.append("subtitle_name", movie?.title);
    formData.append("description", values.description);
    formData.append("release_name", release_name);
    formData.append("media_type", "movie");
    formData.append("release_date", release_date);
    formData.append("backdrop_path", movie?.backdrop_path);
    formData.append("poster_path", movie?.poster_path);
    formData.append("genres", genres);

    try {
      postSubtitle(formData);
    } catch (error) {
      console.log(error);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  // destructior formik obj
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    setFieldValue,
  } = formik;

  // handle file change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFieldValue("subtitle", file);
    const zip = new JSZip();
    const zipData = await zip.loadAsync(file);

    const fileNames = Object.keys(zipData.files);

    // Extract each file from the zip file
    const extractedFiles = await Promise.all(
      fileNames.map(async (fileName) => {
        const fileData = await zipData.files[fileName].async("uint8array");
        return {
          name: fileName,
          data: fileData,
        };
      })
    );

    console.log(extractedFiles);
    setSubtitleFiles(extractedFiles);
  };

  // add release name field
  const handleAddReleaseName = () => {
    const newReleaseName = [...values.release_name, ""];
    if (values.release_name.length === 10) {
      return;
    }
    setFieldValue("release_name", newReleaseName);
  };

  // remove release name field
  const handleRemoveReleaseName = (index) => {
    const newReleaseName = [...values.release_name];
    if (values.release_name.length === 1) {
      return;
    }
    newReleaseName.splice(index, 1);
    setFieldValue("release_name", newReleaseName);
  };

  // change release name value
  const handleReleaseNameChange = (index, value) => {
    const newReleaseName = [...values.release_name];
    newReleaseName[index] = value;
    setFieldValue("release_name", newReleaseName);
  };

  useEffect(() => {
    dispatch(movieApi.endpoints.getMovieById.initiate(movieId))
      .unwrap()
      .then((data) => setMovie(data));
  }, [dispatch, movieId]);

  console.log("movie", movie);
  // console.log("formik: ", formik);
  // console.log("values: ", formik.values);
  console.log("subtitle: ", subtitle);
  // console.log("relase_name: ", values.release_name);
  return (
    movie && (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            my: 2,
            width: { xs: "100%", sm: "60%", md: "70%", xl: "40%" },
          },
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <Button variant="contained" component="label">
            Select Subtitle
            <input
              hidden
              multiple
              accept="application/x-zip-compressed"
              type="file"
              name="subtitle"
              onChange={handleFileChange}
            />
          </Button>
          <Box>{values?.subtitle?.name} </Box>
          <Box>
            {subtitleFiles.map((file, i) => (
              <p key={i}>{file.name}</p>
            ))}
          </Box>
        </div>
        <div>
          {values.release_name.map((name, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                id={`release_name_${index}`}
                label="Release name"
                variant="outlined"
                size="small"
                name={`release_name_${index}`}
                fullWidth
                value={name}
                onChange={(e) => handleReleaseNameChange(index, e.target.value)}
              />
              {values.release_name.length === 1 ? null : (
                <Button
                  variant="outlined"
                  onClick={() => handleRemoveReleaseName(index)}
                  sx={{ marginLeft: "1rem" }}
                >
                  Remove
                </Button>
              )}
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddReleaseName}>
            Add
          </Button>
        </div>

        <FormControl size="small" sx={{ width: "200px", my: "2" }}>
          <InputLabel id="release_type">Release type</InputLabel>
          <Select
            labelId="release_type"
            id="release_type"
            name="release_type"
            value={values.release_type}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">Don't Know</MenuItem>
            <MenuItem value="CAM">CAM</MenuItem>
            <MenuItem value="DVD">DVD</MenuItem>
            <MenuItem value="HDR">HDR</MenuItem>
            <MenuItem value="TV">TV</MenuItem>
            <MenuItem value="WEB">WEB</MenuItem>
            <MenuItem value="BR">BR</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            name="description"
            multiline
            rows={3}
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <h1>Name: {movie.title}</h1>
        <h2>Year: {moment(movie.release_date).year()}</h2>
        <Button variant="outlined" type="submit">
          Upload
        </Button>
      </Box>
    )
  );
};

export default MovieSubCreate;
