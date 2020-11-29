const getDifference = require("./getDifference");

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
    var delStack = [];
    var addStack = [];
    deleted = deleted.reverse();
    added = added.reverse();
    for (var i = 0; i < deleted.length; i++) {
        delStack.push(deleted[i])
    }
    for (var i = 0; i < added.length; i++) {
        addStack.push(added[i])
    }

    while (delStack.length > 0 || addStack.length > 0) {
        if (delStack.length == 0) {
            for (var i = 0; i < addStack.length; i++) {
                d = {old: null, new: addStack.pop()};
                dictList.push(d);
            }
        }
        else if (addStack.length == 0) {
            for (var i = 0; i < delStack.length; i++) {
                d = {old: delStack.pop(), new: null};
                dictList.push(d);
            }
        }
        else {
            var found = false;
            var count = 0;
            for (var i = 0; i < addStack.length; i++) {
                if (similarity(addStack[addStack.length - (1+i)], delStack[delStack.length - 1]) > 0.75) {
                    for (var x = 0; x < count; x++) {
                        d = {old: null, new: addStack.pop()};
                        dictList.push(d);
                    }
                    d = {old: delStack.pop(), new: addStack.pop()};
                    dictList.push(d);
                    found = true;
                    break;
                }
                count++;
            }
            if (!found) {
                d = {old: delStack.pop(), new: null};
                dictList.push(d);
            }



        }
    }

    return dictList;
}



//EXAMPLE

arr_deleted = [
    "currentTarget.setBaseSpeed(currentTarget.getBaseSpeed()/2);",
    "Double d_min = 3.3 * 8374;",
    "Double d_max = 3.3 * 300;",
    "asdfasdfaerqefasdf"
    ]

arr_added = [
    "Double d_min = 3.3 * 30;",  
    "opponentsHit.add(currentTarget.getID());",
    "Double d_max = 3.3 * 5;", 
    "currentTarget.getStatusList().inflictStatus(slowDownStatus, user);"
]

arr = lineSetter(arr_deleted, arr_added)

console.log(arr)
// for (var x = 0; x < arr.length; x++) {
//     console.log(getDifference(arr[x]));
// }







