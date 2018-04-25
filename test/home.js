var num = 0;
var ridesByID = {};

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
   var i = 0;
   
   database.orderByChild("searchee").equalTo(searcher).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        console.log("Ride found: leaving" + data.val().departure + " going to " + data.val().destination + " at " + data.val().time);
        //var id = "ride_no_" + i;                          // sets id to ride_no_#
        var list = document.getElementById("match-list"); // list of corresponding rides
        var entry = document.createElement("option");     // creates element for that option
        //entry.setAttribute("id", id);                     // id corresponds with entry now
        ridesByID[i] = data.key;                         //maps ride key to ridesByID array
        i++;
        entry.appendChild(document.createTextNode("time: " + data.val().time)); // puts text in entry
        list.appendChild(entry);                          // adds entry to list
      });
   }); 
}

function hiding() {
 document.getElementById("find-form").style.display="none";
 document.getElementById("match-form").style.display="block";
}

function sign() {
  //sign up user for specified ride
  var selected = document.getElementById("match-list");
  //grabs ride key from selected item
  var ind = selected.selectedIndex;
  console.log(ridesByID[ind]);  
  //add user to array of passengers for that respective ride
  //var user = firebase.auth().currentUser;
  //var userName = user.name;
  var myDB = firebase.database().ref();
  var passengers = myDB.child("rides/"+ridesByID[ind]+"/passengers");
  //console.log("rides/"+ridesByID[ind]+"/passengers");
  passengers.update({
    "Mary" : true
  });
  console.log(passengers);
}