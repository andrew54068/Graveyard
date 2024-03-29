import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import tomb from './tomb.png';
import tombs from './tombs.png';
import './App.css';
import Button from 'react-bootstrap/Button';
import {
  WalletProvider,
  BloctoWalletAdapter,
  BloctoWalletName,
  useWallet,
  WalletAdapterNetwork
} from '@manahippo/aptos-wallet-adapter';
import PageTitle from './component/PageTitle';
import Lobby from './component/Lobby'
import Bridge from './component/Bridge'
import SuiResult from './component/SuiResult'

const wallets = [
  new BloctoWalletAdapter({
    network: WalletAdapterNetwork.Testnet,
    bloctoAppId: 'c9aae963-60fc-4066-b8f9-21eda88d384a'
  }),
];

const myStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL + "/dark-night.png"})`,
  width: '100%',
  height: '100vh',
  bottom: '-50px',
  right: '-200px',
  fontSize: '50px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const tombStyle = {
  width: '275px',
  height: '220px',
  position: 'absolute',
  left: '5%',
  bottom: '20%',
  // backgroundSize: 'cover',
  filter: 'brightness(55%)',
}

const tombsStyle = {
  width: '435px',
  height: '300px',
  position: 'absolute',
  left: '1%',
  bottom: '28%',
  // backgroundSize: 'cover',
  filter: 'brightness(70%)',
}

const connetWalletButtonStyle = {
  width: '150px',
  height: '40px',
  position: 'absolute',
  right: '3%',
  top: '3%',
  filter: 'brightness(90%)',
  borderRadius: '10px'
}

const digButtonStyle = {
  width: '100px',
  height: '30px',
  position: 'absolute',
  left: '10%',
  bottom: '18%',
  filter: 'brightness(87%)',
  borderRadius: '10px'
}

const claimButtonStyle = {
  width: '120px',
  height: '30px',
  // position: 'absolute',
  // left: '10%',
  bottom: '50%',
  // top: '50%',
  filter: 'brightness(87%)',
  borderRadius: '10px'
}

function App() {
  return (
    <WalletProvider
      wallets={wallets}
      onError={(error) => {
        console.log('Handle Error Message', error)
      }}
    >
      <Main />
    </WalletProvider>
  );
}

const Main = () => {

  const { connect, disconnect, connected, signAndSubmitTransaction } = useWallet();
  const [isClaiming, setClaiming] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoading) {
      const sendTransaction = async () => {
        const txOptions = {
          max_gas_amount: '20000',
          gas_unit_price: '200'
        }
        const dig = {
          arguments: [],
          function: '0xedee10d387fcc2f10d54d12dd69ce973dd8b4f0e7a59f0fbb57db64500d7ce5c::graveyard::dig',
          type: 'entry_function_payload',
          type_arguments: [],
        };

        try {
          const result = await signAndSubmitTransaction(dig);
          if (result) {
            console.log(result)
          }
        } catch (error) {
          setError(error);
          console.log(error);
        }
        setLoading(false);
      };
      sendTransaction();
    }
  }, [isLoading, signAndSubmitTransaction]);

  const handleClick = () => setLoading(true);

  useEffect(() => {
    if (isClaiming) {
      const sendTransaction = async () => {
        const txOptions = {
          max_gas_amount: '20000',
          gas_unit_price: '200'
        }
        const claim = {
          arguments: [],
          function: '0xedee10d387fcc2f10d54d12dd69ce973dd8b4f0e7a59f0fbb57db64500d7ce5c::shovel::claim_mint',
          type: 'entry_function_payload',
          type_arguments: [],
        };

        try {
          const result = await signAndSubmitTransaction(claim);
          if (result) {
            console.log(result)
          }
        } catch (error) {
          setError(error);
          console.log(error);
        }
        setClaiming(false);
      };
      sendTransaction();
    }
  }, [isClaiming, signAndSubmitTransaction]);

  const handleClaim = () => setClaiming(true);

  const handleErrorClose = (_, reason) => {
    if (reason && reason === 'clickaway') {
      return
    }
    setError(undefined)
  }

  return (

    <div className="App">
      <PageTitle title="Grandma......" info="where are you?" />
      <Lobby />
      <PageTitle title="No problem!" info="let me reborn you." />
      <Bridge />
      <SuiResult />
      {/* <button
        style={connetWalletButtonStyle}
        onClick={() => !connected ? connect(BloctoWalletName) : disconnect()}
      >
        {!connected ? "Connect to Blocto" : "Disconnect"}
      </button>
      <div>
        <img src={tombs} className="Tombs" alt="logo" style={tombsStyle} />
        <img src={tomb} className="Tomb" alt="logo" style={tombStyle} />
        <Button
          variant="secondary"
          disabled={!connected || isClaiming}
          onClick={!isLoading ? handleClick : null}
          size="sm"
          style={digButtonStyle}
        >
          {isLoading ? 'Loading…' : 'Click to dig'}
        </Button>
        <Button
          variant="primary"
          disabled={!connected || isClaiming}
          onClick={!isClaiming ? handleClaim : null}
          size="lg"
          style={claimButtonStyle}
        >
          {isClaiming ? 'Claiming…' : 'claim a shovel'}
        </Button>
        <Snackbar open={error !== undefined} autoHideDuration={3000} onClose={handleErrorClose}>
          <Alert onClose={handleErrorClose} severity='error'>
            {error?.message}
          </Alert>
        </Snackbar>
      </div> */}
    </div>
  )
}

export default App;
