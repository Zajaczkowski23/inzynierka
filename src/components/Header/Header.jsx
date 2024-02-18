import loginIcon from "../../assets/account.svg";
import Logo from "../../assets/Logo.svg";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      setUserName(decoded.name || "");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/account/login");
  };

  return (
    <div className="header">
      <Link to="/matches" className="header__logo">
        <img src={Logo} alt="Logo of the page" />
        ScoreLive
      </Link>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        sx={{ width: 600 }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <div className="header__item">
        {isLoggedIn ? (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {`Hello,  ${userName}`}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link to={"/profile"} className="header__text">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link className="header__btn" to={"/account/login"}>
            <img
              className="header__img"
              src={loginIcon}
              alt="Button for your login account"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
