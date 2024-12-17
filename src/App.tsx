import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input"
import { Button } from "./components/ui/button";
import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";

import Loading from "./components/loading";

function App() {

  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ success: "", signature: "", explorerLink: "" });

  const handleAirdrop = async () => {
    if (!address || !network || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    const requestData = {
      network,
      amount: parseFloat(amount),
      address,
    };

    try {
      setLoading(true);
      const response = await fetch("https://faucet-server-jaymadane.vercel.app/airdrop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      setAddress("");
      setAmount("");

      if (response.ok) {
        setLoading(false);
        const result = await response.json();
        setDialogData({
          success: result.success,
          signature: result.signature,
          explorerLink: result.explorerLink,
        });
        setDialogOpen(true);
      } else {
        setLoading(false);
        setDialogData({
          success: "Failed to request airdrop, please try again later.",
          signature: "",
          explorerLink: "https://explorer.solana.com",
        });
        setDialogOpen(true);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting airdrop request:", error);
      alert(`An error occurred. Please try again later.\n${error}`);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-screen flex flex-col items-center p-8 space-y-6" style={{background: "radial-gradient(ellipse at bottom, #2a1b35 0%, #090a0f 100%)"}}>
          <h1 className="text-5xl font-bold mb-1 text-zinc-200">SOL Faucet🪙</h1>
          <h2 className="text-md text-gray-200 lg:text-lg">Premium faucet for Solana Devnet & Testnet</h2>
          <Card className="w-full max-w-lg shadow-lg bg-transparent">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-zinc-200">Request Airdrop</CardTitle>
              <CardDescription className="text-gray-200">Superfast SOL Airdrop</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4 -mt-4">
              <Input
                type="text"
                placeholder="Wallet Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-transparent text-white"
              />

              <Select onValueChange={(value) => setNetwork(value)}>
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder="Select Network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="devnet">Devnet</SelectItem>
                  <SelectItem value="testnet">Testnet</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent"
              />

              <Button type="button" className="w-full mt-4 hover:bg-violet-200" onClick={handleAirdrop}>
                Confirm Airdrop
              </Button>
            </CardContent>
          </Card>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="flex items-center flex-col ">
              <DialogHeader>
                <DialogTitle className="leading-7 text-sm lg:text-base">{dialogData.success}</DialogTitle>
              </DialogHeader>
              {dialogData.signature && (
                <div className="mt-1">
                  <a href={dialogData.explorerLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Transaction on Solana Explorer</a>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <p className="text-2xl pt-6 pl-3 text-center">
          Smash the button to fund your testnet or devnet wallet and dive into the <a target="_blank" className="text-yellow-500 font-bold hover:underline" href="https://coinmarketcap.com/currencies/solana/">SOL</a> fun!
          </p>

          <footer className="text-center mt-8">
            <p className="text-md text-gray-400 mb-2 max-sm:mb-6">
              This tool is designed for development purposes and does not distribute mainnet SOL or Solana Tokens.
            </p>
            <p className="text-sm text-gray-400">Made with ❤️ by <a target="_blank" className="text-gray-300 hover:text-gray-200 hover:underline" href="https://github.com/jay-madane">@jay-madane</a></p>
          </footer>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;