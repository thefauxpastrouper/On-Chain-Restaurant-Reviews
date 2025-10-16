import { AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";

export const getProvider = () => {
  const connection = new Connection("https://api.devnet.solana.com");
  const provider = new AnchorProvider(connection, window.solana, {});
  setProvider(provider);
  return provider;
};