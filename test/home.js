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
      //"driver": user.uid,
       "departure": departure,
       "destination": destination,
       "date": date,
       "time": time,
       "numberSeats": noSeats,
       "searchee": departure+destination+date
     });  

     window.alert("Success!");
}

function signUpRide() {
    var dep = document.getElementById("from").value;
    var dest = document.getElementById('to').value;
    var da = document.getElementById("datePass").value;
    
   //find entries with matching departure, destination, and date
   var searcher = dep+dest+da;
   var database = firebase.database().ref("rides/");
   database.orderByChild("searchee").equalTo(searcher).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        console.log("Ride found: leaving" + data.val().departure + " going to " + data.val().destination + " at " + data.val().time);
        var list = document.getElementById("match-list")
        var entry = document.createElement("option");
        entry.appendChild(document.createTextNode("time: " + data.val().time));
        list.appendChild(entry);
      });
   }); 
}

function hiding() {
 document.getElementById("find-form").style.display="none";
 document.getElementById("match-form").style.display="block";
}

function sign() {
  //sign up user for specified ride
  var selected = document.getElementById("match-list").value;
  console.log(selected);
  //find a way to obtain ride id based off match list 
}