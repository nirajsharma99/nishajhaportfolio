import './App.css';
import Info from './components/info';
//import Navbar from './components/Navbar/Navbar';
import Whatido from './components/whatido';
import BestArts from './components/bestarts';
import Reviews from './components/reviews';
import GalleryButton from './components/gallerybutton';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Gallery from './components/gallery';
import ContactMe from './components/contactme';
import Buildby from './components/buildby';
import { MenuItems } from './components/Navbar/MenuItems';
import './components/Navbar/Navbar.css';
import { useEffect, useRef, useState } from 'react';
import { Spiral as Hamburger } from 'hamburger-react';
import LOGIN from './components/login';
import Dashboard from './components/book/dashboard';
import Hompeage from './components/book/homepage/homepage';
import Inbox from './components/book/inbox';

const getDimensions = (ele) => {
  if (ele) {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
      height,
      offsetTop,
      offsetBottom,
    };
  }
};
function App() {
  const home = useRef(null),
    aboutme = useRef(null),
    gallery = useRef(null),
    reviews = useRef(null),
    contactme = useRef(null);
  const [visibleSection, setVisibleSection] = useState();
  const sectionRefs = [
    { section: 'home', ref: home },
    { section: 'about me', ref: aboutme },
    { section: 'gallery', ref: gallery },
    { section: 'reviews', ref: reviews },
    { section: 'contact me', ref: contactme },
  ];
  const [on, setOn] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleScroll = (title) => {
    switch (title) {
      case 'home':
        window.scrollTo({
          top: home.current.offsetTop - 200,
          behavior: 'smooth',
        });
        break;
      case 'about me':
        window.scrollTo({
          top: aboutme.current.offsetTop - 50,
          behavior: 'smooth',
        });
        break;
      case 'gallery':
        window.scrollTo({
          top: gallery.current.offsetTop - 50,
          behavior: 'smooth',
        });
        break;
      case 'reviews':
        window.scrollTo({
          top: reviews.current.offsetTop - 200,
          behavior: 'smooth',
        });
        break;
      case 'contact me':
        window.scrollTo({
          top: contactme.current.offsetTop - 100,
          behavior: 'smooth',
        });
        break;
      default:
        console.log('error');
    }
  };
  useEffect(() => {
    const handleScrolls = () => {
      if (home.current) {
        const { height: headerHeight } = getDimensions(home.current);
        const scrollPosition = window.scrollY + headerHeight;
        const selected = sectionRefs.find(({ section, ref }) => {
          const ele = ref.current;
          if (ele) {
            const { offsetBottom, offsetTop } = getDimensions(ele);
            return scrollPosition > offsetTop && scrollPosition < offsetBottom;
          }
        });
        if (selected && selected.section !== visibleSection) {
          setVisibleSection(selected.section);
        } else if (!selected && visibleSection) {
          setVisibleSection(undefined);
        }
      }
    };

    handleScrolls();
    window.addEventListener('scroll', handleScrolls);
    return () => {
      window.removeEventListener('scroll', handleScrolls);
    };
  }, [visibleSection]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/gallery/:id?" component={Gallery} />
          <Route path="/itsme" exact component={LOGIN} />
          <Route path="/book" exact component={Dashboard} />
          <Route path="/book/homepage" exact component={Hompeage} />
          <Route path="/book/inbox" exact component={Inbox} />

          <div className="Content">
            <nav
              data-aos="slide-down"
              data-aos-delay="2000"
              className="NavbarItems"
            >
              <div className="menu-icon">
                <Hamburger
                  toggled={on}
                  toggle={setOn}
                  easing="ease-in"
                  label="Menu"
                  hideOutline={true}
                  rounded
                />
              </div>
              <span className="nav-name">nisha jha.</span>
              <ul className={on ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <button
                        className={
                          item.cName +
                          (visibleSection === item.title
                            ? ' links-active'
                            : ' ')
                        }
                        onClick={() => {
                          handleScroll(item.title);
                          setOn(false);
                        }}
                      >
                        {item.title}
                      </button>
                      <hr
                        className={
                          visibleSection === item.title ? 'nav-hr' : 'd-none'
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>
            <Info forwardedRef={home} />
            <Whatido forwardedRef={aboutme} />
            <BestArts forwardedRef={gallery} />
            <GalleryButton />
            <Reviews forwardedRef={reviews} />
            <ContactMe forwardedRef={contactme} />
            <Buildby />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
