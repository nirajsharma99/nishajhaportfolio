import { useEffect, useState } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Navbar() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const [on, SetOn] = useState(false);
  return (
    <nav data-aos="slide-down" data-aos-delay="2000" className="NavbarItems">
      <div className="menu-icon" onClick={() => SetOn(!on)}>
        <i className={on ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <span className="nav-name">nisha jha.</span>
      <ul className={on ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
              <hr className="nav-hr" />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default Navbar;
