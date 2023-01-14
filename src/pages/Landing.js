import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { TextInput, Card, Text, Modal, Textarea } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons';
import axios from '../axios'
import scene from '../assets/scene.svg'
import { useSelector } from 'react-redux';
import {PeraWalletConnect} from "@perawallet/connect"
import {Transaction, Algodv2, makeAssetTransferTxnWithSuggestedParamsFromObject, generatePaymentTxns} from "algosdk";
import { Link } from 'react-router-dom';
import { Loader } from '@mantine/core';

const peraWallet = new PeraWalletConnect({
  chainId: 416002,
  shouldShowSignTxnToast: true,
  network: "testnet"
});

export default function Landing() {
  const [sessions, setSessions] = useState([])
  const [yourSessions, setYourSessions] = useState([])
  const [showingSessionModal, setShowingSessionModal] = useState(false)
  const [sessionInFocus, setSessionInFocus] = useState({})
  const [showPaymentButton, setShowPaymentButton] = useState(true)
  const [walletLoading, setWalletLoading] = useState(false)
  const [showingNewSessionModal, setShowingNewSessionModal] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [accountAddress, setAccountAddress] = useState("")
  const isConnectedToPeraWallet = !!accountAddress;

  const algod = new Algodv2("2f3203f21e738a1de6110eba6984f9d03e5a95d7a577b34616854064cf2c0e7b", "https://node.testnet.algoexplorerapi.io","");
  async function generateAssetTransferTxns({
    to,
    assetID,
    initiatorAddr
  }) {
    console.log(to,assetID,initiatorAddr)
    const suggestedParams = await algod.getTransactionParams().do();
    console.log(suggestedParams)
  
    const txn = makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: initiatorAddr,
      to,
      assetIndex: assetID,
      amount: 50,
      suggestedParams
    });
    console.log(txn)
  
    return [{txn, signers: [initiatorAddr]}];
  }

  const handleTransaction = async (toAddr) => {
    setWalletLoading(true)
    const txnDetails = await generateAssetTransferTxns({initiatorAddr:accountAddress, assetID:153818468, to:toAddr})
    
    try {
      const signedTxnGroup = await peraWallet.signTransaction([txnDetails]);
    
      console.log(signedTxnGroup);
    
      const {txId} = await algod.sendRawTransaction(signedTxnGroup).do();
      console.log(txId)
      setShowPaymentButton(false)
    } catch (error) {
      console.log("Couldn't sign asset transfer txns",error);
    }
    setWalletLoading(false)
  }

  const auth = useSelector(state => state.auth)
  useEffect(() => {
    const getSessions = async () => {
      try {
        const res = await axios.get("/courses")
        setSessions(res.data.courses)
        const res2 = await axios.get(`/courses/author/${auth.username}`)
        setYourSessions(res2.data.course)
      } catch {
        console.log("nope.")
      }
    }
    getSessions()
  },[auth.username])
  const showSession = (session) => {
    setSessionInFocus(session)
    setShowingSessionModal(true)
  }

  function handleConnectWalletClick() {
    handleDisconnectWalletClick()
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
      })
      .reject((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress(null);
  }

  const submitSession = async () => {
    await axios.post("/courses", {
      course_name: title,
      author: localStorage.getItem("username"),
      description: description,
      author_pk: accountAddress
    })
    window.location.reload()
  }
  return (
    <Layout>
      <Modal
      centered
      opened={showingSessionModal}
      onClose={() => setShowingSessionModal(false)}
      title={sessionInFocus.course_name}
      size="xl"
      >
        <div className="flex flex-col">
          <img className='mx-auto h-[15rem] w-auto' src={scene} alt="scene"></img>
          <div className="grid grid-cols-12 relative">
            <div className="col-span-7 mt-7">
              <h2 className='lg:text-xl font-semibold text-slate-600 text-lg'>{sessionInFocus.course_name}</h2>
              <p className="mt-2 text-slate-500 lg:text-lg text-md">{sessionInFocus.description}</p>
              <h2 className='lg:text-xl mt-6 font-semibold text-slate-600 text-lg'>Tutor</h2>
              <p className="mt-2 text-slate-500 lg:text-lg text-md">{sessionInFocus.author}</p>
            </div>
            {showPaymentButton ?
            <button onClick={isConnectedToPeraWallet ? () => handleTransaction(sessionInFocus.author_pk) : handleConnectWalletClick} style={{background: "rgb(230, 138, 60)"}} className='mx-auto absolute bottom-0 w-fit right-0 flex justify-center mt-6 text-xl flex justify-center text-center rounded-full p-2 text-white'>
            {walletLoading ? <Loader /> : isConnectedToPeraWallet ? "Pay 0.5 CoinBara" : "Connect to Pera"}
            </button>
            : (
              <Link to={`/session/${sessionInFocus.ID}`}>
              <button style={{background: "rgb(230, 138, 60)"}} className='mx-auto absolute bottom-0 w-fit right-0 flex justify-center mt-6 text-xl text-center rounded-full p-2 text-white'>
            Join Session
            </button>
            </Link>
            )}
          </div>
        </div>
      </Modal>
      <Modal
      centered
      opened={showingNewSessionModal}
      onClose={() => setShowingNewSessionModal(false)}
      title="Have a new listing in mind?"
      size="xl"
      >
        <div className="flex flex-col">
          <div>
            <form onSubmit={(e) => {e.preventDefault();submitSession();}} className='w-full flex flex-col'>
              <TextInput
                placeholder="How do you even connect algorand to pera"
                label="Session Title"
                required
                className='mt-8'
                classNames={{input: "border-slate-300", label: "text-slate-500"}}
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
              <Textarea
                placeholder="lorem ipsum dolor sit amet"
                label="Description"
                withAsterisk
                classNames={{input: "border-slate-300", label: "text-slate-500"}}
                value={description}
                className="mt-4"
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
              <button type='button' onClick={handleConnectWalletClick} className='navlink text-black px-4 text-sm w-fit flex justify-center mt-6 text-xl flex justify-center text-center rounded-full p-2 text-white'>
              {isConnectedToPeraWallet ? "Wallet Connected" : "Connect your Pera Wallet"}
              </button>
              <button type='submit' style={{background: "rgb(230, 138, 60)"}} className='mx-auto lg:w-4/12 md:w-7/12 w-full flex justify-center mt-6 text-xl text-center rounded-full p-2 text-white'>
                Create
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <div>
        <TextInput
          placeholder="Search for tutors and sessions."
          icon={<IconSearch size={18} />}
          radius="xl"
          size='sm'
          variant='filled'
          className='lg:w-6/12'
        />
        {(auth.token && (auth.isTutor === "false" || auth.isTutor === false)) ?
        <div className="rounded-md mt-8 bg-white drop-shadow-lg p-5">
          <h2 className='lg:text-2xl text-xl'>Reccomended Sessions</h2>
          <div className='flex gap-5 mt-8 overflow-scroll flex-nowrap'>
          {sessions.map((session, index) => {
            return (
              <div className='xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem]'>
              <Card onClick={() => showSession(session)} className='cursor-pointer h-full xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem]' shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                  <img
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>
                <Text mt="md" mb="xs" weight={500}>{session.course_name}</Text>
                <Text size="sm" color="dimmed">
                  {session.author}
                </Text>
              </Card>
              </div>
            )
          })}
          </div>
        </div>
        : auth.token ? (
          <div className="rounded-md mt-8 bg-white drop-shadow-lg p-5">
          <span className='flex flex-wrap gap-4 justify-between'>
          <h2 className='lg:text-2xl text-xl'>Your Sessions</h2>
          <button onClick={() => setShowingNewSessionModal(true)} style={{color: "rgb(230, 138, 60)"}} className='px-4 navlink flex justify-center text-xl text-center rounded-full p-2 text-white'>Create New</button>
          </span>
          <div className='flex gap-5 mt-8 overflow-scroll flex-nowrap'>
          {yourSessions.map((session, index) => {
            return (
              <Link className='xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem]' to={`/session/${session.ID}`}>
              <Card className='cursor-pointer h-full xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem]' shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                  <img
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>
                <Text mt="md" mb="xs" weight={500}>{session.course_name}</Text>
                <Text size="sm" color="dimmed">
                  {session.author}
                </Text>
              </Card>
              </Link>
            )
          })}
          <div className='xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem]'>
            <Card onClick={() => setShowingNewSessionModal(true)} className='add-card cursor-pointer h-full xl:w-[20rem] lg:w-[15rem] md:w-[20rem] w-[15rem] flex justify-center items-center' shadow="sm" p="lg" radius="md" withBorder>
              <IconPlus color='rgb(230, 138, 60)' size={100} />
            </Card>
          </div>
        </div>
        </div>
        ) : null}
        <div className='grid grid-cols-12 gap-5 mt-8'>
        {sessions.map((session, index) => {
          return (
            // <Link className='xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12' to={`/session/${session.ID}`}>
            <Card onClick={() => {if (auth.token) showSession(session)}} className='cursor-pointer h-full xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12' shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <img
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
              <Text mt="md" mb="xs" weight={500}>{session.course_name}</Text>
              <Text size="sm" color="dimmed">
                {session.author}
              </Text>
            </Card>
            // </Link>
          )
        })}
        </div>
      </div>
    </Layout>
  )
}
