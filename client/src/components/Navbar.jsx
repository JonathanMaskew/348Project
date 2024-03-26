import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-around items-center mb-6">
        <NavLink to="/">
          <img
            alt="MongoDB logo"
            className="h-10 inline"
            src="../../public/logo.svg"
            style={{ width: '300px', height: '300px' }}
          ></img>
        </NavLink>
      </nav>
    </div>
  );
}
