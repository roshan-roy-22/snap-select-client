import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import poster from "../../assets/images/camera.png";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import "../../index.css";
import { getPhotographersDetails } from "../../Services/allAPI";
import { SERVER_URL } from "../../Services/serverURL";


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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Profile = () => {
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
  const [personName, setPersonName] = useState([]);
  const theme = useTheme();
  const [profile, Setprofile] = useState({
    coverImage: "",
    name: "",
    city: "",
    state: "",
    genres: [],
    description: "",
    photos: [],
  });

  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [coverExistingImage,setCoverExistingImage]=useState("")

  const fetchDetails = async () => {
    // console.log(localStorage.getItem("token"));
    try {
      const token = localStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const response = await getPhotographersDetails(reqHeader);
      if (response.data.success) {

        Setprofile({...profile,name:response.data.data.name,city:response.data.data.city,state:response.data.data.state,description:response.data.data.description,genres:response.data.data.genres})
        // Setprofile(response.data.data);
        setCoverExistingImage(response.data.data.coverImage)
        // console.log(coverExistingImage);
        console.log(profile);
      }
    } catch (error) {}
  };

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
    fetchDetails();
  }, []);
  console.log(coverExistingImage);

  useEffect(() => {
    if (profile.coverImage) {
      setCoverImagePreview(URL.createObjectURL(profile.coverImage))
    }
  }, [])
  

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-6">
        <div></div>
        <div className="col-span-4 flex flex-col items-center">
          <h1 className="m-4 text-4xl">Edit Profile</h1>
          <div>
            <div>
              <label className="cursor-pointer">
                <input className="hidden" type="file" name="coverImage" id="" onChange={(e)=>Setprofile({...profile,coverImage:e.target.files[0]})}  />
                <img src={coverImagePreview ? coverImagePreview :`${SERVER_URL}/uploads/${coverExistingImage[0]?.filename}`} alt="" />
              </label>
            </div>
            <div className="my-6">
              <TextField
                className="w-full"
                id="standard-basic"
                label="Name"
                variant="filled"
                value={profile?.name}
              />
            </div>
            <div className="flex gap-8 w-full">
              <TextField
                className=" w-full"
                id="standard-basic"
                label="City"
                variant="standard"
                value={profile.city}
              />
              <TextField
                className="w-full"
                id="standard-basic"
                label="State"
                variant="standard"
                value={profile?.state}
               autoFocus
              />
            </div>
            <div className="my-6">
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
            <div>
              <TextField
                className="w-full"
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={8}
                value={profile.description}
              />
            </div>
            <div className="my-3">
              <h1>Add images</h1>
              <input
                required
                className="p-3 border border-gray-300 rounded "
                type="file"
                name="photos"
                id="images"
                accept="image/*"
                multiple
              />
            </div>
            <div>
              <button className="apply">Edit</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Profile;
