// Time check (3PM – 5PM IST)
function isAllowedTime() {
  const now = new Date();
  let istHour = now.getUTCHours() + 5;
  let istMinute = now.getUTCMinutes() + 30;
  if (istMinute >= 60) {
    istHour += 1;
    istMinute -= 60;
  }
  if (istHour >= 24) istHour -= 24;
  return istHour >= 15 && istHour < 17; // 3PM to 5PM
}

// If not allowed time → show message
if (!isAllowedTime()) {
  document.getElementById("message").innerText =
    "⚠ Chart available only between 3PM - 5PM IST";
} else {
  // Parse CSV
  Papa.parse("job_descriptions.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;

      // Apply filters
      const filtered = data.filter(job =>
        job["Work Type"] &&
        job["Work Type"].trim() === "Intern" &&
        parseFloat(job.latitude) < 10 &&
        job.Country && !/^[ABCD]/i.test(job.Country.trim()) &&
        job["Job Title"] && job["Job Title"].trim().length <= 10 &&
        job["Company Size"] && parseInt(job["Company Size"]) < 50000
      );

      // Group by Preference
      const counts = {};
      filtered.forEach(job => {
        const pref = job.Preference ? job.Preference.trim() : "Unknown";
        counts[pref] = (counts[pref] || 0) + 1;
      });

      const labels = Object.keys(counts);
      const values = Object.values(counts);

      // If no data after filter
      if (labels.length === 0) {
        document.getElementById("message").innerText =
          "⚠ No matching data after filters";
        return;
      }

      // Draw Chart
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Intern Count",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.7)"
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  });
}

