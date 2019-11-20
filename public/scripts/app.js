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

    $("#vote").click((event) => {
      let idsInOrder = $("#sortable").sortable("toArray");
      let voteObj = {};
      voteObj['votes'] = idsInOrder;
      $.ajax({
        type: "POST",
        url: '/voted',
        data: voteObj,
        success: function(data){

        }
      });
    });

  });

  function removeButton(button) {
    $(button).parent().remove();
  }

});


