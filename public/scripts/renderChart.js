$(document).ready(function () {
// Bar chart
new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: result['optionsList'],
    datasets: [
      {
        label: "",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: result['sumOfEachChoice'] //query for the sum of the ranks
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: result['title']
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    }

  }
  });
});