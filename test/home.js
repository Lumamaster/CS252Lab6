var num = 0;

function submitRide() {
    var departure = document.getElementById("departure").value;
    var destination = document.getElementById("destination").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var noSeats = document.getElementById("noSeats").value;

    var user = firebase.auth().currentUser;
    var myDB = firebase.database().ref();
    var rides = myDB.child("rides");
    rides.push({
      "driver": user.uid,
       "departure": departure,
       "destination": destination,
       "date": date,
       "time": time,
       "numberSeats": noSeats
     });
       
     window.alert("Ride created leaving from " + departure + " going to " + destination + " on " + date + " at " + time + " for " + noSeats + " passengers.");

}

function signUpRide() {
    var dep = document.getElementById("from").value;
    var dest = document.getElementById('to').value;
    var da = document.getElementById("datePass").value;
    
   //find entries with matching departure, destination, and date

  var database = firebase.database().ref("rides/");
   database.orderByChild("departure").equalTo(dep).on("child_added", function(data) {
      window.alert("Equal to: " + data.val().departure);
   }); 
}