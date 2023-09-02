import React, { useEffect, useState } from "react";
import moment from "moment";
import JSZip from "jszip";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { movieApi } from "../../../features/movie/movieApi";
import { usePostSubtitleMutation } from "../../../features/subtitle/subtitleApi";
import {
  UploadFileOutlined,
  AttachFileOutlined,
  ArrowForwardOutlined,
  Delete,
} from "@mui/icons-material";

import SingleMedia from "./SingleMedia";

const MovieSubCreate = () => {
  const [subtitleFiles, setSubtitleFiles] = useState([]);
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // post subtitle api
  const [postSubtitle, { data: subtitle, isLoading, isSuccess }] =
    usePostSubtitleMutation();

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
    formData.append("release_type", values.release_type);
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

  useEffect(() => {
    if (subtitle && isSuccess) {
      navigate("/latest/all");
    }
  }, [isSuccess, subtitle, navigate]);

  return (
    movie && (
      <Box>
        <Typography
          variant="h6"
          textAlign="center"
          marginLeft={{ xs: "0", lg: "-140px" }}
          paddingY={2}
        >
          Upload Subtitle
        </Typography>
        <Divider variant="middle" />

        <Grid container spacing={2} padding={2}>
          <Grid item sm={7} xs={12}>
            <Box component="form" onSubmit={handleSubmit}>
              {/* input file */}
              <Box marginBottom={1}>
                <Button
                  variant="outlined"
                  startIcon={<UploadFileOutlined />}
                  component="label"
                  sx={{ fontWeight: "600", textTransform: "none" }}
                >
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
              </Box>

              {/* subtitle files */}
              <Box
                boxShadow={1}
                borderRadius={1}
                padding={1}
                bgcolor="#BDBDBD"
                // bgcolor="#f7f7f7"
                sx={{ minHeight: "90px" }}
              >
                <Typography
                  display="flex"
                  alignItems="center"
                  variant="subtitle2"
                  noWrap
                  fontSize="16px"
                  color="#1976D2"
                >
                  <AttachFileOutlined
                    sx={{ fontSize: "16px", marginRight: "3px" }}
                  />
                  {values?.subtitle?.name}
                </Typography>

                {subtitleFiles.map((file, i) => (
                  <Typography
                    display="flex"
                    alignItems="center"
                    noWrap
                    title={file.name}
                    variant="body2"
                    key={i}
                    marginLeft={2}
                  >
                    <ArrowForwardOutlined
                      sx={{ fontSize: "13px", marginRight: "3px" }}
                    />
                    {file.name}
                  </Typography>
                ))}
              </Box>

              {/* release name */}
              <Box marginY={3}>
                {values.release_name.map((name, index) => (
                  <Stack
                    direction="row"
                    spacing={1}
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                    marginBottom={1}
                  >
                    <TextField
                      id={`release_name_${index}`}
                      label="Release name"
                      variant="outlined"
                      size="small"
                      name={`release_name_${index}`}
                      fullWidth
                      value={name}
                      onChange={(e) =>
                        handleReleaseNameChange(index, e.target.value)
                      }
                      required
                    />
                    {values.release_name.length === 1 ? null : (
                      <Button
                        variant="contained"
                        onClick={() => handleRemoveReleaseName(index)}
                        color="secondary"
                        startIcon={<Delete />}
                      >
                        Remove
                      </Button>
                    )}
                  </Stack>
                ))}
                <Button
                  variant="contained"
                  onClick={handleAddReleaseName}
                  sx={{ textTransform: "none" }}
                >
                  Add more name
                </Button>
              </Box>

              {/* rlease type */}
              <Box marginY={3}>
                <FormControl size="small" sx={{ width: "100%", my: "2" }}>
                  <InputLabel id="release_type">Release type</InputLabel>
                  <Select
                    labelId="release_type"
                    id="release_type"
                    name="release_type"
                    value={values.release_type}
                    label="Release type"
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
              </Box>

              {/* description */}
              <Box marginY={3}>
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  name="description"
                  multiline
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <Button
                variant="contained"
                type="submit"
                sx={{ textTransform: "none" }}
              >
                {isLoading ? "Submitting..." : "Submit subtitle"}
              </Button>
            </Box>
          </Grid>

          {/* single movie */}
          <Grid item sm={5} xs={12}>
            <SingleMedia media={movie} />
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default MovieSubCreate;
