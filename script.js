function checkTimeRestriction() {
  const now = new Date();
  const hour = now.getHours();

  const dashboard = document.getElementById("dashboard");
  const closed = document.getElementById("closed");

  // Allowed Time: 3 PM (15) to 5 PM (17)
  if (hour >= 15 && hour < 17) {
    dashboard.style.display = "block";
    closed.style.display = "none";
    renderChart();
  } else {
    dashboard.style.display = "none";
    closed.style.display = "block";
  }
}

function renderChart() {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Visitors",
          data: [120, 190, 75, 220, 150, 180],
          backgroundColor: "rgba(255, 204, 0, 0.7)",
          borderColor: "#ffcc00",
          borderWidth: 2,
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#f5f5f5",
            font: {
              size: 14,
              weight: "bold"
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#f5f5f5",
            font: { size: 12 }
          },
          grid: { color: "rgba(255,255,255,0.1)" }
        },
        y: {
          ticks: {
            color: "#f5f5f5",
            font: { size: 12 }
          },
          grid: { color: "rgba(255,255,255,0.1)" }
        }
      }
    }
  });
}

// Check restriction when page loads
checkTimeRestriction();
