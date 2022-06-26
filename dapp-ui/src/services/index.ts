const RillContractAddress = 'TCcPwEQJTH4hkG5xTYmj7EpNdtqhHD3ZMT';
let rillContract: RillContract;

export async function setRillContract() {
    rillContract = await window.tronWeb.contract().at(RillContractAddress);
    console.log(rillContract);
}

export async function createTeam() {
    let name = 'nakama';
    let logo = 'https://tinyurl.com/nakamalogo';
    let players = ['TXP7FFLRNJXthdB8PSehdNNTJpjMrkGNYK'];

    const result = await rillContract.createTeam(name, logo, players).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: true
    });

    alert(`Team ${name} created, have fun!`)
    return result;
}

export async function fetchTeams() {
    const teams = [];

    const teamId = await rillContract.teamId().call();

    console.log(teamId);

    for (let i = 0; i < teamId; i++) {
        const team = await rillContract.teams(i).call();
        console.log(team);

        if (team.name != "") {
            teams.push(
                {
                    id: i,
                    name: team.name
                }
            )
        }

    }

    return teams
}

export async function assignPlayersToTeam() {
    const _teamId: number = 1;
    const _players: string[] = ['TXP7FFLRNJXthdB8PSehdNNTJpjMrkGNYK'];

    const result = await rillContract.assignPlayersToTeam(_teamId, _players).send({});

    console.log(result);

    return result;
}

export async function placeBounty() {
    let tournamentId = 1;
    let playerAddress = 'TXP7FFLRNJXthdB8PSehdNNTJpjMrkGNYK';
    let amount = 50;

    const result = await rillContract.placeBounty(tournamentId, playerAddress, amount).send({
        feeLimit: 100_000_000,
        callValue: amount * 1000000,
        shouldPollResponse: true
    });

    alert('Bounty placed!');

    return result;
}

export async function collectBounty() {
    const bountyId = 1;
    const collector = 'TXP7FFLRNJXthdB8PSehdNNTJpjMrkGNYK';

    const result = await rillContract.collectBounty(bountyId, collector).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: true
    });

    alert('Bounty collected!');

    return result;
}