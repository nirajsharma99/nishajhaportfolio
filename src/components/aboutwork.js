import deliveryman from '../icon-images/deliveryman.png';
import gift from '../icon-images/gift.png';
import pencil from '../icon-images/pencil.png';

function AboutWork() {
  return (
    <div className="about-work-outer">
      <div className="about-line"></div>

      <div data-aos="slide-right" className="about-work-container">
        <div className="about-work-logo">
          <img src={deliveryman} alt="about-work-logo" />
        </div>
        <div className="about-work-content">
          <h3 className="about-work-heading">Delivery</h3>
          <p className="about-work-desc">
            Sitback and relax we will get your art work delivered to your home
            with ease. (Extra charges may apply)
          </p>
        </div>
      </div>
      <div data-aos="slide-up" className="about-work-container">
        <div className="about-work-logo">
          <img src={gift} alt="about-work-logo" />
        </div>
        <div className="about-work-content">
          <h3 className="about-work-heading">Gifting &amp; Framing</h3>
          <p className="about-work-desc">
            You can get your art gift wrapped if you want it to gift it to your
            dear ones. If you want we can frame the art for you.
          </p>
        </div>
      </div>
      <div data-aos="slide-left" className="about-work-container">
        <div className="about-work-logo">
          <img src={pencil} alt="about-work-logo" />
        </div>
        <div className="about-work-content">
          <h3 className="about-work-heading">Customizable</h3>
          <p className="about-work-desc">
            I can customise the art work as you like even you can share your
            ideas how you want it to look like.
          </p>
        </div>
      </div>
    </div>
  );
}
export default AboutWork;
