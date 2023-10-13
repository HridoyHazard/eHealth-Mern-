import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import meds from "./data/meds.js";
import bloods from "./data/bloods.js";
import doctors from "./data/doctors.js";
import Medicine from "./models/medModel.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";
import Doctor from "./models/doctorModel.js";
import Blood from "./models/bloodModel.js";
import Appointment from "./models/appointmentModel.js";
import RequestBlood from "./models/requestModel.js";



dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Medicine.deleteMany();
    await Doctor.deleteMany();
    await Blood.deleteMany();
    await User.deleteMany();
    

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleMedicines = meds.map((med) => {
      return { ...med, user: adminUser };
    });
    const sampleDoctors = doctors.map((doctor) => {
      return {...doctor, user: adminUser };
    });

    const sampleBloods = bloods.map((blood) => {
      return {...blood, user: adminUser };
    });

    await Medicine.insertMany(sampleMedicines);
    await Doctor.insertMany(sampleDoctors);
    await Blood.insertMany(sampleBloods);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Medicine.deleteMany();
    await Doctor.deleteMany();
    await Blood.deleteMany();
    await User.deleteMany();
    await Appointment.deleteMany();
    await RequestBlood.deleteMany();


    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
