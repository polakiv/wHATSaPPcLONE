import React, { useState } from "react";
//import TooltipCustom from '../shared/TooltipCustom';
// import db from '../firebase';
import Button from "@material-ui/core/Button";
// import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
//import ChatIcon from '@material-ui/icons/Chat';
import Tablet from "../images/tablets.png";

function YourRole({ user, db, firebase }) {
  localStorage.setItem("gps", "");
  localStorage.setItem("gps_sum", "");

  navigator.geolocation.getCurrentPosition(function (position) {
    // Текущие координаты.
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    let gps = lat + ", " + lng;
    let gps_sum = lat + lng;

    localStorage.setItem("lat", lat);
    localStorage.setItem("lng", lng);
    localStorage.setItem("gps", gps);
    localStorage.setItem("gps_sum", gps_sum);
    let accuracy = position.coords.accuracy;
    localStorage.setItem("accuracy", accuracy);
    //console.log("lat доступна " + lat); // Геолокация доступна
    //console.log("lng доступна " + lng); // Геолокация доступна
    //console.log("accuracy доступна " + accuracy); // Погрешность
    //console.log("Cумма координат " + gps_sum); // Погрешность
  });

  const [roomName, setRoomName] = useState("");
  const [open, setOpen] = useState(
    !localStorage.getItem("role") ? true : false
  );
  const [role, setRole] = useState(localStorage.getItem("role"));
 

  const handleYourRoleOpen = () => {
    setOpen(true);
  };

  const handleYourRoleClose = () => {
    setOpen(false);
    setRoomName("");
  };

  const createYourRoleRider = (e) => {
    e.preventDefault();

    if (user.uid) {
      db.collection("rooms")
        .doc(user.uid)
        .update({
          role: "Пассажир",
          coord: localStorage.getItem("gps"),
          coord_sum: localStorage.getItem("gps_sum"),
        })
        .then(function () {
          console.log("Document successfully updated!");
          localStorage.setItem("role", "Пассажир");
          setRole("Пассажир");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
    setOpen(false);
  };

  const createYourRoleDriver = (e) => {
    e.preventDefault();

    if (user.uid) {
      db.collection("rooms")
        .doc(user.uid)
        .update({
          role: "Водитель",
          coord: localStorage.getItem("gps"),
          coord_sum: localStorage.getItem("gps_sum"),
        })
        .then(function () {
          console.log("Document successfully updated!");
          localStorage.setItem("role", "Водитель");
          setRole("Водитель");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
    setOpen(false);
  };

  return (
    <div>
      {/*}  <TooltipCustom 
                name="New YourRole" 
                onClick={() => handleYourRoleOpen()} 
                icon={<ChatIcon />}
            />*/}
      <span style={{ cursor: "pointer" }} onClick={() => handleYourRoleOpen()}>
        <img
          src={Tablet}
          alt="YouLrole"
          style={{ maxWidth: 40, paddingTop: 20, cursor: "pointer" }}
          onClick={() => handleYourRoleOpen()}
        />
        {role}
      </span>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Выберите кто вы сегодня:{" "}
        </DialogTitle>
        <DialogContent>
          {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Room Name"
                        type="text"
                        fullWidth
                        value={roomName}
                        onChange={e => setRoomName(e.target.value)}
                   />*/}
          <img src={Tablet} alt="YouLrole" style={{ maxWidth: "100%" }} />
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-around" }}>
          <Button onClick={createYourRoleDriver} color="primary">
            Водитель
          </Button>
          <Button onClick={createYourRoleRider} color="primary">
            Пассажир
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default YourRole;
