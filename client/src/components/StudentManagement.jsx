import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../Styles/Attendance.css";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentCategory, setStudentCategory] = useState("");
  const [studentPRN, setStudentPRN] = useState("");
  const [gender, setGender] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [resume, setResume] = useState(null);
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");  // New password state
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch categories from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8082/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

useEffect(() => {
  axios
    .get("http://localhost:8082/api/students")
    .then((response) => {
      // Assuming the response data is an array of students
      const studentsData = response.data; // Adjust this based on your actual API response structure

     
      setStudents(studentsData); // Save the students data to state
    })
    .catch((error) => {
      console.error("There was an error fetching the students!", error);
    });
}, []);

  const handleFileUpload = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8082/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data; // Assume backend returns the file URL
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await axios.delete(`http://localhost:8082/api/students/${studentId}`);
      setStudents((prev) => prev.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete the student. Please try again.");
    }
  };

  // Handle adding or updating a student
  const handleAddStudent = async () => {
    if (
      !studentName ||
      !studentCategory ||
      !studentPRN ||
      !gender ||
      !fatherName ||
      !email ||
      !dob ||
      !password  // Ensure password is provided
    ) {
      alert("Please enter all required fields.");
      return;
    }

    try {
      // Set the role to 'USER' by default
      const resumeUrl = await handleFileUpload(resume);
      const imageUrl = await handleFileUpload(image);

      const newStudent = {
        id: editingStudent ? editingStudent.id : null,
        name: studentName,
        category: { id: studentCategory },
        prn: studentPRN,
        gender,
        fatherName,
        email,
        dob,
        resume: resumeUrl,
        image: imageUrl,
        password,  // Include the password in the student object
        role: "USER", // Set the role as 'USER' here
      };

      if (editingStudent) {
        // If editing, update student
        const response = await axios.put(
          `http://localhost:8082/api/students/${editingStudent.id}`,
          newStudent
        );
        setStudents(
          students.map((student) =>
            student.id === editingStudent.id ? response.data : student
          )
        );
        setEditingStudent(null);
      } else {
        // If adding, create new student
        const response = await axios.post(
          "http://localhost:8082/api/students",
          newStudent
        );
        setStudents([...students, response.data]);
      }

      // Reset form
      setStudentName("");
      setStudentCategory("");
      setStudentPRN("");
      setGender("");
      setFatherName("");
      setEmail("");
      setDob("");
      setResume(null);
      setImage(null);
      setPassword("");  // Reset password field
    } catch (error) {
      console.error("There was an error saving the student!", error);
    }
  };

  // Handle edit action
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentName(student.name);
    setStudentCategory(student.category.id);
    setStudentPRN(student.prn);
    setGender(student.gender);
    setFatherName(student.fatherName);
    setEmail(student.email);
    setDob(student.dob);
    setResume(student.resume);
    setImage(student.image);
    setPassword("");  // Don't pre-fill password for editing
  };

  return (
    <div className="d-flex">
      <div className="col-md-3 col-lg-3 sidebar">
        <Sidebar />
      </div>
      <div className="flex-grow-1 p-4 bg-light">
        <h2 className="text-center mb-4 text-primary">
          {editingStudent ? "Edit Student" : "Student Management"}
        </h2>
        <form
          className="form-container mb-4 p-4 border rounded shadow-sm bg-white"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">PRN Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="PRN Number"
                value={studentPRN}
                onChange={(e) => setStudentPRN(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={studentCategory}
                onChange={(e) => setStudentCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Father's Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Father's Name"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Resume</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Profile Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success mt-3 w-100"
            onClick={handleAddStudent}
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </form>
        <h3 className="text-center mb-4 text-secondary">
          Student & Teachers List
        </h3>
        <div className="student-list mt-4">
          {students.map((student) => (
            <div
              key={student.id}
              className={`card shadow-sm p-3 mb-4 border-0 rounded ${
                student.role === "PROFESSOR" ? "bg-info" : ""
              }`} // Added conditional class
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0 text-primary">{student.name}</h5>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p>
                <strong>Category:</strong> {student.category.name}
              </p>
              <p>
                <strong>PRN:</strong> {student.prn}
              </p>
              <p>
                <strong>Gender:</strong> {student.gender}
              </p>
              <p>
                <strong>Father's Name:</strong> {student.fatherName}
              </p>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
              <p>
                <strong>Date of Birth:</strong> {student.dob}
              </p>
              <p>
                <strong>Profile Image:</strong>{" "}
                {student.image ? (
                  <a
                    href={student.image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                ) : (
                  "No image uploaded"
                )}
              </p>
              <p>
                <strong>Resume:</strong>{" "}
                {student.resume ? (
                  <a
                    href={student.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume
                  </a>
                ) : (
                  "No resume uploaded"
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
