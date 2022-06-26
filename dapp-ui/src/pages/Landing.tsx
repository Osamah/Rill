import { createTeam, fetchTeams, placeBounty, setRillContract } from '../services';
import { useNavigate } from "react-router-dom";
import './Landing.css';

export function Landing() {
  const navigate = useNavigate();

  async function getTronWeb() {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      console.log("Yes, catch it:", window.tronWeb.defaultAddress.base58)
    } else {
      console.log("No tronWeb available")
    }

    await setRillContract();
    
    navigate('/experiment');
  }

  return (
    <main className="landing">
      <a onClick={getTronWeb}></a>
    </main>
  );
}
