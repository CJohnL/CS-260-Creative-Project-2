function onClick(e) {
  e.preventDefault();
  let word = document.getElementById('word').value;

  fetch("https://lingua-robot.p.rapidapi.com/language/v1/entries/en/" + word, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "lingua-robot.p.rapidapi.com",
		"x-rapidapi-key": "de0c139f07msh9e8a341ab6d41c0p1ef50bjsnbf4eaa4abd56"
	}
})
    .then(function(response) {
      if (response.status != 200) {
        return {
          text: "Error retrieving definitions: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      console.log(json);
      let s = "";
      for (i = 0; i < json.entries[0].lexemes.length; i++){
        for (j = 0; j < json.entries[0].lexemes[i].senses.length; j++){
          s += "<li>(" + json.entries[0].lexemes[i].partOfSpeech + ") ";
          s += json.entries[0].lexemes[i].senses[j].definition + "</li>";
        }
      }
      updateResult(s);
    })
    .catch(function(error){
      s = "No definitions found for \"" + word + "\"";
      updateResult(s);
    });
}

function updateResult(info) {
  document.getElementById('result').innerHTML = info;
}

document.getElementById('searchButton').addEventListener('click', onClick);
