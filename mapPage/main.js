mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fub3NkdSIsImEiOiJjano4ZnA4MWExNjczM25xYWQyb2I2YTF2In0.oBSs-da75zbYt8zYqDi5Wg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-73.935242, 40.730610],
zoom: 13
});
map.addControl(new MapboxGeocoder({
accessToken: mapboxgl.accessToken ,
mapboxgl: mapboxgl
}));
// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
   positionOptions: {
   enableHighAccuracy: true
},
   trackUserLocation: true
}));
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
let size = 200;
 
const dataBase = firebase.firestore();

dataBase.collection("cargoPost").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data().Location);
        let pointLoc = [(doc.data().Location.longitude), (doc.data().Location.latitude)];
        let popup = new mapboxgl.Popup({ offset: 25 })
            .setText(doc.data().Title + ' ' + doc.data().Address);
        let el = document.createElement('div');
        el.className = 'marker';

        // create the marker
    new mapboxgl.Marker(el)
        .setLngLat(pointLoc)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    });
});