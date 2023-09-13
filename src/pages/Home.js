import React from "react";
import AddressList from "../components/AddressList/AddressList";
import NftSlider from "../components/NftSlider/NftSlider";
import "./homeStyle.css";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        background: "aliceblue",
      }}
    >
      <div className="moto">
        <div class="patterns">
          <svg width="100%" height="50%">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#polka-dots)"
            >
              {" "}
            </rect>

            <text x="50%" y="60%" text-anchor="middle">
              Score High! Mint Free..
            </text>
          </svg>
        </div>
        
        <p>NFTs From Wallet Address</p>
      </div>
      <div className="content">
        <NftSlider />
        <div className="numbers">
          <div className="users">
            <p className="title">USERS</p>
            <p className="number">10000+</p>
          </div>
          <div className="worth-nfts">
            <p className="title">WORTH NFTs</p>
            <p className="number">3546</p>
          </div>
        </div>
      </div>
      {/* <AddressList /> */}
    </div>
  );
};

export default Home;
