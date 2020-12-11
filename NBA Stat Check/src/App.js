import React, { useState } from "react";
import "./styles.css";

export default function App(props) {
  const [playerfName, setPlayerfName] = useState("");
  const [playerlName, setPlayerlName] = useState("");
  const [innerSearchPlayer, setInnerSearchPlayer] = useState("");
  const [innerSearchSeason, setInnerSearchSeason] = useState("");
  const [playerStats, setPlayerStats] = useState("");
  const [searchMade, setSearchMade] = useState(false);

  const [p1pointsStyle, setp1pointsStyle] = useState("");
  const [p1reboundsStyle, setp1reboundsStyle] = useState("");
  const [p1assistsStyle, setp1assistsStyle] = useState("");
  const [p1blocksStyle, setp1blocksStyle] = useState("");
  const [p1stealsStyle, setp1stealsStyle] = useState("");

  const [player2fName, setPlayer2fName] = useState("");
  const [player2lName, setPlayer2lName] = useState("");
  const [innerSearchPlayer2, setInnerSearchPlayer2] = useState("");
  const [innerSearchSeason2, setInnerSearchSeason2] = useState("");
  const [player2Stats, setPlayer2Stats] = useState("");
  const [search2Made, setSearch2Made] = useState(false);

  const [p2pointsStyle, setp2pointsStyle] = useState("");
  const [p2reboundsStyle, setp2reboundsStyle] = useState("");
  const [p2assistsStyle, setp2assistsStyle] = useState("");
  const [p2blocksStyle, setp2blocksStyle] = useState("");
  const [p2stealsStyle, setp2stealsStyle] = useState("");

  const [anotherSearch, setAnotherSearch] = useState(false);

  //Searches for the player ID based upon the search teams
  function searchPlayer(input) {
    //adds underscores for hyphens as per the API request documentation
    const replace = input.split(" ").join("_");

    const url = `https://www.balldontlie.io/api/v1/players?search=${replace}`;

    //Relevant for second player search
    setSearchMade(true);

    fetch(url)
      .then((res) => res.json())
      .then(async (res) => {
        if (res.data[0] === undefined) {
          alert(
            "This player didn't play in the season specified or is not in the database"
          );
        } else if (res.data.length > 1) {
          alert("Pleases specify the name more");
        } else {
          getPlayerStats(res.data[0].id);
          setPlayerfName(res.data[0].first_name);
          setPlayerlName(res.data[0].last_name);
        }
      });
  }

  //Retrieves the player's stats as per the player ID from previous function
  function getPlayerStats(input) {
    const url = `https://www.balldontlie.io/api/v1/season_averages?season=${innerSearchSeason}&player_ids[]=${input}`;

    if (
      url ===
      `https://www.balldontlie.io/api/v1/season_averages?season=&player_ids[]=${input}`
    ) {
      alert("Please specify the season");
    } else {
      fetch(url)
        .then((res) => res.json())
        .then(async (res) => {
          if (res.data[0] === undefined) {
            alert(
              "This player didn't play in the season specified or is not in the database"
            );
          } else {
            setPlayerStats(res.data[0]);
            compareStats(res.data[0]);
          }
        });
    }
  }

  ////////////////////////
  //PLAYER 2
  ////////////////////////

  function searchPlayer2(input) {
    //adds underscores for hyphens as per the API request documentation
    const replace = input.split(" ").join("_");

    const url = `https://www.balldontlie.io/api/v1/players?search=${replace}`;

    //Relevant for second player search
    setSearch2Made(true);

    fetch(url)
      .then((res) => res.json())
      .then(async (res) => {
        if (res.data[0] === undefined) {
          alert(
            "This player didn't play in the season specified or is not in the database"
          );
        } else if (res.data.length > 1) {
          alert("Pleases specify the name more");
        } else {
          getPlayer2Stats(res.data[0].id);
          setPlayer2fName(res.data[0].first_name);
          setPlayer2lName(res.data[0].last_name);
        }
      });
  }

  //Retrieves the player's stats as per the player ID from previous function
  function getPlayer2Stats(input) {
    const url = `https://www.balldontlie.io/api/v1/season_averages?season=${innerSearchSeason2}&player_ids[]=${input}`;

    if (
      url ===
      `https://www.balldontlie.io/api/v1/season_averages?season=&player_ids[]=${input}`
    ) {
      alert("Please specify the season");
    } else {
      fetch(url)
        .then((res) => res.json())
        .then(async (res) => {
          if (res.data[0] === undefined) {
            alert(
              "This player didn't play in the season specified or is not in the database"
            );
          } else {
            setPlayer2Stats(res.data[0]);
            compare2Stats(res.data[0]);
          }
        });
    }
  }

  function compareStats(input) {
    //Compare points
    if (player2Stats.pts < input.pts) {
      setp1pointsStyle("better");
      setp2pointsStyle("neutral");
    } else if (player2Stats.pts > input.pts) {
      setp2pointsStyle("better");
      setp1pointsStyle("neutral");
    }

    //Compare rebounds
    if (player2Stats.reb < input.reb) {
      setp1reboundsStyle("better");
      setp2reboundsStyle("neutral");
    } else if (player2Stats.reb > input.reb) {
      setp2reboundsStyle("better");
      setp1reboundsStyle("neutral");
    }

    //Compare assists
    if (player2Stats.ast < input.ast) {
      setp1assistsStyle("better");
      setp2assistsStyle("neutral");
    } else if (player2Stats.ast > input.ast) {
      setp2assistsStyle("better");
      setp1assistsStyle("neutral");
    }

    //Compare blocks
    if (player2Stats.blk < input.blk) {
      setp1blocksStyle("better");
      setp2blocksStyle("neutral");
    } else if (player2Stats.blk > input.blk) {
      setp2blocksStyle("better");
      setp1blocksStyle("neutral");
    }

    //Compare steals
    if (player2Stats.stl < input.stl) {
      setp1stealsStyle("better");
      setp2stealsStyle("neutral");
    } else if (player2Stats.stl > input.stl) {
      setp2stealsStyle("better");
      setp1stealsStyle("neutral");
    }
  }

  function compare2Stats(input) {
    //Compare points
    if (playerStats.pts > input.pts) {
      setp1pointsStyle("better");
      setp2pointsStyle("neutral");
    } else if (playerStats.pts < input.pts) {
      setp2pointsStyle("better");
      setp1pointsStyle("neutral");
    }

    //Compare rebounds
    if (playerStats.reb > input.reb) {
      setp1reboundsStyle("better");
      setp2reboundsStyle("neutral");
    } else if (playerStats.reb < input.reb) {
      setp2reboundsStyle("better");
      setp1reboundsStyle("neutral");
    }

    //Compare assists
    if (playerStats.ast > input.ast) {
      setp1assistsStyle("better");
      setp2assistsStyle("neutral");
    } else if (playerStats.ast < input.ast) {
      setp2assistsStyle("better");
      setp1assistsStyle("neutral");
    }

    //Compare blocks
    if (playerStats.blk > input.blk) {
      setp1blocksStyle("better");
      setp2blocksStyle("neutral");
    } else if (playerStats.blk < input.blk) {
      setp2blocksStyle("better");
      setp1blocksStyle("neutral");
    }

    //Compare steals
    if (playerStats.stl > input.stl) {
      setp1stealsStyle("better");
      setp2stealsStyle("neutral");
    } else if (playerStats.stl < input.stl) {
      setp2stealsStyle("better");
      setp1stealsStyle("neutral");
    }
  }

  return (
    <div className="App">
      <h1 className="App_Title">NBA STAT CHECK</h1>
      <div className="wholeThing">
        <div className="leftSide">
          {!searchMade && (
            <div className="inputContainer">
              <div className="searchBar">
                <input
                  aria-labelledby="search-button"
                  name="search"
                  id="playersearch"
                  type="search"
                  value={innerSearchPlayer}
                  placeholder="Player Name"
                  onChange={(e) => setInnerSearchPlayer(e.target.value)}
                />
              </div>
              <div className="searchBar">
                <input
                  aria-labelledby="search-button"
                  name="search"
                  id="seasonsearch"
                  type="search"
                  value={innerSearchSeason}
                  placeholder="Season (e.g. 2019 for 19/20)"
                  onChange={(e) => setInnerSearchSeason(e.target.value)}
                />
              </div>
              <button
                id="retrieveButton"
                type="button"
                onClick={(e) => searchPlayer(innerSearchPlayer)}
              >
                Retrieve Stats
              </button>
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
          )}

          {searchMade && (
            <div className="player_container">
              <div id="playerFull">
                <div className="searchAgainButton">
                  <button
                    id="searchAgain"
                    type="button"
                    onClick={(e) => setSearchMade(false)}
                  >
                    Search Again
                  </button>
                </div>
                <div className="player1">
                  <h2 className="playerName">{playerfName}</h2>
                  <h2>{playerlName}</h2>
                  <h3 className="playerSeason">{innerSearchSeason}</h3>

                  <h2 className={p1pointsStyle}>{playerStats.pts} ppg</h2>
                  <h2 className={p1reboundsStyle}>{playerStats.reb} rpg</h2>
                  <h2 className={p1assistsStyle}>{playerStats.ast} apg</h2>
                  <h2 className={p1blocksStyle}>{playerStats.blk} bpg</h2>
                  <h2 className={p1stealsStyle}>{playerStats.stl} spg</h2>
                </div>

                {searchMade && !anotherSearch && (
                  <div className="compareContainer">
                    <button
                      id="compareButton"
                      type="button"
                      onClick={(e) => setAnotherSearch(true)}
                    >
                      Compare
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="rightSide">
          {anotherSearch && !search2Made && (
            <div className="anotherSearch">
              <div className="inputContainer">
                <div className="searchBar">
                  <input
                    aria-labelledby="search-button"
                    name="search"
                    id="playersearch"
                    type="search"
                    value={innerSearchPlayer2}
                    placeholder="Player Name"
                    onChange={(e) => setInnerSearchPlayer2(e.target.value)}
                  />
                </div>
                <div className="searchBar">
                  <input
                    aria-labelledby="search-button"
                    name="search"
                    id="seasonsearch"
                    type="search"
                    value={innerSearchSeason2}
                    placeholder="Season (e.g. 2019 for 19/20)"
                    onChange={(e) => setInnerSearchSeason2(e.target.value)}
                  />
                </div>
                <button
                  id="retrieveButton"
                  type="button"
                  onClick={(e) => searchPlayer2(innerSearchPlayer2)}
                >
                  Retrieve Stats
                </button>
              </div>
            </div>
          )}

          {search2Made && (
            <div id="playerFull">
              <div className="player2">
                <h2 className="playerName">{player2fName}</h2>
                <h2>{player2lName}</h2>
                <h3 className="playerSeason">{innerSearchSeason2}</h3>
                <h2 className={p2pointsStyle}>{player2Stats.pts} ppg</h2>
                <h2 className={p2reboundsStyle}>{player2Stats.reb} rpg</h2>
                <h2 className={p2assistsStyle}>{player2Stats.ast} apg</h2>
                <h2 className={p2blocksStyle}>{player2Stats.blk} bpg</h2>
                <h2 className={p2stealsStyle}>{player2Stats.stl} spg</h2>
              </div>
              <div className="searchAgainButton">
                <button
                  id="searchAgain"
                  type="button"
                  onClick={(e) => setSearch2Made(false)}
                >
                  Search Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
