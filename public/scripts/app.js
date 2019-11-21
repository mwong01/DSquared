// Poll function for dynamic poll form


// AJAX REQUESTS
$(document).ready(function () {
  let number = 3;
  $("#first-button").click(() => {
    event.preventDefault();
    let $choices = $('<article  id="choice-container">').addClass('list');
    let markup = `<div>
<<<<<<< HEAD
      <input type="form" name="choiceSub[${number}]" class="form-control" rows="1" placeholder="Enter new option">
      <button id="delete-button" onclick="removeButton(this)" type="button" class="btn btn-danger">Remove</button>
=======
>>>>>>> 0988ceb0f35d2c35eca3db0f72840068cba8357a
      <input type="text" name="choiceSub[${number}]" class="form-control" rows="1" style="width: 200px;" placeholder="Choose an option!" required="required">
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

$(document).ready(function () {
  $("#down-button").click(function() {
    $("#click-for-new-poll").slideToggle("slow");
  });
})
