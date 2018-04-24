function loginUser() {
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("pwd").value;
  
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage);
  });
}

function changePage() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.location.href = ("home.html");
    } else {
      // No user is signed in.
    }
   });
 }

function createUser() {
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("pwd").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage);
  });
  window.alert("Account created for " + userEmail);
}

function signOutUser() {

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href="login.html";
  }).catch(function(error) {
    // An error happened.
    window.alert("Error: " + error.message);
  });

}


function submit() {
  var depart = document.getElementById("dep").value;
  var destin = document.getElementById("dest").value;
  var date = document.getElementById("day").value;

  var myDB = firebase.database().ref();
  var rides = myDB.child("rides");

  rides.push({
    "departure" : depart,
    "destination" : destin,
    "date" : date
  });

 // window.alert("Success! Created from " + depart + " to " + destin + " on " + date + " .");  

}

function search() {
  var departure = document.getElementById("dep").value;
  var destin = document.getElementById("dest").value;
  var date = document.getElementById("day").value;

  var results = [];
  var myDB = firebase.database().ref();
  var rides = myDB.child("rides");
  rides.orderByChild("departure").equalTo("Chicago").on("value", function(snapshot){
        snapshot.forEach(childSnapshot => {
          console.log(childSnapshot.key);
          results.push(childSnapshot.key);
        });
  });
  console.log(results);
}