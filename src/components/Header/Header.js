import React, { useEffect, useContext } from "react";
import "./headerStyle.css";
import logo from "../../assets/logo3.png";
import { Link } from "react-router-dom";
import AOS from "aos";

import { ethers } from "ethers";
import Auth from "../../context/Auth";

const Header = () => {

  const { connectWallet, walletAddress } = useContext(Auth)

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="header">
      <div className="img-search">
        <img
          src={logo}
          alt=""
          data-aos="fade-right"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="200"
        />
      </div>

      <div className="nav">
        <ul>
          <li>
            <Link to="/">
              <p className="btn from-top">Home</p>
            </Link>
          </li>

          <li>
            <Link to="/account">
              <p className="btn from-top">Start Dapp</p>
            </Link>
          </li>

          { 
            !walletAddress 
              ? <li><button onClick={connectWallet}><p style={{padding:"7px 5px"}}>Connect wallet</p></button></li>
              : <li><Link to="/account"><p className="metamask" title={walletAddress}><i class="fa-solid fa-user"></i></p></Link></li>
          }  
          
        </ul>
      </div>

      <label for="toggle" class="hamburger">
        <div className="top-bun"></div>
        <div className="meat"></div>
        <div className="bottom-bun"></div>
      </label>

    </div>
  );
};

export default Header;
