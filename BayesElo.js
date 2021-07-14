
/** Bayeselo by Remi Coulom
// https://www.remi-coulom.fr/Bayesian-Elo/
**/

const DEFAULT_ELO = 1500;
const DEFAULT_ELO_ADVANTAGE = 32.8;
const DEFAULT_ELO_DRAW = 97.3;

class BayesElo {

    constructor(settings) {
        // Contains list of players with 
        this.players = [];
        this.playerMap = {};
        this.startElo = settings.elo || DEFAULT_ELO;
        this.eloAdvantage = settings.eloAdvantage || DEFAULT_ELO_ADVANTAGE;
        this.eloDraw = settings.eloDraw || DEFAULT_ELO_DRAW;

        // Consists of games... [winner, loser]
        this.processedResults = [];
        this.unprocessedResults = [];
    }

    addPlayer(player) {
        // Expects an array: [id, name, elo?]
        // Stores player as: {id: {name, elo}}
        this.playerMap[player[0]] = { name: player[1], elo: player[2] || this.startElo };
    }

    addPlayerBulk(players) {
        for (const player of players) {
            this.addPlayer(player);
        }
    }

    addResult(result) {
        this.unprocessedResults.push(result);
    }

    addResultBulk(results) {
        for (const result of results) {
            addResult(result);
        }
    }

    getPlayerRating(id) {
        if (this.playerMap[id]) {
            return this.playerMap[id].elo;
        } else {
            return null;
        }
    }

    f(delta) {
        return 1 / (1 + Math.pow(10, delta/400));
    }

    winProbability(p1, p2) {
        let p1WinProbability = this.f(p2.elo - p1.elo - this.eloAdvantage + this.eloDraw);
        let p2WinProbability = this.f(p1.elo - p2.elo - this.eloAdvantage + this.eloDraw);
        let drawProbability = 1 - p1WinProbability - p2WinProbability;
    }

    updateRatings() {
        for (const result of this.unprocessedResults) {
            let p1 = this.playerMap[result[0]];
            let p2 = this.playerMap[result[2]];
        }

        this.processedResults.push(this.unprocessedResults);
        this.unprocessedResults = [];
    }
}

module.exports.BayesElo = BayesElo;
