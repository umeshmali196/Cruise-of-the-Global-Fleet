document.getElementById("confirmBookingBtn").addEventListener("click", function () {

  let data = {
    name: document.getElementById("fullname").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    passport: document.getElementById("passport").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    idProof: document.getElementById("idProofType").value,
    cabin: document.getElementById("cabinType").value,
    travelDate: document.getElementById("travelDate").value,
    passengers: document.getElementById("totalPassengers").value,
    special: document.getElementById("specialRequests").value
  };

  // ✅ Validation
  if (!data.name || !data.phone || !data.email || !data.cabin || !data.travelDate) {
    alert("❌ Please fill all required details!");
    return;
  }

  // ✅ Success Alert
  alert("✅ Booking Confirmed Successfully!");

  // ✅ Receipt Content
  let receipt = `
-------- CRUISE BOOKING RECEIPT --------

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Gender: ${data.gender}

ID Proof: ${data.idProof}
Passport No: ${data.passport}

Cabin Type: ${data.cabin}
Travel Date: ${data.travelDate}
Total Passengers: ${data.passengers}

Special Request:
${data.special}

---------------------------------------
Thank you for booking with us!
`;

  // ✅ Receipt Download
  let blob = new Blob([receipt], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "booking-receipt.txt";
  link.click();

});