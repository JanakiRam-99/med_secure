import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function getCookie(name) {
  let cookieArray = document.cookie.split('; ');
  let cookie = cookieArray.find((row) => row.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : "";
}

const PatientsDashboard = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    problem: '',
    medicines: '',
    height: '',
    heartRate: '',
    weight: '',
    bloodGroup: '',
    accessPolicy: '',
    image: null,
  });

  const navigate = useNavigate()

  const [imagePreview, setImagePreview] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [userId, setUserId] = useState(getCookie('username'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleData = () => {
    navigate("/submission")
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImagePreview(reader.result);

        try {
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dvw9vd875/image/upload',
            {
              file: reader.result,
              upload_preset: "gfgcloud",
            }
          );
          setFormData((prevData) => ({
            ...prevData,
            image: response.data.url,
          }));
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://medsecure-hccy.onrender.com/data", { ...formData, userId })
      .then((response) => {
        if (response.data.status) {
          setSubmissions((prev) => [...prev, { ...formData, userId }]);
          setFormData({
            patientName: '',
            problem: '',
            medicines: '',
            height: '',
            heartRate: '',
            weight: '',
            bloodGroup: '',
            accessPolicy: '',
            image: null,
          });
          setImagePreview(null);
        }
      })
      .catch((err) => {
        console.error("Error storing data:", err);
      });
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`https://medsecure-hccy.onrender.com/data/${userId}`);
        if (response.data.status) {
          setSubmissions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };
    if (userId) {
      fetchSubmissions();
    }
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h2>Patient Dashboard</h2>
      <form onSubmit={handleSubmit} className="dashboard-form">
        {/* Form fields as before... */}
        <div className="form-group">
          <label>Patient Name:</label>
          <input 
            type="text" 
            name="patientName" 
            value={formData.patientName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Problem:</label>
          <input 
            type="text" 
            name="problem" 
            value={formData.problem} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Medicines Used:</label>
          <input 
            type="text" 
            name="medicines" 
            value={formData.medicines} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Height (cm):</label>
          <input 
            type="number" 
            name="height" 
            value={formData.height} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Heart Rate (bpm):</label>
          <input 
            type="number" 
            name="heartRate" 
            value={formData.heartRate} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input 
            type="number" 
            name="weight" 
            value={formData.weight} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Blood Group:</label>
          <select 
            name="bloodGroup" 
            value={formData.bloodGroup} 
            onChange={handleChange} 
            required 
          >
            <option value="">Select...</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="form-group">
          <label>Access Policy to Department:</label>
          <input 
            type="text" 
            name="accessPolicy" 
            value={formData.accessPolicy} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Upload Image:</label>
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            onChange={handleImageChange} 
            required 
          />
          {imagePreview && (
            <div className="image-preview">
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ width: '100px', height: '100px', marginTop: '10px' }} 
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn-submit">Submit</button>
      </form>
      <br /><br />

      <button className='btn-submit' onClick={handleData}>Your Submissions</button>

      {/* <ul>
        {submissions.map((submission, index) => (
          <li key={index}>
            <strong>Name:</strong> {submission.patientName} | 
            <strong>Problem:</strong> {submission.problem} | 
            <strong>Medicines:</strong> {submission.medicines} | 
            <strong>Height:</strong> {submission.height} cm | 
            <strong>Heart Rate:</strong> {submission.heartRate} bpm | 
            <strong>Weight:</strong> {submission.weight} kg | 
            <strong>Blood Group:</strong> {submission.bloodGroup} | 
            <strong>Access Policy:</strong> {submission.accessPolicy} | 
            {submission.image && (
              <>
                <strong>Image:</strong> <img src={submission.image} alt="Patient" style={{ width: '50px', height: '50px', marginLeft: '10px' }} />
              </>
            )}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default PatientsDashboard;
