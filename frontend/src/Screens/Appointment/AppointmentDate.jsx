import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import AppointmentSteps from "../../components/AppointmentSteps";
import { Container, Box, Paper, Grid } from "@material-ui/core";
import images01 from "../../images/appointment/appointment2.svg";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { saveDateTime } from "../../slices/choiceSlice";
import DateFnsUtils from "@date-io/date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AppointmentDate = () => {
  const choice = useSelector((state) => state.choice);
  const { DateTime } = choice;
  // const minTime = new Date("8/3/2023 5:00 PM");
  // const maxTime = new Date("8/3/23 11:30 PM");

  const [selectedDate, setSelectedDate] = useState(DateTime.selectedDate || "");
  const [selectedTime, setSelectedTime] = useState(DateTime.selectedTime || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.warning("Please select both date and time");
      return;
    } else {
      dispatch(saveDateTime({ selectedDate, selectedTime }));
      console.log(selectedDate, selectedTime);
      navigate("/appointmentaddress");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  return (
    <>
      <FormContainer>
        <AppointmentSteps steps={1} />
      </FormContainer>
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <div className="row mt-4">
            <div className="col-md-5">
              <img
                src={images01}
                className="img-fluid"
                alt="appointment booking"
              ></img>
            </div>
            <div className="col-md-5 mt-4">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container-fluid>
                  <KeyboardDatePicker
                    disablePast
                    disableToolbar
                    margin="normal"
                    id="date-picker-dialog"
                    placeholder="Select The Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                      required: true,
                      variant: "outlined",
                    }}
                  />
                </Grid>
                <Grid container>
                  <KeyboardTimePicker
                    placeholder="Select The Time"
                    mask="__:__ _M"
                    value={selectedTime}
                    onChange={(time) => handleTimeChange(time)}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div className="d-grid gap-2 d-md-block mt-5 ml-5">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={submitHandler}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default AppointmentDate;
