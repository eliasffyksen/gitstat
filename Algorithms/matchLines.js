
function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

function lineSetter(deleted, added) {
    var dictList = [];
    var used_index_deleted = [];
    var used_index_added = [];
    for (var i = 0; i < deleted.length; i++) {
        var best = 0;
        var oldS = "";
        var newS = "";
        var usedI = null;
        var usedJ = null;
        for (var j = 0; j < added.length; j++) {
            var x = similarity(deleted[i], added[j]);
            if (x > best) {
                best = x;
                oldS = deleted[i];
                newS = added[j];
                usedI = i;
                usedJ = j;
            }
        }
        if (best > 0.75) {
            dict = {old: oldS, new: newS};
            dictList.push(dict);
            used_index_added.push(usedJ);
            used_index_deleted.push(usedI);
        }
    }

    for (var x = 0; x < deleted.length; x++) {
        if (!used_index_deleted.includes(x)) {
            var y = {old: deleted[x], new: null};
            dictList.push(y);
        }
    }

    for (var x = 0; x < added.length; x++) {
        if (!used_index_added.includes(x)) {
            var y = {old: null, new: added[x]};
            dictList.push(y);
        }
    }

    return dictList;
}

arr_deleted = [
    "currentTarget.setBaseSpeed(currentTarget.getBaseSpeed()/2);",
    "Double d_min = 3.3 * 30;",
    "Double d_max = 3.3 * 300;"
    ]

arr_added = [
    "Double d_min = 3.3 * 1;",
    "opponentsHit.add(currentTarget.getID());",
    "Double d_max = 3.3 * 5;",
    "currentTarget.getStatusList().inflictStatus(slowDownStatus, user);"
]

console.log(lineSetter(arr_deleted, arr_added))