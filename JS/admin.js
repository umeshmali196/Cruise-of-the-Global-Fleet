window.addEventListener('load', function () {
  loadAdminData();
  
  // Refresh button functionality
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', loadAdminData);
  }
  
  // Auto-refresh every 5 seconds
  setInterval(loadAdminData, 5000);
});

function loadAdminData() {
  let allBookings = JSON.parse(localStorage.getItem("adminBookings")) || [];

  // ===== OVERVIEW STATS =====
  document.getElementById("totalBookings").innerText = allBookings.length;

  let confirmed = allBookings.filter(b => b.status === "Confirmed");
  document.getElementById("confirmedBookings").innerText = confirmed.length;

  let today = new Date().toLocaleDateString();
  let todayCount = allBookings.filter(b => 
    new Date(b.dateTime).toLocaleDateString() === today
  ).length;
  document.getElementById("todayBookings").innerText = todayCount;

  // Calculate total revenue
  let totalRevenue = allBookings.reduce((sum, b) => {
    let amount = parseFloat(b.amount.toString().replace(/[^\d.-]/g, "")) || 0;
    return sum + amount;
  }, 0);
  
  if (document.getElementById("totalRevenue")) {
    document.getElementById("totalRevenue").innerText = "$" + totalRevenue.toFixed(2);
  }

  // ===== RECENT BOOKINGS (Last 5) =====
  loadRecentBookings(allBookings);

  // ===== MANAGE BOOKINGS TABLE =====
  loadBookingsTable(allBookings);

  // ===== CHARTS =====
  loadChart(allBookings);
  loadStatusChart(allBookings);
}

function loadRecentBookings(bookings) {
  const table = document.getElementById("recentBookingsTable");
  if (!table) return;

  table.innerHTML = "";

  // Get last 5 bookings in reverse order (newest first)
  let recent = bookings.slice(-5).reverse();

  if (recent.length === 0) {
    table.innerHTML = "<tr><td colspan='5' style='padding: 20px; text-align: center; color: #6b7280;'>No bookings yet</td></tr>";
    return;
  }

  recent.forEach((b) => {
    let row = `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px;">${b.id || "N/A"}</td>
        <td style="padding: 12px;">${b.name}</td>
        <td style="padding: 12px;">${b.cruise}</td>
        <td style="padding: 12px;">${b.dateTime}</td>
        <td style="padding: 12px;"><span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-weight: 600;">${b.status}</span></td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

function loadBookingsTable(bookings) {
  const table = document.getElementById("bookingTable");
  if (!table) return;

  table.innerHTML = "";

  if (bookings.length === 0) {
    table.innerHTML = "<tr><td colspan='9' style='padding: 20px; text-align: center; color: #6b7280;'>No bookings found</td></tr>";
    return;
  }

  bookings.forEach((b) => {
    let row = `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px;">${b.id || "N/A"}</td>
        <td style="padding: 12px;">${b.name}</td>
        <td style="padding: 12px;">${b.email || "N/A"}</td>
        <td style="padding: 12px;">${b.cruise}</td>
        <td style="padding: 12px;">${b.passengers || "N/A"}</td>
        <td style="padding: 12px;">${b.amount}</td>
        <td style="padding: 12px;">${b.travelDate || "N/A"}</td>
        <td style="padding: 12px;">${b.dateTime}</td>
        <td style="padding: 12px;"><span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 12px;">${b.status}</span></td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

function loadChart(bookings) {
  if (!document.getElementById("bookingChart")) return;

  let dateMap = {};

  // Group bookings by date
  bookings.forEach(b => {
    let date = b.dateTime.split(",")[0];
    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  let labels = Object.keys(dateMap).sort();
  let data = labels.map(label => dateMap[label]);

  const ctx = document.getElementById("bookingChart");
  
  // Destroy existing chart if it exists
  if (window.bookingChartInstance) {
    window.bookingChartInstance.destroy();
  }

  window.bookingChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Bookings Per Day",
        data: data,
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderColor: "#2563eb",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          labels: { 
            font: { size: 14, weight: '600' }, 
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: "#1f2937",
          padding: 12,
          titleFont: { size: 14 },
          bodyFont: { size: 13 },
          borderColor: "#2563eb",
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 1,
          grid: { color: "#e5e7eb", drawBorder: false },
          ticks: { font: { size: 12 } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 12 } }
        }
      }
    }
  });
}

function loadStatusChart(bookings) {
  if (!document.getElementById("statusChart")) return;

  let statusMap = {};

  // Count bookings by status
  bookings.forEach(b => {
    statusMap[b.status] = (statusMap[b.status] || 0) + 1;
  });

  let labels = Object.keys(statusMap);
  let data = labels.map(label => statusMap[label]);

  const ctx = document.getElementById("statusChart");
  
  // Destroy existing chart if it exists
  if (window.statusChartInstance) {
    window.statusChartInstance.destroy();
  }

  // Define colors for different statuses
  const statusColors = {
    "Confirmed": "#16a34a",
    "Pending": "#f59e0b",
    "Cancelled": "#ef4444",
    "Completed": "#6366f1"
  };

  let colors = labels.map(label => statusColors[label] || "#9ca3af");

  window.statusChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        label: "Bookings by Status",
        data: data,
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: { 
            font: { size: 12, weight: '600' }, 
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: "#1f2937",
          padding: 12,
          titleFont: { size: 14 },
          bodyFont: { size: 13 },
          callbacks: {
            label: function(context) {
              return context.label + ": " + context.parsed + " bookings";
            }
          }
        }
      }
    }
  });
}