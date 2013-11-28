function parseDie(str) {
    var i;
    var result = [];
    for (i = 0; i < str.length; i++) {
        result.push(parseInt(str[i]));
    }
    return result;
}

function calcFrequencies(dice, dieIndex, subtotal, table) {
    var i
    // If we're on the last die, add the totals to the dictionary.
    if (dieIndex == (dice.length - 1)) {
        for (i = 0; i < dice[dieIndex].length; i++) {
            var total = subtotal + dice[dieIndex][i];
            if (table[total]) {
                table[total] = table[total] + 1;
            }
            else {
                table[total] = 1
            }
        }
    }
    // Otherwise, recurse down the tree for each face on this die.
    else {
        for (i = 0; i < dice[dieIndex].length; i++) {
            calcFrequencies(dice, dieIndex + 1, subtotal + dice[dieIndex][i], table);
        }
    }
}

function doCalc() {
    var dice = $("textarea#dice").val()
        .split("\n")
        .map(parseDie);
    var frequencies = {};
    var output = "";
    var factor = 1;

    calcFrequencies(dice, 0, 0, frequencies);
    if ($("input:checkbox#normalise").is(":checked")) {
        var permutations =
            dice.reduce(function(acc, die) {return acc * die.length}, 1);
        factor = 1 / permutations;
    }
    for (var total in frequencies) {
        output += (total + "," + (frequencies[total] * factor) + "\n");
    }
    $("textarea#results").val(output);
}

$(document).ready(function() {
    $("button#docalc").click(doCalc);
})
