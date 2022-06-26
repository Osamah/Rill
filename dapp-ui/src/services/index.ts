const RillContractAddress = 'THMU3ec3yGnTH4Z64tuy8XKjVi76cw1uA1';
let rillContract: RillContract;

export async function setRillContract() {
    rillContract = await window.tronWeb.contract().at(RillContractAddress);
    console.log(rillContract);
}

export async function createTeam() {
    let name = 'nakama';

    const result = await rillContract.createTeam(name, []).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: true
    });

    alert(`Team ${name} created, have fun!`)
}

export async function fetchTeams() {
    const teams = [];

    const teamId = await rillContract.teamId().call();

    for (let i = 1; i < teamId; i++) {
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


export async function placeBounty() {
    let tournamentId = 1;
    let playerAddress = '0x0';
    let amount = 100;

    const result = await rillContract.placeBounty(tournamentId, playerAddress, amount).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: true
    });

    alert('Bounty placed!')
}