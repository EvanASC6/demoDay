const address = document.getElementById('address');
autocomplete = new google.maps.places.Autocomplete(address);

const dataBase = firebase.firestore();
const upload = document.getElementById('peppaPiggy');
upload.addEventListener('click',function(e){
    e.preventDefault();
    console.log(address.value)
    let inputAddress = address.value.replace(/ /g, "+");

    const geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${inputAddress}&key=AIzaSyCrxKpxXMU4ZyZizXXFZNN5X4fR1QFzSPg`
    console.log(geoCodeUrl)
    fetch(geoCodeUrl)
    .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        console.log(myJson.results[0].geometry.location);
        let coordinates = myJson.results[0].geometry.location;

        let post ={
            Title: document.getElementById("title").value,
            // Content: document.getElementById("Post").value,
            Location: new firebase.firestore.GeoPoint(coordinates.lat, coordinates.lng),
            Address: address.value
        }
        let docID = inputAddress + "-" + post.Title;


        dataBase.collection("cargoPost").doc(docID).set(post)
        .then(function() {
            console.log("Document successfully written!");
            window.location.href = "../mapPage/index.html";
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        })
      });
      
})
