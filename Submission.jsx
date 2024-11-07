import axios from "axios"
import { useEffect, useState } from "react";

export function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : "";
  }

const Submission = () => {
const [submissions, setSubmissions] = useState([]);
const [userId, setUserId] = useState(getCookie('username'));


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
    <div>
        <br /><br />
        <center>
        <h2>Your Submission data</h2>
        </center>
      <ul>
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
      </ul>
    </div>
  )
}

export default Submission
