
    // Function to fetch animal data
    function fetchAnimals() {
      fetch(" http://localhost:3000/characters")
        .then(response => response.json())
        .then(data => renderCharacters(data))
        .catch(error => {
          console.error('Error:', error);
        });
      }

          // Loop through each animal and create list items
          function renderCharacters(characters){
            const characterName = document.querySelector('.character-name');    
            characterName.innerHTML='';     

            characters.forEach(character => {
            const list = document.createElement('li');
            list.className = 'animal-list-item';
            list.textContent = character.name;
            characterName.appendChild(list);

            // Add event listener to display animal details when clicked
            list.addEventListener('click', () => displayCharacterDetails(character));
          
          });
        }

    // Function to display animal details
    function displayCharacterDetails(character) {
      const characterDetails = document.querySelector('.character-details');
      characterDetails.innerHTML = '';

      const characterName = document.createElement('h3');
      characterName.textContent = character.name;

      const characterImage = document.createElement('img');
      characterImage.src = character.image;

      const voteCount=document.createElement('h4');
      voteCount.innerHTML=`Total votes: <span id="vote-count">${character.votes}</span`

      const formInput=document.createElement('form');
      formInput.innerHTML=
    ` <input type="text" placeholder="Enter your vote" id="votes" name="votes" />
      <button type="submit">Vote </button>`;

    formInput.addEventListener('submit', (e) => {
      e.preventDefault();
      const votesInput = formInput.querySelector('#votes');
      const votes = parseInt(votesInput.value, 10);
      character.votes += votes;
      voteCount.innerHTML = `Total votes: <span id="vote-count">${character.votes}</span>`;
      votesInput.value = '';
         
    })

    const resetButton=document.createElement('button')
    resetButton.innerHTML="Reset";
    resetButton.addEventListener('click', () => {
      character.votes = 0;
      voteCount.innerHTML = `Total votes: <span id="vote-count">${character.votes}</span`;

    })


  
     


      // const voteButton = document.createElement('button');
      // voteButton.textContent = 'Vote';
      // voteButton.addEventListener('click', () => {
      //   animal.votes++;
      //   animalVotes.textContent = ` Total Votes: ${animal.votes}`;
      // });

      // const animalVotes = document.createElement('p');
      // animalVotes.textContent = ` Total Votes: ${animal.votes}`;



      characterDetails.appendChild(characterName);
      characterDetails.appendChild(characterImage);
      characterDetails.appendChild(voteCount);
      characterDetails.appendChild(formInput);
      characterDetails.appendChild(resetButton);
      // characterDetails.appendChild(voteButton);
      // characterDetails.appendChild(animalVotes);
    }

    // Fetch animals on page load
 
document.addEventListener("DOMContentLoaded" ,()=>{
  fetchAnimals();

});

// document.addEventListener("DOMContentLoaded", () => {
//   fetchAnimals();
// });

// function fetchAnimals() {
//   fetch("http://localhost:3000/characters")
//     .then((resp) => resp.json())
//     .then(characterBar);
// }

// function characterBar(characters) {
//   characters.forEach(barDetails);
// }

// let currentAnimal; //clicked animal
// function barDetails(character) {
//   const bar = document.querySelector("#character-bar");
//   const barSpan = document.createElement("span");
//   barSpan.innerHTML = character.name;
//   bar.appendChild(barSpan);
//   barSpan.style.cursor = "pointer";
//   barSpan.addEventListener("click", () => {
//     currentAnimal = character;
//     showAnimal(character);
//   });
// }
// function showAnimal(character) {
//   const characterName = document.querySelector("p#name");
//   characterName.innerHTML = character.name;
//   const characterImg = document.querySelector("img#image");
//   characterImg.src = character.image;
//   const characterVotes = document.querySelector("span#vote-count");
//   characterVotes.innerHTML = character.votes;
// }

// //working on adding votes
// const inputVotes = document.querySelector("input#votes");
// const animalVotes = document.querySelector("span#vote-count");
// const form = document.querySelector("form#votes-form");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log(currentAnimal);
//   currentAnimal.votes += parseInt(e.target.votes.value, 10);
//   showAnimal(currentAnimal);
//   form.reset();
// });

// // working on the reset button
// const resetVotes = document.querySelector("button#reset-btn");
// resetVotes.style.cursor = "pointer";
// resetVotes.addEventListener("click", () => {
//   currentAnimal.votes = 0;
//   showAnimal(currentAnimal);
//   form.reset();
// });


fetch(`https://api.github.com/search/users?q=${userName}`,{
      headers:{
         "Accept": "application/vnd.github.v3+json "
      }
    })
    .then(res=>res.json())
    .then(data => {
      userList.innerHTML = ''; //clear previous data of the user

    if(data.items && data.items.length > 0){
      data.items.forEach(user => {

        let h5=document.createElement('h5')  
        h5.textContent=user.login;
  
        let img=document.createElement('img')  
        img.src=user.avatar_url
  
        let link=document.createElement('a')
        link.href= user.html_url;
        link.textContent = 'View Profile';
    

      //Add event listener to display repos for the selected user
      h5.addEventListener('click',()=> {

        //make a fetch request with the returned value
        //display the returned results on the DOM
        fetch(`https://api.github.com/users/${user.login}/repos`,{
        headers: {
          "Accept":" application/vnd.github.v3+json" 
       }
     })
        .then(res=>res.json())
        .then(repos => {
           repoList.innerHTML = '';//clear previous repositories 
            repos.forEach(repo =>{
                let repository=document.createElement('li');
                repository.innerText=`${repo.name}`
                repoList.appendChild(repository);
            });     
        })
        .catch(error => {
            console.error('Error:',error);
            repoList.innerHTML = 'Error occurred while fetching repositories.';
        });
      }); 
    
      userList.appendChild(h5);
      userList.appendChild(img);
      userList.appendChild(link);
    });
}
    else{
        userList.innerHTML = 'No users found';
    }
})
.catch(error => {
    console.error('Error:', error);
    userList.innerHTML = 'Error occurred wile fetching users.';
  });
});





