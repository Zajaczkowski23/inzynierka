import loginIcon from "../../assets/account.svg";
import Logo from "../../assets/Logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
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
        <button className="header__btn">
          <img
            className="header__img"
            src={loginIcon}
            alt="Button for your login account"
          />
        </button>
      </div>
    </div>
  );
}

export default Header;
