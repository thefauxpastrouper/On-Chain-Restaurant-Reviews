import { AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";

export const getProvider = () => {
  const connection = new Connection(import.meta.env.RPC_ENDPOINT);
  const provider = new AnchorProvider(connection, window.solana, {});
  setProvider(provider);
  return provider;
};
