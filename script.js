//   Variaveis Globais    //
const API_QUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"


//  Renderização da Tela 1 //
function getAllQuizz () {
    const promise = axios.get(API_QUIZZ);
    promise.then(response => {
		console.log(response)
		renderAllQuizz(response.data)
	});
}

function renderAllQuizz(quizzes){
	const all_Quizz = document.querySelector(".allQuizz");
	all_Quizz.innerHTML = ""
	quizzes.forEach(quizz => {
		all_Quizz.innerHTML+=`
        <article>
		    <img src="${quizz.image}" alt=""/>
		    <div class="gradient">
		    <p>${quizz.title}</p>
            </div>
	    </article>
        `
	})
}


// Inicialização// 
getAllQuizz()