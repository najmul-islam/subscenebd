import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import JSZip from "jszip";
import moment from "moment";
import converter from "number-to-words";
import { seriesApi } from "../../../features/series/seriesApi";
import { usePostSubtitleMutation } from "../../../features/subtitle/subtitleApi";
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
import SingleMedia from "./SingleMedia";
import {
  ArrowForwardOutlined,
  AttachFileOutlined,
  Delete,
  UploadFileOutlined,
} from "@mui/icons-material";

const SeriesSubCreate = () => {
  const [series, setSeries] = useState([]);
  const [season, setSeason] = useState({});
  const [subtitleFiles, setSubtitleFiles] = useState([]);

  const { seriesId, seasonId } = useParams();
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
    // convert season number to word and orginaize title
    const seasonNumber = converter
      .toWordsOrdinal(season?.season_number)
      .replace(/^\w/, (firstLetter) => firstLetter.toUpperCase());
    const originalName =
      series.name === series.original_name ? "" : ` (${series.original_name})`;
    const title =
      `${series.name}${originalName} - ${seasonNumber} Season`.trim();

    // relese name
    const release_name = JSON.stringify(
      values.release_name.filter((value) => value !== "")
    );

    // relese date
    const release_date = moment(season.air_date.release_date).year();

    // genres
    const genres = JSON.stringify(series?.genres.map((genre) => genre.name));

    // appned from data
    const formData = new FormData();
    formData.append("subtitle", values.subtitle);
    formData.append("tmdbId", season?.id);
    formData.append("title", title);
    formData.append("subtitle_name", series?.name);
    formData.append("description", values.description);
    formData.append("release_name", release_name);
    formData.append("media_type", "series");
    formData.append("release_date", release_date);
    formData.append("backdrop_path", series?.backdrop_path);
    formData.append("poster_path", season?.poster_path);
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

  useEffect(() => {
    // get series
    dispatch(seriesApi.endpoints.getSeriesById.initiate(seriesId))
      .unwrap()
      .then((data) => setSeries(data));

    // get season
    dispatch(seriesApi.endpoints.getSeasonById.initiate({ seriesId, seasonId }))
      .unwrap()
      .then((data) => setSeason(data));
  }, [dispatch, seriesId, seasonId]);

  console.log("series: ", series);
  console.log("season: ", season);
  console.log("subtitle: ", subtitle);

  return (
    series &&
    season && (
      <Box>
        {/* heading */}

        {/* <Grid container spacing={2} padding={2}>
          <Grid item md={6} xs={12}>
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
              <Typography
                variant="h6"
                textAlign="center"
                marginLeft={{ xs: "0", lg: "-140px" }}
                paddingY={2}
              >
                Upload Subtitle
              </Typography>
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
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
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

              <h1>
                Name: {series.name} -{" "}
                {season?.season_number
                  ? converter
                      .toWordsOrdinal(season?.season_number)
                      .replace(/^\w/, (firstLetter) =>
                        firstLetter.toUpperCase()
                      )
                  : null}{" "}
                Season
              </h1>
              <h2>Year: {moment(season.release_date).year()}</h2>
              <Button variant="outlined" type="submit">
                Upload
              </Button>
            </Box>
          </Grid>
        </Grid> */}

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
          <Grid item md={6} xs={12}>
            <Box component="form" onSubmit={handleSubmit}>
              <Box marginBottom={1}>
                <Button
                  variant="outlined"
                  startIcon={<UploadFileOutlined />}
                  component="label"
                  sx={{ fontWeight: "600" }}
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
                <Button variant="contained" onClick={handleAddReleaseName}>
                  Add more name
                </Button>
              </Box>

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

              <Button variant="contained" type="submit">
                Submit Subtitle
              </Button>
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <SingleMedia media={season} />
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default SeriesSubCreate;
