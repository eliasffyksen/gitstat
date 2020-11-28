

/**
 * @param {string} string1
 * @param {string} string2
 * @return {string}
 */

// Get differences in a string recursively return a list containing dictionaries and common strings

module.exports = function getDifference(dict) {

    string1 = dict.old
    string2 = dict.new

    if (string1 == null || string2 == null) {
      return [dict];
    }

    const s1 = [...string1];
    const s2 = [...string2];
  
    // Init the matrix of all substring lengths to use Dynamic Programming approach.
    const substringMatrix = Array(s2.length + 1).fill(null).map(() => {
      return Array(s1.length + 1).fill(null);
    });
  
    // Fill the first row and first column with zeros to provide initial values.
    for (let columnIndex = 0; columnIndex <= s1.length; columnIndex += 1) {
      substringMatrix[0][columnIndex] = 0;
    }
  
    for (let rowIndex = 0; rowIndex <= s2.length; rowIndex += 1) {
      substringMatrix[rowIndex][0] = 0;
    }
  
    // Build the matrix of all substring lengths to use Dynamic Programming approach.
    let longestSubstringLength = 0;
    let longestSubstringColumn = 0;
    let longestSubstringRow = 0;
  
    for (let rowIndex = 1; rowIndex <= s2.length; rowIndex += 1) {
      for (let columnIndex = 1; columnIndex <= s1.length; columnIndex += 1) {
        if (s1[columnIndex - 1] === s2[rowIndex - 1]) {
          substringMatrix[rowIndex][columnIndex] = substringMatrix[rowIndex - 1][columnIndex - 1] + 1;
        } else {
          substringMatrix[rowIndex][columnIndex] = 0;
        }
  
        // Try to find the biggest length of all common substring lengths
        // and to memorize its last character position (indices)
        if (substringMatrix[rowIndex][columnIndex] > longestSubstringLength) {
          longestSubstringLength = substringMatrix[rowIndex][columnIndex];
          longestSubstringColumn = columnIndex;
          longestSubstringRow = rowIndex;
        }
      }
    }
  
    if (longestSubstringLength === 0) {
      // Longest common substring has not been found.
      return [dict];
    }
  
    // Detect the longest substring from the matrix.
    let longestSubstring = '';

    var length = longestSubstringLength;
    var endIndex1 =  longestSubstringColumn;
    var endIndex2 = longestSubstringRow;

    while (substringMatrix[longestSubstringRow][longestSubstringColumn] > 0) {
      longestSubstring = s1[longestSubstringColumn - 1] + longestSubstring;
      longestSubstringRow -= 1;
      longestSubstringColumn -= 1;
    }

    for (let i = endIndex2-length; i < endIndex2; i += 1) {
        s2[i] = "";
    }

    for (let i = endIndex1 - length; i < endIndex1; i += 1) {
        s1[i] = "";
    }
    
    var leftOld = string1.substr(0, endIndex1-length);
    var leftNew = string2.substr(0, endIndex2-length);
    var rightOld = string1.substr(endIndex1);
    var rightNew = string2.substr(endIndex2);

    if (longestSubstring.length < 5) {
        return [dict];
    }
    return [...getDifference({old: leftOld, new: leftNew}), longestSubstring, ...getDifference({old: rightOld, new: rightNew})];

    
  }



// EXAMPLE USE:

// var stringOld = "ySystem.out.print(\"Hello World! \" + 44*2)";
// var stringNew = "xxSystem.out.print(\"Greetings World! \" + 44*3)";
// var dictionary = {old: stringOld, new:stringNew}
// console.log(longestCommonSubstring(dictionary));

// Output:

//    [
//      { old: 'y', new: 'xx' },
//      'System.out.print("',
//      { old: 'Hello', new: 'Greetings' },
//      ' World! " + 44*',
//      { old: '2)', new: '3)' }
//    ]