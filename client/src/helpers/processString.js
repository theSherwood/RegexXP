/*
This is a modified version of Efog's react-process-string module. The following is the license:

Copyright 2017 Efog

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

function processString(options) {
  let key = 0;
  const outputs = [];

  function processInputWithRegex(regexFilter, input) {
    if (!regexFilter || !(regexFilter instanceof RegExp)) {
      outputs.push(input.split(""));
      return;
    }

    let regex = regexFilter;
    let result = null;
    let output = [];
    let index = 0;

    if ((result = input.match(regex)) !== null) {
      console.log("result", result);
      if (result.length > input.length) {
        outputs.push(input.split(""));
        return;
      }
      if (result.join("") === "") {
        outputs.push(input.split(""));
        return;
      } else {
        result.forEach(match => {
          const singleResult = regex.exec(input);
          output.push(...input.slice(index, singleResult.index).split(""));
          index = singleResult.index + match.length;
          output.push(
            ...input
              .slice(singleResult.index, index)
              .split("")
              .map(value => [value, singleResult.index])
          );
        });
        output.push(...input.slice(index).split(""));
      }
      outputs.push(output);
      return;
    } else {
      outputs.push(input.split(""));
      return;
    }
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
    if (outputs.length === 0) return input;
    function addSelected(endIndex) {
      // if (selectionStartIndex === endIndex && endIndex === 0) return;
      const slice = input.slice(selectionStartIndex, endIndex);
      finalResult.push(options.fn(++key, slice));
    }

    function addUnselected(endIndex) {
      // if (selectionEndIndex === endIndex && endIndex === 0) return;
      const slice = input.slice(selectionEndIndex, endIndex);
      finalResult.push(slice);
    }

    console.log("outputs", outputs);
    let finalResult = [];
    let selectionStartIndex = 10000;
    let selectionEndIndex = 0;
    for (let i = 0; i < outputs[0].length; i++) {
      let lowestThisRow = 10000;
      let rowSelected = false;
      for (let j = 0; j < outputs.length; j++) {
        if (rowSelected || Array.isArray(outputs[j][i])) {
          rowSelected = true;
          lowestThisRow = isNaN(Math.min(lowestThisRow, outputs[j][i][1]))
            ? lowestThisRow
            : Math.min(lowestThisRow, outputs[j][i][1]);
        }
      }
      if (rowSelected === false) {
        if (selectionStartIndex < i) {
          // Add selected section to finalResult with react elements
          addSelected(i);
          selectionEndIndex = i;
        }
        selectionStartIndex = 10000;
      } else if (lowestThisRow >= i) {
        if (selectionStartIndex < i) {
          // Add selected section to finalResult with react elements
          addSelected(i);
          selectionEndIndex = i + 1;
        } else {
          addUnselected(i);
        }
        selectionStartIndex = lowestThisRow;
      } else {
        if (lowestThisRow < selectionStartIndex) {
          // Add non-selected section to the finalResult
          addUnselected(i);
        }
        selectionStartIndex = Math.min(lowestThisRow, selectionStartIndex);
      }
    }
    if (selectionStartIndex < outputs[0].length) {
      addSelected();
    } else {
      addUnselected();
    }
    return finalResult;
  }

  return function(input) {
    if (
      !options ||
      !options.fn ||
      typeof options.fn !== "function" ||
      !options.regexes ||
      !Array.isArray(options.regexes) ||
      !options.regexes.length ||
      !input
    )
      return input;

    options.regexes.forEach(regexFilter =>
      processInputWithRegex(regexFilter, input)
    );
    return collateOutput(options, outputs, input);
  };
}

export default processString;
