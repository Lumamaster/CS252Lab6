var num = 0;
var ridesByID = {};

function signOutUser() {

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    //window.location.href="index.html";
  }).catch(function(error) {
    // An error happened.
    window.alert("Error: " + error.message);
  });

}
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
      "driver": user.email,
       "departure": departure,
       "destination": destination,
       "date": date,
       "time": time,
       "numberSeats": noSeats,
       "searchee": departure+destination+date
     });  

     window.alert("Success! This ride has been created.");
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
    var list = document.getElementById("match-list"); // list of corresponding rides
    list.innerHTML = "";
    snapshot.forEach(function(data) {
       //var id = "ride_no_" + i;                          // sets id to ride_no_#
        if (data.val().numberSeats > 0) {
          console.log("Ride found: leaving" + data.val().departure + " going to " + data.val().destination + " at " + data.val().time);
          var entry = document.createElement("option");     // creates element for that option
            //entry.setAttribute("id", id);                     // id corresponds with entry now
            ridesByID[i] = data.key;                         //maps ride key to ridesByID array
            i++;
            entry.appendChild(document.createTextNode("time: " + data.val().time)); // puts text in entry
            list.appendChild(entry);                          // adds entry to list
        }
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
  //console.log(ridesByID[ind]);  
  //add user to array of passengers for that respective ride
  var user = firebase.auth().currentUser;
  var userID = user.uid;
  console.log(userID);
  var myDB = firebase.database().ref();
  var passengers = myDB.child("rides/"+ridesByID[ind]+"/passengers");
  //var noSeats = myDB.child("rides/"+ridesByID[ind]+"/numberSeats").val();
  //noSeats = noSeats-1;
  var dec;
  var ref = myDB.child("rides/"+ridesByID[ind]);
  ref.once("value", function(data){
    var num = data.val().numberSeats;
    console.log("old noSeats: "+num);
    dec = num-1;
    //myDB.child("rides/"+ridesByID[ind]+"/numberSeats").update(dec);
    //data.val().numberSeats = dec;
    ref.update({numberSeats: dec});
  });
  passengers.update({
    [userID] : true
  });
  console.log("added to passenger list");

  var storage = document.createElement("div");
  storage.className = "col-md-4";
  var card = document.createElement("div");
  card.className = "card mb-4 box-shadow";
  var cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.innerHTML = "Ride";
  card.appendChild(cardHeader);
  var cardBody = document.createElement("div");
  cardBody.className = "card-body";

  var ref2 = myDB.child("rides/"+ridesByID[ind]);
  ref.once("value", function(data){
    cardBody.innerHTML = "Driver: " + data.val().driver+"<br>" + 
                          "Starting from: " + data.val().departure+"<br>" + 
                          "Going to: " + data.val().destination+"<br>";
  });

  card.appendChild(cardBody);
  //add card to user homepage
  var cont = document.getElementById("card-container");
  cont.appendChild(card);

  window.alert("Sucess! You have been added to this ride.");
}