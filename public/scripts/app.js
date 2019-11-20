// Poll function for dynamic poll form


// AJAX REQUESTS
$(document).ready(function () {
  let number = 3;
  $("#first-button").click(() => {
    event.preventDefault();
    let $choices = $('<article  id="choice-container">').addClass('list');
    let markup = `<div>
      <input type="form" name="choiceSub[${number}]" class="form-control" rows="1" style="width: 200px;" placeholder="Choose an option!">
      <button id="delete-button" onclick="removeButton(this)" type="button" class="btn btn-danger">Delete</button>
      </div>
    `;
    $('#option-creator').append($choices.append(markup));
    number++;

  });

  function removeButton(button) {
    $(button).parent().remove();
  }

});

// Copy link to clipboard
function myFunction() {
  var copyText = document.getElementById("linksAdmin");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}
