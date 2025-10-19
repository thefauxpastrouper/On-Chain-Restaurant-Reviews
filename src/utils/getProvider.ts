import { AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";

export const getProvider = () => {
  const connection = new Connection("https://devnet.helius-rpc.com/?api-key=914ba64f-6706-4ba0-b320-bd35b6371e15");
  const provider = new AnchorProvider(connection, window.solana, {});
  setProvider(provider);
  return provider;
};