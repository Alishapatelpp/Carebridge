import { Link } from "react-router-dom";
import logo from "../assets/carebridge-logo.png";

function Logo({ className = "", imageClassName = "" }) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <img
        src={logo}
        alt="CareBridge"
        className={`h-16 w-auto object-contain ${imageClassName}`}
      />
    </Link>
  );
}

export default Logo;