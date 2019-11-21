$(document).ready(function () {
  console.log(result);
// Bar chart
new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ["Options", "Options", "Options", "Options", "Options"],
    datasets: [
      {
        label: "Title of the poll",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433] //query for the sum of the ranks
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Title of the poll'
    }
  }
  });
});