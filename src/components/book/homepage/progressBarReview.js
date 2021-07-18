import { useEffect } from 'react';
import useStorage3 from './useStorage3';
import { motion } from 'framer-motion';
const ProgressBarReview = ({ file, setFile, form, setForm }) => {
  const { url, progress } = useStorage3({ file, form });
  useEffect(() => {
    if (url) {
      setFile(null);
      setForm({ name: '', message: '', address: '' });
    }
  }, [url, setFile, setForm]);
  return (
    <div className="mb-5">
      <p className="text-start uploading-txt">Uploading...</p>
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: progress + '%' }}
      ></motion.div>
    </div>
  );
};
export default ProgressBarReview;
