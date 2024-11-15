import { NavLink, Outlet } from "react-router-dom";

import { sidebarOptions } from "../../../constants";
import ucuImage from '../../../assets/ucu.svg';


import './styles.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img src={ucuImage} alt="UCU" className="sidebar__container-image" />
        <div className="sidebar__container-titles">
          {
            sidebarOptions.map(({
              label,
              to,
            }) => (
              <NavLink to={to} className={({
                isActive,
              }) => (
                `sidebar__container-titles--option ${isActive ? 'link-active' : ''}`
              )}
                key={label}
              >
                <span>{label}</span>
              </NavLink>
            ))
          }
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Sidebar;
