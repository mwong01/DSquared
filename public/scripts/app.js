// Poll function for dynamic poll form


// AJAX REQUESTS
$(document).ready(function () {
  let number = 3;
  $("#first-button").click(() => {
    event.preventDefault();
    let $choices = $('<article  id="choice-container">').addClass('list');
    let markup = `<div class="new">
      <input type="text" name="choiceSub[${number}]" class="form-control" rows="1" placeholder="Enter new option" style="background: none">
      <button id="delete-button" onclick="removeButton(this)" type="button" class="btn btn-danger">Remove</button><div>`;
    $('#option-creator').append($choices.append(markup));
    number++;

  });

  function removeButton(button) {
    $(button).parent().remove();
  }

  //////////////////////////////
  // Prevent malicious code
  //////////////////////////////

  const escape =  function(str) {  // the code provided by the lesson to prevent malicious code
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
});

$(document).ready(function () {
  $("#down-button").click(function() {
    $("#click-for-new-poll").slideToggle("slow");
  });
})
