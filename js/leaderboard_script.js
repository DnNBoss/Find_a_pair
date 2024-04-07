let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

export function addPlayerToLeaderboard(player) {
    leaderboardData.push(player);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    updateLeaderboard();
}

export function updateLeaderboard() {
    let copiedData = leaderboardData.slice();
    copiedData.sort(sortLeaderboardDescending);
    let topPlayers = setLimitLeaderboardEntries(copiedData, 10);
    displayLeaderboardTable(topPlayers);
}

function sortLeaderboardDescending(a, b) {
    return b.score - a.score;
}

function setLimitLeaderboardEntries(data, limit) {
    return data.slice(0, limit);
}

function displayLeaderboardTable(leaderboardData) {
    let leaderboardTable = clearLeaderboardTable();
    
    addTableHeader(leaderboardTable);
    leaderboardData.forEach(function (player, index) {
        let cellRank = index + 1;
        let cellName = player.name;
        let cellScore = player.score;
        addNewRow(leaderboardTable, cellRank, cellName, cellScore);
    });
}

function clearLeaderboardTable() {
    let leaderboardTable = document.getElementById('leaderboard');
    leaderboardTable.innerHTML = '';
    return leaderboardTable;
}

function addTableHeader(table) {
    addNewRow(table, "№", "Nickname", "Points");
}

function addNewRow(table, cellRank, cellName, cellScore) {
    let row = table.insertRow();
    row.insertCell(0).textContent = cellRank;
    row.insertCell(1).textContent = cellName;
    row.insertCell(2).textContent = cellScore;
}