const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateChallengeInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.highlightJSON = !isEmpty(data.highlightJSON) ? data.highlightJSON : "";

  let challengeText;
  let highlightExists = false;
  if (data.highlightJSON.length > 0) {
    // Get challenge text out of the highlightJSON
    const highlightArray = JSON.parse(data.highlightJSON);
    if (highlightArray && Array.isArray(highlightArray)) {
      const challengeTextArray = highlightArray.map(text => {
        const isHighlight = Array.isArray(text);
        if (isHighlight) {
          highlightExists = true;
          return text[0];
        }
        return text;
      });
      challengeText = challengeTextArray.join("");
    } else {
      challengeText = "";
    }
  } else {
    challengeText = "";
  }

  if (!highlightExists) {
    errors.highlights = "Some text must be highlighted";
  }

  if (!validator.isLength(data.title, { min: 2, max: 50 })) {
    errors.title = "Title must be between 2 and 50 characters";
  }
  if (!validator.isLength(data.description, { min: 0, max: 300 })) {
    errors.description = "Description must be fewer than 300 characters";
  }
  if (!validator.isLength(challengeText, { min: 0, max: 1000 })) {
    errors.challenge = "Challenge text must be fewer than 1000 characters";
  }

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (validator.isEmpty(challengeText)) {
    errors.challenge = "Challenge text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
