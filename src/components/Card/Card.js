import { Button, Modal } from "antd";
import React, { useState, useEffect, useContext } from "react";
import "./cardStyle.css";
import AOS from "aos";
import Auth from "../../context/Auth";
import { Network, Alchemy } from "alchemy-sdk";
import { abi2 } from '../../abi/abi2'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const ethers = require("ethers");

const btnStyle = {
  border: "none",
  cursor: "pointer",
  marginRight: "-50px",
  marginLeft: "30px",
  fontSize: "12px",
  borderBottom: "1px solid red",
  padding: "0 10px 0 10px",
};

const Card = () => {
  const { getNftData, contractRead, contractWrite, walletAddress } = useContext(Auth);

  const [nftsList, setNftList] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currItem, setCurrItem] = useState("");

  //Phala Connect
  const [handle, setHandle] = useState('');
  const [pid, setId] = useState('');
  const [score1, setScore1] = useState(0);
  const abi_OueryOracle = abi2;
  const contractAddress_OueryOracle = '0xcB84CDd9Ca1a01FF35221653A18637209d1e29bF';
  let provider;
  let signer;
  const API_URL = 'https://api-mumbai.lens.dev'
  const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
  })

//Phala Polygon Consumer Contract : https://mumbai.polygonscan.com/address/0xfab183E75E37C6F569DbB10cc890457477Ca7563#code

  const getScore = async () => {
    try{
      provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.send('eth_requestAccounts', []);
      signer = provider.getSigner();
      let contractWrite = new ethers.Contract(contractAddress_OueryOracle, abi_OueryOracle, signer);

      console.log("Id 1 :", pid);
      await provider.send('eth_requestAccounts', []);
      const writen = await contractWrite.request(pid);
      console.log("Written 1" + writen.hash);

      const provider2 = new ethers.providers.WebSocketProvider(`wss://frequent-solitary-cherry.matic-testnet.discover.quiknode.pro/d4eddd3fb5a80ca6014416b9f38fdac88d9333a2/`)
      const contractRead = new ethers.Contract(contractAddress_OueryOracle, abi2, provider2);
      contractRead.on('ResponseReceived', (id, pair, value) => {
      var score = parseInt(value._hex, 16);
      console.log("Idd:", id, "pair", pair, "score", score);
        if (pair == pid && score1 == 0) {
          setScore1(score);
          console.log("Socre1:", score1);
        }
      })
    }
    catch(e){
      console.log(e);
    }
  }

  const fetchProfiles = async () => {
    try {
      console.log(`key is ${process.env.REACT_QUICKNODE}`)
      
      /* fetch profiles from Lens API */
      let defaultProfile = gql`
query DefaultProfile {
  defaultProfile(
    request: { ethereumAddress: "${walletAddress}" }
  ) {
    id
    name
    bio
    isDefault
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    ownedBy
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
  }
}
 
`
      var response = await client.query({ query: defaultProfile }).then(async (value) => {
        /* return profiles with profile pics  */
        setHandle(value.data.defaultProfile.handle)
        setId(value.data.defaultProfile.id)
      })
      //console.log(handle +"  "+pid);
    } catch (err) {
      console.log({ err })
    }
  }

  // Optional Config object, but defaults to demo api-key and eth-mainnet.
  const settings = {
    apiKey: "CGgYawbTv54xtR_bgntCQHFlpOV6hMYL",
    network: Network.MATIC_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  async function optInAddress(id) {
    if (walletAddress) {
      console.log(id + " " + walletAddress + " " + " "+score1);
      try{
        var userData = await contractWrite.storeUser(id, walletAddress, score1);
        if (userData) {
          console.log("Successss");
        }
      }
      catch(e){
        console.log(e);
      }
    }
    else {
      alert("Connect Wallet Please!")
    }
  }


  useEffect(() => {    
    if(pid){
      getScore();
    }
    else{
      AOS.init();
      setNftList(getNftData());
      //console.log(nftsList);
    }
  }, [pid]);

  useEffect(()=>{
    if(walletAddress){
      fetchProfiles();
    }
  },[walletAddress]);

  return (
    <div className="container2">
      {nftsList && nftsList.map((item) => (
        <div className="wrapper" data-aos="flip-down" data-aos-delay="200">
          <div className="card">
            <img src={item.image_l} alt="" />
            <div className="price">
              <p>
                <a href="/opts?id=1">
                  <img
                    src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-HD-Image.png"
                    alt=""
                  />{" "}
                  &nbsp; {item.price === null ? 0.0 : item.price}</a>
                  {score1 ?<Button style={btnStyle} onClick={() => optInAddress(item.id)}>
                  Opt-In
                </Button>:<Button style={btnStyle} disabled="true" onClick={() => optInAddress(item.id)}>
                  Opt-In
                </Button>}
                
              </p>
            </div>
          </div>
        </div>
      ))
        // ) : (
        //   <div
        //     style={{
        //       textAlign: "center",
        //       width: "100vw",
        //       marginTop: "300px",
        //       fontSize: "2rem",
        //       color: "gray",
        //     }}
        //   >
        //     Sorry, You dont have NFTs, Collect it!
        //   </div>
        // )
      }
    </div>
  );
};

export default Card;
