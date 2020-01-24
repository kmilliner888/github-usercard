/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cardPromise = axios.get("https://api.github.com/users/kmilliner888");


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const githubCard = (cardObj) => {
  const newCard = document.createElement('div');
  const cardImage = document.createElement('img');
  const cardInfo = document.createElement('div');
  const cardName = document.createElement('h3');
  const cardUserName = document.createElement('p');
  const cardLocation = document.createElement('p');
  const cardProfile = document.createElement('p');
  const cardProfileLink = document.createElement('a');
  const cardFollowers = document.createElement('p');
  const cardFollowing = document.createElement('p');
  const cardBio = document.createElement('p');

  newCard.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUserName.classList.add('username');

  cardImage.src = cardObj.avatar_url;
  cardName.textContent = cardObj.name;
  cardUserName.textContent = cardObj.login;
  cardLocation.textContent = `Location:   ${cardObj.location}`;
  cardProfile.textContent = 'Profile:  ';
  cardProfileLink.href = cardObj.html_url;
  cardProfileLink.textContent = 'visit my Github page';
  cardFollowers.textContent = `Followers:  ${cardObj.followers}`;
  cardFollowing.textContent = `Following:  ${cardObj.following}`;
  cardBio.textContent = `Bio:  ${cardObj.bio}`;

  cardProfile.append(cardProfileLink);
  cardInfo.append(cardName, cardUserName, cardLocation, cardProfile, cardFollowers, cardFollowing, cardBio);
  newCard.append(cardImage, cardInfo);


  return newCard;
}


const card = document.querySelector('.cards');

cardPromise
.then(response => {
  console.log(response)
  let newCard = githubCard(response.data)
  card.append(newCard)
})
.catch(error => {
  console.log('error!',error)
})




/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

followersArray.forEach(follower => {
  axios.get(`https://api.github.com/users/${follower}`)
  .then(response => {
    const newFollowerCard = githubCard(response.data)
    card.append(newFollowerCard)
  })
  .catch(error => {
    console.log('error!',error)
  })
})
