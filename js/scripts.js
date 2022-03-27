// Business Logic
function errorCheck(message) {
  if (!message) {
    return "error: no input";
  }
}

function cleanString(message) {
  message = message.toLowerCase();
  message = message.replace(/[^a-z0-9]+/g, "");
  return message;
}

function encodeString(message) {
  message = cleanString(message);
  let error = errorCheck(message);
  if (error) {
    return error;
  } else {
    let square = [];
    let squareSides = Math.ceil(Math.sqrt(message.length));
    for (let i = 0; i < squareSides; i++) {
      square.push([]);
    }
    let messageArray = message.split("");
    let index = 0;
    messageArray.forEach(function(message) {
      square[index].push(message);
      index++;
      if (index === squareSides) {
        index = 0;
      }
    });
    let results = ""
    square.forEach(function(column) {
      results +=  column.join("");
    });
    let splitResults = "";
    for (let i = 0; i < results.length; i += 5) {
      splitResults += results.slice(i, i + 5) + " ";
    }
    return splitResults;
  }
}


// User Interface Logic
$(document).ready(function() {
  $("#message").submit(function(event) {
    event.preventDefault();
    $(".alert").hide();
    let message = $("input#message-input").val();
    let encryptedMessage = encodeString(message);
    if (encryptedMessage === "error: no input") {
      $(".alert").show();
    } else {
      $("#result").text(encodeString(message));
    }
  });
});
