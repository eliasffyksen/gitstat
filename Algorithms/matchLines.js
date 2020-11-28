
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
            for (var i = 0; i < delStack.length; i++) {
                if (similarity(addStack[addStack.length - 1], delStack[delStack.length - (1+i)]) > 0.75) {
                    for (var x = 0; x < count; x++) {
                        d = {old: delStack.pop(), new: null};
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
                d = {old: null, new: addStack.pop()};
                dictList.push(d);
            }



        }
    }

    //console.log(delStack)

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







// OLD FUNC

// function lineSetter(deleted, added) {
//     var dictList = [];
//     var used_index_deleted = [];
//     var used_index_added = [];
//     for (var i = 0; i < deleted.length; i++) {
//         var best = 0;
//         var oldS = "";
//         var newS = "";
//         var usedI = null;
//         var usedJ = null;
//         for (var j = 0; j < added.length; j++) {
//             var x = similarity(deleted[i], added[j]);
//             if (x > best) {
//                 best = x;
//                 oldS = deleted[i];
//                 newS = added[j];
//                 usedI = i;
//                 usedJ = j;
//             }
//         }
//         if (best > 0.75) {
//             for (var k = 0; k < usedJ; k++) {
//                 if (!used_index_added.includes(k)) {
//                     dict = {old: null, new: added[k]};
//                     dictList.push(dict);
//                 }
//             }
//             dict = {old: oldS, new: newS};
//             dictList.push(dict);
//             used_index_added.push(usedJ);
//             used_index_deleted.push(usedI);
//         } else {
//             dict = {old: oldS, new: null};
//             dictList.push(dict);
//         }
//     }

//     if (used_index_added.length > 0) {
//         for (var k = used_index_added[used_index_added.length - 1]; k < added.length; k++) {
//             dict = {old: null, new: added[k]};
//             dictList.push(dict);
//         }
//     }

//     return dictList;
//}