import React, { useEffect, useState, useCallback } from "react";
import { ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";


function EEGPage() {
  // 1. Define state variables
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // 2. Initialize S3 client
  const client = new S3Client({
    region: process.env.REACT_APP_REGION,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: process.env.REACT_APP_REGION },
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    }),
  });

  const buckett=process.env.REACT_APP_BUCKET_NAME;

  // 3. Function to fetch objects from S3 bucket
  const fetchObjects = useCallback(async () => {
    setLoading(true);
    const command = new ListObjectsCommand({ Bucket: buckett });
    try {
      const { Contents } = await client.send(command);
      setObjects(Contents || []);
    } catch (err) {
      console.error('Error fetching data from S3:', err);
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  }, [client]);

  // 4. Fetch objects on component mount
  useEffect(() => {
    fetchObjects();
  }, []);

  // 5. Handle file selection within modal
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // 6. Handle file upload to S3
  const handleUploadFile = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const uploadCommand = new PutObjectCommand({
      Bucket: buckett,
      Key: selectedFile.name,
      Body: selectedFile,
    });

    try {
      await client.send(uploadCommand);
      alert('File uploaded successfully!');
      fetchObjects(); // Explicitly call fetchObjects after upload
      setShowModal(false);
      setSelectedFile(null);
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('Failed to upload file.');
    }
  };

  // 7. Handle opening of upload modal
  const handleUploadClick = () => {
    setShowModal(true);
  };

  // 8. Handle closing of the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
  };

  return (
    <div>
      <h1>S3 Bucket Contents</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {objects.map((object, index) => (
            <li key={object.ETag || index}>{object.Key}</li>
          ))}
        </ul>
      )}
      <button onClick={handleUploadClick}>Upload File</button>
      {showModal && (
        <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000, border: '1px solid black', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <button onClick={handleCloseModal} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
          <h2>Upload File</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadFile}>Upload</button>
        </div>
      )}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }} onClick={handleCloseModal}></div>
      )}
    </div>
  );
}

export default EEGPage;