import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    treatment: "",
    appointmentDate: "",
    appointmentTime: "",
    phone: "",
    symptoms: ""
  });

  const [message, setMessage] = useState("");

  const treatments = [
    "Rheumatoid Arthritis",
    "Arthritis / Joint Pain",
    "Spinal Disorders",
    "Piles / Hemorrhoids",
    "Diabetes",
    "High Blood Pressure",
    "Digestive Disorders",
    "Skin Disorders",
    "Asthma",
    "Weight Loss",
    "Women’s Health Problems",
    "Menstrual Problems",
    "Infertility",
    "Migraine",
    "Thyroid Disorders"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();

    console.log("BOOK APPOINTMENT CLICKED");
    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "https://ojas-aarogya-experiment.onrender.com/appointments",
        formData
      );

      console.log("Backend Response:", response.data);

      setMessage(response.data.message);

      setFormData({
        patientName: "",
        age: "",
        gender: "",
        treatment: "",
        appointmentDate: "",
        appointmentTime: "",
        phone: "",
        symptoms: ""
      });
    } catch (error) {
      console.log("Axios Error:", error);
      setMessage("Unable to book appointment. Please try again.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <div className="logo-icon">🌿</div>
          <div>
            <h2>Ojas Aarogya Mandir</h2>
            <p>Ayurvedic & Panchakarma Clinic</p>
          </div>
        </div>

        <div className="header-info">
          <span>🌿 Natural Healing</span>
          <span>🕉️ Ayurveda Care</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <p className="small-title">WELCOME TO OJAS AAROGYA MANDIR</p>

          <h1>
            Begin Your Journey Towards <span>Natural Wellness</span>
          </h1>

          <p>
            Experience traditional Ayurvedic treatments and personalized
            healthcare with our experienced Ayurvedic doctors.
          </p>

          <div className="features">
            <div>🌱 Ayurvedic Treatment</div>
            <div>💚 Personalized Care</div>
            <div>🌿 Holistic Wellness</div>
          </div>
        </div>

        <div className="hero-card">
          <div className="leaf">🌿</div>
          <h3>Ayurveda</h3>
          <p>Healing naturally, living completely.</p>
        </div>
      </section>

      <section className="appointment-section">
        <div className="section-heading">
          <p>APPOINTMENT REGISTRATION</p>
          <h2>Book Your Appointment</h2>
          <span>
            Fill in your details to schedule a consultation.
          </span>
        </div>

        <form onSubmit={bookAppointment} className="appointment-form">

          <div className="form-group">
            <label>Patient Name</label>

            <input
              type="text"
              name="patientName"
              placeholder="Enter your full name"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Treatment</label>

            <select
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              required
            >
              <option value="">Choose a treatment</option>

              {treatments.map((treatment, index) => (
                <option key={index} value={treatment}>
                  {treatment}
                </option>
              ))}

            </select>
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Appointment Date</label>

              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time</label>

              <select
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
              >
                <option value="">Select Time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>Symptoms / Health Concern</label>

            <textarea
              name="symptoms"
              placeholder="Briefly describe your symptoms or health concern..."
              value={formData.symptoms}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="book-btn">
            🌿 Book Appointment
          </button>

        </form>

        {message && (
          <div className="success-message">
            ✓ {message}
          </div>
        )}

      </section>

      <section className="doctors">

        <p>OUR SPECIALISTS</p>

        <h2>Experienced Ayurvedic Doctors</h2>

        <div className="doctor-container">

          <div className="doctor-card">
            <div className="doctor-icon">👨‍⚕️</div>

            <h3>Dr. Omkar Tukaram Khandekar</h3>

            <span>BAMS, MD Ayurveda</span>

            <p>
              Ayurvedic Physician & Panchakarma Specialist
            </p>
          </div>

          <div className="doctor-card">
            <div className="doctor-icon">👩‍⚕️</div>

            <h3>Dr. Anagha Omkar Khandekar</h3>

            <span>BAMS, MD Ayurveda</span>

            <p>
              Ayurvedic Physician & Women's Health Specialist
            </p>
          </div>

        </div>

      </section>

      <footer>
        <h3>🌿 Ojas Aarogya Mandir</h3>

        <p>Ayurvedic & Panchakarma Clinic</p>

        <p>
          Open Daily: 10:00 AM – 1:00 PM | 5:00 PM – 9:00 PM
        </p>
      </footer>

    </div>
  );
}

export default App;