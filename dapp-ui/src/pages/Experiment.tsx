import { assignPlayersToTeam, collectBounty, createTeam, fetchTeams, placeBounty, setRillContract } from '../services';
import { useNavigate } from "react-router-dom";
import './Experiment.css';
import { useEffect } from 'react';

export function Experiment() {
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      await setRillContract();
    };

    initialize();
  }, []);

  async function _fetchTeams() {
    console.log(await fetchTeams());
  }

  async function _createTeam() {
    console.log(await createTeam());
  }

  async function _assignPlayersToTeam() {
    console.log(await assignPlayersToTeam());
  }

  async function _placeBounty() {
    console.log(await placeBounty());
  }

  async function _collectBounty() {
    console.log(await collectBounty());
  }

  return (
    <main className="experiment">
      <a onClick={_fetchTeams}>fetchTeams</a>
      <a onClick={_createTeam}>createTeam</a>
      <a onClick={_assignPlayersToTeam}>assignPlayersToTeam</a>

      <a onClick={_placeBounty}>placeBounty</a>
      <a onClick={_collectBounty}>collectBounty</a>
    </main>
  );
}
