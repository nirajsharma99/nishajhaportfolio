import doo from '.././do.jpg';
import AboutWork from './aboutwork';
const Whatido = ({ forwardedRef }) => {
  return (
    <div ref={forwardedRef}>
      <div
        data-aos="fade-up"
        className="wdid-container shadow mb-3 d-flex flex-md-row flex-column justify-content-around"
      >
        <div className="col-md-6 p-5 d-flex flex-column align-items-center">
          <h2 className="display-1">
            What i <span className="do">do</span>?
            <hr className="hr-small m-auto" />
          </h2>
          <hr className="small-line" />
          <p className="display-6">
            I am passionate about art. I keep trying things. I mainly deal with
            mandala art and calligraphy writings. If you got some idea about an
            art i can deliver it to you.
          </p>
        </div>
        <div className="col-md-6 ">
          <img
            src={doo}
            height="100%"
            width="100%"
            alt="work"
            style={{ borderRadius: '40px' }}
          />
        </div>
      </div>
      <AboutWork />
    </div>
  );
};
export default Whatido;
