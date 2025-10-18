import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export const ConnectWalletButton = () => {
  return (
    <div className="flex justify-center">
      <WalletMultiButton 
        className="!bg-primary hover:!bg-primary/90 !rounded-lg !px-4 !py-2 !font-medium !text-sm !transition-colors !min-w-[160px] !justify-center" 
      />
    </div>
  );
};
