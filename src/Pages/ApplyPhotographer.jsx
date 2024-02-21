import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import poster from "../assets/images/camera.png";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import { useNavigate } from "react-router-dom";
import { applyVendorAPI } from "../Services/allAPI";
import { ToastContainer, toast } from "react-toastify";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let photographyGenres = [
  "Portrait",
  "Landscape",
  "Macro",
  "Street",
  "Fashion",
  "Wildlife",
  "Fine Art",
  "Architectural",
  "Documentary",
  "Event",
  "Sports",
  "Astrophotography",
  "Black and White",
  "Travel",
  "Abstract",
  "Underwater",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ApplyPhotographer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const data = {
    coverImage: "",
    name: "",
    city: "",
    state: "",
    genres: [],
    description: "",
    photos: [],
  };
  const [userData, setUserData] = useState(data);
// setPersonName("Portrait")
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setUserData({
      ...userData,
      genres: typeof value === "string" ? value.split(",") : value,
    });
  };

  useEffect(() => {
    if (userData.coverImage) {
      console.log("Generate image url");
      setPreview(URL.createObjectURL(userData.coverImage));
    } else {
      setUserData({ ...userData, coverImage: "" });
      setPreview("");
    }
  }, [userData.coverImage]);

  

  
  const handleApply = async () => {
    const { coverImage, name, city, state, description, genres } = userData;
  
    // Check if any required field is missing
    if (!coverImage || !name || !description || !city || !state || !genres) {
      toast.error("Please provide all required details");
    } else {
        console.log("data",userData);
        const reqBody = new FormData();
      reqBody.append("coverImage", coverImage);
      reqBody.append("name", name);
      reqBody.append("description", description);
      reqBody.append("city", city);
      reqBody.append("state", state);
      genres.forEach((genre) => {
        reqBody.append("genres[]", genre);
      });
      userData.photos.forEach((photo) => {
        reqBody.append("photos", photo);
      });

      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          Authorization: `Bearer ${token}`
        };
        try {
          dispatch(showLoading());
          const response = await applyVendorAPI(reqBody, reqHeader);
          if (response.data.success) {
          dispatch(hideLoading());
            toast.success(response.data.message); // Fixed typo here
            navigate("/");
          } else {
            toast.info(response.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          toast.error("something went wrong");
        }
      }
    }
  };
  
  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const updatedPhotos = [];
    for (let i = 0; i < files.length; i++) {
      updatedPhotos.push(files[i]);
    }
    setUserData({
      ...userData,
      photos: updatedPhotos,
    });
  };

  return (
    <>
      <Navbar />
      <div className="my-6">
        <h1 className="text-4xl my-12 ms-10">
          Apply for{" "}
          <span className="text-blue-600 font-bold text-5xl">Vendors</span>
        </h1>
        <div className="px-8 flex flex-col gap-10 items-center mt-7 w-2/3 mx-auto ">
          <div>
            <label className="flex flex-col items-center">
              {" "}
              <span className="text-2xl my-3 font-medium">
                Select Cover Image
              </span>
              <img
                style={preview ? { width: "400px", height: "250" } : null}
                className=" cursor-pointer rounded-lg  object-cover"
                src={preview ? preview : poster}
                alt=""
              />
              <input
                className=""
                type="file"
                accept="image/*"
                name="coverImage"
                id=""
                style={{ display: "none" }}
                onChange={(e) =>
                  setUserData({ ...userData, coverImage: e.target.files[0] })
                }
              />
            </label>
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="standard-basic"
              label="Name"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              variant="standard"
            />
          </div>
          <div className="flex gap-8 w-full">
            <TextField
              className=" w-full"
              id="standard-basic"
              label="City"
              variant="standard"
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
            />
            <TextField
              className="w-full"
              id="standard-basic"
              label="State"
              variant="standard"
              onChange={(e) =>
                setUserData({ ...userData, state: e.target.value })
              }
            />
          </div>
          <div className="w-full">
            <FormControl sx={{ width: "100% " }}>
              <InputLabel id="demo-multiple-chip-label">
                Photography Genres
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Photography Genres"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {photographyGenres.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={8}
              onChange={(e) =>
                setUserData({ ...userData, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold underline">Upload Images</h1>
                <div className="my-4 flex flex-col items-center">
                  <h1 className="text-xl my-3">Upload  Genre photos</h1>
                  <input
                    required
                    className="p-3 border border-gray-300 rounded "
                    type="file"
                    name="photos"
                    onChange={handlePhotoUpload}
                    id="images"
                    accept="image/*"
                    multiple
                  />
                </div>
          </div>
          <div>
            <button onClick={handleApply} className="apply">
              {" "}
              Button
            </button>
          </div>
        </div>
        <ToastContainer autoClose={2000} position="top-center" />
      </div>
    </>
  );
};

export default ApplyPhotographer;
