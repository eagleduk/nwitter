const { Link } = require("react-router-dom");

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            {userObj.displayName ? `${userObj.displayName}'s` : "My"} Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
