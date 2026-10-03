const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    })
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    patientName: String,
    age: Number,
    gender: String,
    treatment: String,
    appointmentDate: String,
    appointmentTime: String,
    phone: String,
    symptoms: String
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Home Route
app.get("/", (req, res) => {
    res.send("Ojas Aarogya Mandir Backend is Running!");
});

// POST - Book Appointment
app.post("/appointments", async (req, res) => {
    try {
        const appointment = new Appointment(req.body);

        await appointment.save();

        console.log("Appointment saved:", appointment);

        res.status(201).json({
            message: "Appointment booked successfully!",
            appointment: appointment
        });
    } catch (error) {
        console.log("Save error:", error);

        res.status(500).json({
            message: "Unable to book appointment",
            error: error.message
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});