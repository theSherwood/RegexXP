/*
This is a modified version of Efog's react-process-string module. The following is the license:

Copyright 2017 Efog

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

function processString(options) {
  // debugger;
  let key = 0;

  function processInputWithRegex(option, input) {
    if (!option.fn || typeof option.fn !== "function") return input;

    if (!option.regex || !(option.regex instanceof RegExp)) return input;

    let regex = option.regex;
    let result = null;
    let output = [];

    if ((result = input.match(regex)) !== null) {
      if (result.length > input.length) return input;
      if (result.join("") === "") {
        return input;
      } else {
        let strRemains = input;
        result.forEach(match => {
          regex.lastIndex = 0;
          const singleResult = regex.exec(strRemains);
          if (!singleResult) return;
          output.push(strRemains.slice(0, singleResult.index));
          strRemains = strRemains.slice(singleResult.index + match.length);
          output.push(option.fn(++key, match));
        });
        output.push(strRemains);
      }
    } else {
      return input;
    }

    /*
      Beginning of modifaction of original efog code
      */
    // if ((result = input.match(regex)) !== null) {
    //   if (result.length > input.length)
    //     // need to throw an error
    //     return input;
    //   if (result.join("") === "") {
    //     return input;
    //   } else {
    //     let strRemains = input;
    //     result.forEach((match, i) => {
    //       regex.lastIndex = 0;
    //       const singleResult = regex.exec(strRemains);
    //       if (!singleResult) return;
    //       output.push(strRemains.slice(0, singleResult.index));
    //       strRemains = strRemains.slice(singleResult.index + match.length);
    //       output.push(option.fn(++key, match));
    //     });
    //     output.push(strRemains);
    //   }
    // } else {
    //   return input;
    // }
    /* End of modified section */

    return output;
  }

  function collateOutput(options, outputs, input) {
    /* 
    outputs are a 3d array:
    1d. Length of the original input string
    2d. Width of the number of regex filters
    3d. Depth of at most 2;
      * outputs[i][j][0]: The input letter
      * outputs[i][j][1]: The start of the current regex selection (in 1d)
    
    If the input letter is not in a regex selection, the outputs[i][j] value will
    be a character rather than an array.
    */

    function addSelected(endIndex) {
      const slice = input.slice(selectionStartIndex, endIndex);
      finalResult.push(options.fn(++key, slice));
    }

    function addUnselected(endIndex) {
      const slice = input.slice(selectionEndIndex, endIndex);
      finalResult.push(slice);
    }

    let finalResult = [];
    let selectionStartIndex = 10000;
    let selectionEndIndex = 0;
    let rowSelected = false;
    for (let i = 0; i < outputs[0].length; i++) {
      let lowestThisRow = 10000;
      for (let j = 0; j < outputs.length; j++) {
        if (rowSelected || Array.isArray(outputs[i][j])) {
          rowSelected = true;
          lowestThisRow = Math.min(selectionStartIndex, outputs[i][j][1]);
        }
      }
      if (rowSelected === false || lowestThisRow >= i) {
        // Add selected section to finalResult with react elements
        addSelected(i);
        selectionStartIndex = 10000;
        selectionEndIndex = rowSelected === false ? i : i + 1;
      } else {
        if (lowestThisRow < selectionStartIndex) {
          // Add non-selected section to the finalResult
          addUnselected(i);
        }
        selectionStartIndex = Math.min(lowestThisRow, selectionStartIndex);
      }
    }
    if (selectionStartIndex > selectionEndIndex) {
      addSelected();
    } else {
      addUnselected();
    }
    return finalResult;
  }

  return function(input) {
    if (!options || !Array.isArray(options) || !options.length || !input)
      // Modified
      return input;

    let regexIndex = 0;
    const outputs = [];
    options.forEach(option => (input = processInputWithRegex(option, input)));
    return collateOutput(options, outputs, input);

    return input;
  };
}

module.exports = processString;
