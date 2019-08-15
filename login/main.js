
let firebaseConfig = {
    apiKey: "AIzaSyA5CGc3VatiZhziik8pIUYzwwkbCtt8yOA",
    authDomain: "cargo-dd4bd.firebaseapp.com",
    databaseURL: "https://cargo-dd4bd.firebaseio.com",
    projectId: "cargo-dd4bd",
    storageBucket: "",
    messagingSenderId: "781013156839",
    appId: "1:781013156839:web:3dbfd051ff06043a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // get eleemememnts
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");

  // Add logiin event
  btnLogin.addEventListener('click', e =>{
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in 
    const promise = auth.signInWithEmailAndPassword(email, pass); 
    promise.catch(e => console.log(e.message));
  });

  //Add signup event
  btnSignUp.addEventListener('click', e =>{
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in 
    const promise = auth.createUserWithEmailAndPassword(email, pass); 
    promise.catch(e => console.log(e.message));
  });

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
    } else {
        console.log('not logged in');
    }
  });

