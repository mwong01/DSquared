

// // Poll function for dynamic poll form
// const createLiChoices = function(number){
//   let $choices = $('<article  id="choice-container">').addClass('list');
//   let markup = ``;
//   for (let i = 1; i <= number; i++) {
//     let singleChoice = `
//       <textarea  name="choiceSub" class="form-control" id="${i}" rows="1" style="width: 200px;" placeholder="Choose an option!"></textarea>
//     `;
//     markup += singleChoice;
//   }
//   return $choices.append(markup);
// };

// // AJAX REQUESTS
// $(document).ready(function(){
//   $("#first-button").click( () => {
//     $("#hide-button").slideToggle();

//     event.preventDefault();
//     const choice = $("#options").serialize();
//     const number = choice.slice(choice.length-1, choice.length);
//     const numInt = parseInt(number);

//     $('#option-creator').append(createLiChoices(numInt));
//     setTimeout(function(){ 
//       $("#box-two").slideToggle();
//     }, 1000);
//   });
// });