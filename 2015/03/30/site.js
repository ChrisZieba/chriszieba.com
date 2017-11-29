$(document).ready(function() {
	var player = "Player";
	var dealer = "Dealer";
	var options = {
		numberOfDecks: 1
	};

	$("#deal").click(function() {
		var btn = $(this).button('loading');
		var game = new Blackjack.Game(player, dealer, options);
		game.deal();

    setTimeout(function () {
        runProbabilties(game);
        resetTable(game);
        btn.button('reset');
    }, 1000)

	});

	function runProbabilties(game) {
		var shoe = game.getShoe();
		var dealerCards = game.getDealer().getCards();
		var playerCards = game.getPlayer().getCards();

		if ($("input[name='standProbability']").is(":checked")) {
			var standMaxPullCount = $("select[name='standAccuracy'] option:selected").val();
			var standStats = Blackjack.Probability.stand(shoe, dealerCards, playerCards, standMaxPullCount);
			$("#probabilities-stand-total-hands").html(formatNumber(standStats.hands));
			$("#probabilities-stand-win").html(standStats.win.odds.toFixed(3));
			$("#probabilities-stand-lose").html(standStats.lose.odds.toFixed(3));
			$("#probabilities-stand-push").html(standStats.push.odds.toFixed(3));
		}

		if ($("input[name='hitProbability']").is(":checked")) {
			var hitMaxPullCount = $("select[name='hitAccuracy'] option:selected").val();
			var hitStats = Blackjack.Probability.hit(shoe, dealerCards, playerCards, hitMaxPullCount);
			$("#probabilities-hit-total-hands").html(formatNumber(hitStats.hands));
			$("#probabilities-hit-win").html(hitStats.win.odds.toFixed(3));
			$("#probabilities-hit-lose").html(hitStats.lose.odds.toFixed(3));
			$("#probabilities-hit-push").html(hitStats.push.odds.toFixed(3));
		}

		if ($("input[name='doubleProbability']").is(":checked")) {
			var doubleMaxPullCount = $("select[name='doubleAccuracy'] option:selected").val();
			var doubleStats = Blackjack.Probability.double(shoe, dealerCards, playerCards, doubleMaxPullCount);
			$("#probabilities-double-total-hands").html(formatNumber(doubleStats.hands));
			$("#probabilities-double-win").html(doubleStats.win.odds.toFixed(3));
			$("#probabilities-double-lose").html(doubleStats.lose.odds.toFixed(3));
			$("#probabilities-double-push").html(doubleStats.push.odds.toFixed(3));
		}
	}

	function resetTable(game) {
		$("#dealer-cards").html(getCards(game.getDealer()));
		$("#player-cards").html(getCards(game.getPlayer()));

		if (game.turn.name === 'Player') {
			var actions = game.getTurn().getActions();
			$("#player-options").html(getActions(actions));
		} 
	}

	function getCards(player) {
		var output = [];
		var cards = player.getCards();

		for (var i = 0; i < cards.length; i+=1) {
			output.push('<div class="card"><div class="suit">' + cards[i].suit + '</div><div class="rank">' + cards[i].rank + '</div></div>');
		}
		return output.join('');
	}

	function getActions(actions) {
		var output = [];

		for (var i = 0; i < actions.length; i+=1) {
			output.push('<button data-action="'+actions[i]+'" class="action">' + actions[i] +  '</button>');
		}
		return output.join('');
	}

	function formatNumber(num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
});