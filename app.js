let word = document.getElementById("word");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let res = "";
let box = document.querySelector(".box");
let req = new XMLHttpRequest();
const search = () => {
  req.open("GET", `${url}${word.value}`);
  req.setRequestHeader("Content-type", "application/json");
  req.send();

  req.onprogress = () => {
    box.innerHTML = `Bunday So'z Mavjud Emas...`
    setTimeout(() => {
        word.value = ''
    }, 2000);
  };

  req.onload = () => {
    if (req.status == 200) {
      res = JSON.parse(req.response)[0];

      let phoneticsDIV = "";

      res.phonetics.forEach((phone) => {
        if (phone.audio) {
          phoneticsDIV += `
                <audio controls>
                    <source type="audio/mpeg" src="${phone.audio}" />
                </audio>
            `;
        }
      });

      let meaningsDivDefVerb = "";
      let meaningsDivNoun = "";
      let meaningsDivVerb = "";
      let meaningsDivDefNoun = "";
      let meaningsSynVerb = "";
      let meaningsSynNoun = "";
      let meaningsAntVerb = "";
      let meaningsAntNoun = "";

      meaningsDivNoun += `<b>${res.meanings[0].partOfSpeech}</b>`;
      res.meanings[0].definitions.forEach((def) => {
        meaningsDivDefNoun += `<li>${def.definition}</li>`;
      });
      res.meanings[0].synonyms.forEach((def) => {
        meaningsSynNoun += `<li onclick="newSearch('${def}')">${def}</li>`;
      });
      res.meanings[0].antonyms.forEach((def) => {
        meaningsAntNoun += `<li onclick="newSearch('${def}')">${def}</li>`;
      });

      meaningsDivVerb += `<b>${res.meanings[1].partOfSpeech}</b>`;
      res.meanings[1].definitions.forEach((def) => {
        meaningsDivDefVerb += `<li>${def.definition}</li>`;
      });
      res.meanings[1].synonyms.forEach((def) => {
        meaningsSynVerb += `<li onclick="newSearch('${def}')">${def}</li>`;
      });
      res.meanings[1].antonyms.forEach((def) => {
        meaningsAntVerb += `<li onclick="newSearch('${def}')">${def}</li>`;
      });

      box.innerHTML = `
      <div class="title">${res.word}</div>
      <div class="phonetic">${res.phonetic || ""}</div>
      <div class="phonetics">
      ${phoneticsDIV}
      </div>
      <hr />
      <i>Ma'nolari</i>
      <ul>
        ${meaningsDivNoun}
        <hr />
        <p>Definitions</p>
        ${meaningsDivDefNoun}
        <hr />
        <p>synonyms</p>
        ${meaningsSynNoun}
        <hr />
        <p>antonyms</p>
        ${meaningsAntNoun}
        <hr />
        <hr />
        ${meaningsDivVerb}
        <hr />
        <p>definitions</p>
        ${meaningsDivDefVerb}
        <hr />
        <p>synonyms</p>
        ${meaningsSynVerb}
        <hr />
        <p>antonyms</p>
        ${meaningsAntVerb}
      </ul>
      `;
    }
  };
};

const newSearch = (words) =>{
    word.value = words
    search()
}