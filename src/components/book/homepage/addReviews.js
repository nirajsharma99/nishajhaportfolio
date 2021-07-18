import nullavatar from '../../../nullavatar.jpg';
import { useState, useEffect } from 'react';
import ProgressBarReview from './progressBarReview';
import ReviewsEdit from './reviewEdit';
import Compressor from 'compressorjs';

const AddReviews = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', message: '', address: '' });
  const [showProgress, setShowProgress] = useState(null);

  const fileType = ['image/png', 'image/jpeg'];
  const handleFile = (e) => {
    let pic = e.target.files[0];
    if (pic && fileType.includes(pic.type)) {
      new Compressor(pic, {
        quality: pic.size < 6291456 && pic.size > 3145728 ? 0.6 : 0.4,
        success(result) {
          setFile(result);
          setError('');
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      setFile(null);
      setError('Please select an image file  (png or jpg)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && form.name && form.message && form.address) {
      setShowProgress(true);
      setError('');
    } else {
      setError('Please fill all fields');
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="add-review-container mt-5">
      <div className="text-center">
        <span className="name-font display-1">Add Reviews</span>
        <br />
      </div>

      <div className=" d-flex flex-column align-items-center mb-5">
        <img
          src={preview ? preview : nullavatar}
          className="add-reviewer-img"
          alt="reviewer-pic"
        />
        {error && <div className="error">{error}</div>}

        <input type="file" onChange={handleFile} className="mb-2" />

        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="add-review-fields"
          placeholder="Name"
        />
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="add-review-fields"
          placeholder="Message"
        />
        <input
          type="text"
          className="add-review-fields"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <button onClick={handleSubmit} className="add-review">
          Add
        </button>
      </div>
      {file && showProgress && (
        <ProgressBarReview
          file={file}
          setFile={setFile}
          form={form}
          setForm={setForm}
        />
      )}
      <ReviewsEdit />
    </div>
  );
};
export default AddReviews;
