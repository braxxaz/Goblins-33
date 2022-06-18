import {
    ChainId,
    useClaimedNFTSupply,
    useContractMetadata,
    useNetwork,
    useNFTDrop,
    useDisconnect, 
    useCoinbaseWallet,
    useUnclaimedNFTSupply,
  } from "@thirdweb-dev/react";
  import { useNetworkMismatch } from "@thirdweb-dev/react";
  import { useAddress, useMetamask, useWalletConnect } from "@thirdweb-dev/react";
  import type { NextPage } from "next";
  import { useState } from "react";
  import styles from "../styles/Theme.module.css";


  // Put Your NFT Drop Contract address from the dashboard here
  const myNftDropContractAddress = "0x39702Ef85BD607dB1F2B0147Ee8190F013E91A89";
  
  const Home: NextPage = () => {
    const nftDrop = useNFTDrop(myNftDropContractAddress);
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const connectWithWalletConnect = useWalletConnect();
    const connectWithCoinbaseWallet = useCoinbaseWallet();
    const isOnWrongNetwork = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();
    const disconnectWallet = useDisconnect();

    const [claiming, setClaiming] = useState<boolean>(false);
  
    // Load contract metadata
    const { data: contractMetadata } = useContractMetadata(
      myNftDropContractAddress
    );
  
    // Load claimed supply and unclaimed supply
    const { data: unclaimedSupply } = useUnclaimedNFTSupply(nftDrop);
    const { data: claimedSupply } = useClaimedNFTSupply(nftDrop);
  
    // Loading state while we fetch the metadata
    if (!nftDrop || !contractMetadata) {
      return <div className={styles.container}>Loading...</div>;
    }
  
    // Function to mint/claim an NFT
    async function mint() {
      // Make sure the user has their wallet connected.
      if (!address) {
        connectWithMetamask();
        connectWithWalletConnect();
        return;
      }

      
  
      // Make sure the user is on the correct network (same network as your NFT Drop is).
      if (isOnWrongNetwork) {
        switchNetwork && switchNetwork(ChainId.Mainnet);
        return;
      }
  
      setClaiming(true);
  
      try {
        const minted = await nftDrop?.claim([1]);
        console.log(minted);
        alert(`Successfully minted NFT!`);
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        setClaiming(false);
      }
    }

    
  
    return (
      <><div>
        <button className={styles.btn2} onClick={disconnectWallet}>Disconnect Wallet</button>
      </div><div className={styles.container}>
          <div className={styles.mintInfoContainer}>
            <div className={styles.infoSide}>
              {/* Title of your NFT Collection */}
              <h1>{contractMetadata?.name}</h1>
              {/* Description of your NFT Collection */}
              <p className={styles.description}>{contractMetadata?.description}</p>
             1 free NFT + gas fees.
              you can claim 2 per tx. dont be fucking greedy.
              <br />
              No roadmap. No Discord. No utility. CC0.
              <br />
              might not be having a roadmap but something will come along in the future.
              <br />
              Phase 1: Goblins start to trip
              <br />
              Phase 2: Goblins get really messed up
              <br />
              Phase 3: ....
            </div>

            <div className={styles.imageSide}>
              {/* Image Preview of NFTs */}
              <img
                className={styles.image}
                src="/goblins.gif"
                alt="/goblins.gif"
                width={100} />

              {/* Amount claimed so far */}
              <div className={styles.mintCompletionArea}>
                <div className={styles.mintAreaLeft}>
                  <p>Total Minted</p>
                </div>
                <div className={styles.mintAreaRight}>
                  {claimedSupply && unclaimedSupply ? (
                    <p>
                      {/* Claimed supply so far */}
                      <b>{claimedSupply?.toNumber()}</b>
                      {" / "}
                      {
                        // Add unclaimed and claimed supply to get the total supply
                        claimedSupply?.toNumber() + unclaimedSupply?.toNumber()}
                    </p>
                  ) : (
                    // Show loading state if we're still loading the supply
                    <p>Loading...</p>
                  )}
                </div>
              </div>

              {address ? (
                <button
                  className={styles.mainButton}
                  onClick={mint}
                  disabled={claiming}

                >


                  {claiming ? "Minting... fucking wait" : "Mint Me It's Free"}
                </button>
              ) : (
                <div>
                  <button className={styles.mainButton} onClick={connectWithMetamask}>
                    cOnnEct meTaMask
                  </button>
                  <br></br>
                  <br></br>
{/* 
                  <button className={styles.mainButton} onClick={connectWithWalletConnect}> cOnnEct WaLLetCONnect </button>
                  <br></br>
                  <br></br> */}
                  <button className={styles.mainButton} onClick={connectWithCoinbaseWallet}>cOnnEct da COInbAse WaLLet</button>

                </div>
              )}
            </div>
          </div>
          <a href="https://opensea.io/collection/goblinsonlsd" target="_blank" rel="noreferrer" className={styles.goblinslogo}>
            <img
              src="/gosld-opensea-icon.png"
              alt="OpenSea"
              width={55}
              height={55} />
          </a>
          <a href="https://twitter.com/goblinsonlsd" target="_blank" rel="noreferrer" className={styles.goblinslogo}>
            <img
              src="/gosld-twitter-icon.png"
              alt="Twitter"
              width={55}
              height={55} />
          </a>
          <a href="https://etherscan.io/address/0x39702Ef85BD607dB1F2B0147Ee8190F013E91A89#code" target="_blank" rel="noreferrer" className={styles.mainButton}>Verified Contract Address</a>
          <br />
          {/*2022 Goblins on LSD*/}{"2022 Goblins on LSD"}
        </div></>
    );
  };
  
  export default Home;