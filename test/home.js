var num = 0;

function submitRide() {
    var dep = document.getElementById("departure").value;
    var dest = document.getElementById("destination").value;
    var da = document.getElementById("date").value;
    var ti = document.getElementById("time").value;
    var noSeats = document.getElementById("noSeats").value;

    var user = firebase.auth().currentUser;

    function writeUserData(num, dep, dest, da, ti, noSeats) {
        firebase.database().ref('rides/ride' + num).set({
          driver: user.uid,
          departure: dep,
          destination: dest,
          date: da,
          time: ti,
          numberSeats: noSeats
        });
      } 

    num++;

    window.alert("Success! Ride created leaving on " + da + " at " + ti + " from " + dep + " to " + dest + " for " + noSeats + " passengers.")  

}

function signUpRide() {
    var dep = document.getElementById("from").value;
    var dest = document.getElementById('to').value;
    var da = document.getElementById("datePass").value;
    var ti = document.getElementById("timePass").value;
   //unfinished 
}