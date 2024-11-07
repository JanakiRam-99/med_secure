import { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorsDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null); // To store the image for the modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://medsecure-hccy.onrender.com/data');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle image click and open modal
  const openModal = (image) => {
    setModalImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalImage(null);
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Doctors Dashboard</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Problem</th>
            <th>Medicines</th>
            <th>Height (cm)</th>
            <th>Heart Rate (bpm)</th>
            <th>Weight (kg)</th>
            <th>Blood Group</th>
            <th>Access Policy</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.patientName}</td>
              <td>{item.problem}</td>
              <td>{item.medicines}</td>
              <td>{item.height}</td>
              <td>{item.heartRate}</td>
              <td>{item.weight}</td>
              <td>{item.bloodGroup}</td>
              <td>{item.accessPolicy}</td>
              <td>
                {item.image && (
                  <img
                    src={item.image}
                    alt="Patient"
                    className="patient-image"
                    onClick={() => openModal(item.image)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for image */}
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={modalImage} alt="Enlarged Patient" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsDashboard;
