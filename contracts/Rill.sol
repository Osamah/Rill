//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

abstract contract Context {
   function _msgSender() internal view virtual returns (address) {
       return msg.sender;
   }

   function _msgData() internal view virtual returns (bytes calldata) {
       this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
       return msg.data;
   }

   function _msgValue() internal view virtual returns (uint256 value) {
       return msg.value;
   }
}

abstract contract Owner is Context {
   address public owner;

   constructor () {
       owner = _msgSender();
   }

   /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(_msgSender() == owner);
        _;
    }

    /**
     * @dev Check if the current caller is the contract owner.
     */
     function isOwner() internal view returns(bool) {
         return owner == _msgSender();
     }
}

contract Rill is Owner {
  
   struct Tournament {
       uint256 tournamentType; // 5v5, 1v1, 2v2, battle royale, ...
       string name;
       bool ongoing;
       uint256[] teamIds; // based on tournamentType will use players or teams
       address[] players; // based on tournamentType will use players or teams
       uint256 fee;
       uint256[] prize; // [first prize, second prize, etc...]
       uint256[] badges; // which badges are enabled for this tournament
       uint256[] bountyIds; // which bounties are enabled for this tournament
       address owner;
   }

   uint256 public tournamentId;

   mapping (uint256 => Tournament) public tournaments;

   struct Bounty {
       uint256 tournamentId;
       address placer;
       address collector;
       address player;
       uint256 amount;
       bool collected;
   }

   struct Team {
       string name;
       address[] players;
   }
   uint256 public teamId = 1;
   mapping (uint256 => Team) public teams;

   mapping (address => Team) public playersInTeam;

   /**
    * @dev Add a Tournament with predefined `name`, `description` and `price`
    * to the library.
    *
    * Returns a boolean value indicating whether the operation succeeded.
    *
    * Emits a {NewTournament} event.
    */
   function createTournament(
       uint256 tournamentType,
       string memory name,
       uint256[] memory _teamIds,
       address[] memory players,
       uint256 fee,
       uint256[] memory prize,
       uint256[] memory badges
    ) public returns (bool success) {
       Tournament memory tournament = Tournament(tournamentType, name, false, _teamIds, players, fee, prize, badges, new uint256[](0), _msgSender());

       tournaments[tournamentId] = tournament;

       emit NewTournament(tournamentId++);

       return true;
   }

   /**
    * @dev Register for a tournament as team or solo player
    *
    * Emits a `NewTournamentRegistration` event.
    */
   function registerForTournament(uint256 _tournamentId, uint256 _teamId) public payable returns (bool) {
       Tournament storage tournament = tournaments[_tournamentId];

       require(tournament.ongoing == false, "The tournament has already started");
       require(equals(playersInTeam[_msgSender()], teams[_teamId]), "You are not part of this team");
       require(_msgValue() >= tournament.fee, "Not enough funds sent");

       _sendTRX(tournament.owner, _msgValue());

        if (_teamId > 0) {
            tournament.teamIds.push(_teamId);
        } else {
            tournament.players.push(_msgSender());
        }

       emit NewTournamentRegistration(_tournamentId, _msgSender());

       return true;
   }

   /**
    * @dev Delete a book from the library. Only the book's owner or the
    * library's owner is authorised for this operation.
    *
    * Returns a boolean value indicating whether the operation succeeded.
    *
    * Emits a `EndTournament` event.
    */
   function endTournament(uint256 _tournamentId, address[] memory winners) public returns(bool success) {
       require(isOwner(), "You are not authorised to end tournaments");
      
       Tournament storage tournament = tournaments[_tournamentId];

       tournament.ongoing = false;
       
       for (uint i = 0; i < winners.length; i++) {
           _sendTRX(winners[i], tournament.prize[i]);
        }

       emit EndTournament(_tournamentId);

       return true;
   }


   /**
    * @dev Create a new Team
    *
    * Returns a boolean value indicating whether the operation succeeded.
    *
    * Emits a {NewTeam} event.
    */
   function createTeam(
       string memory name,
       address[] memory players
    ) public returns (bool success) {
       Team memory team = Team(name, players);

       teams[teamId] = team;

       emit NewTeam(teamId++);

       return true;
   }
   
   /**
    * @dev Assign players to team
    *
    * Returns a boolean value indicating whether the operation succeeded.
    *
    * Emits a {PlayersAssignedToTeam} event.
    */
   function AssignPlayersToTeam(
       uint256 _teamId,
       address[] memory _players
    ) public returns (bool success) {
       Team storage team = teams[_teamId];

       team.players = _players;

       emit PlayersAssignedToTeam(teamId, _players);

       return true;
   }

    function equals(Team storage _first, Team storage _second) internal view returns (bool) {
        return(keccak256(abi.encodePacked(_first.name, _first.players)) == keccak256(abi.encodePacked(_second.name, _second.players)));
    }
   /**
    * @dev Send TRX
    */
   function _sendTRX(address receiver, uint256 value) internal {
       payable(address(uint160(receiver))).transfer(value);
   }

   /**
    * @dev Emitted when a new tournament is created
    * Note `tournamentId` starts from 0
    */
   event NewTournament(uint256 indexed tournamentId);

   /**
    * @dev Emitted when a player or team registers
    * Note Currently only player address is being tracked
    */
   event NewTournamentRegistration(uint256 indexed tournamentId, address player);

   /**
    * @dev Emitted when a tournament has ended
    * Note `tournamentId` starts from 0
    */
   event EndTournament(uint256 indexed tournamentId);

   /**
    * @dev Emitted when a new team is created
    * Note `teamId` starts from 1
    */
   event NewTeam(uint256 indexed tournamentId);

   /**
    * @dev Emitted when players are assigned to a team
    * Note `teamId` starts from 1
    */
   event PlayersAssignedToTeam(uint256 indexed teamId, address[] players);

}