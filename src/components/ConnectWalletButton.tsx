import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export const ConnectWalletButton = () => {
  return (
    <div className="flex justify-center">
      <WalletMultiButton 
        className="!bg-primary hover:!bg-primary/90 !rounded-lg !px-3 md:!px-4 !py-1.5 md:!py-2 !font-medium !text-xs md:!text-sm !transition-colors !min-w-[120px] md:!min-w-[160px] !justify-center !whitespace-nowrap" 
      />
    </div>
  );
};
