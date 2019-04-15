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

    if (typeof input === "string") {
      let regex = option.regex;
      let result = null;
      let output = [];

      /*
      Beginning of modifaction of original efog code
      */
      if ((result = input.match(regex)) !== null) {
        if (result.join("") === "") {
          return input;
        } else {
          let strRemains = input;
          result.forEach((match, i) => {
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
      /* End of modified section */

      return output;
    } else if (Array.isArray(input)) {
      return input.map(chunk => processInputWithRegex(option, chunk));
    } else return input;
  }

  return function(input) {
    if (!options || !Array.isArray(options) || !options.length || !input)
      // Modified
      return input;

    options.forEach(option => (input = processInputWithRegex(option, input)));

    return input;
  };
}

module.exports = processString;
