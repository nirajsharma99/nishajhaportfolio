import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function GalleryButton() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  let samt = 0;
  window.addEventListener('scroll', function () {
    samt <= 10 ? samt++ : Aos.refresh();
  });

  return (
    <div data-aos="slide-up" className="my-5">
      <Link to={'/gallery'}>
        <button className="gallery-btn">GALLERY</button>
      </Link>
    </div>
  );
}
export default GalleryButton;
