//   Variaveis Globais    //
const API_QUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"


//  Renderização da Tela 1 //
function getAllQuizz() {
	const promise = axios.get(API_QUIZZ);
	promise.then(response => {
		console.log(response)
		renderAllQuizz(response.data)
	});
}

function renderAllQuizz(quizzes) {
	const all_Quizz = document.querySelector(".allQuizz");
	all_Quizz.innerHTML = ""
	quizzes.forEach(quizz => {
		all_Quizz.innerHTML += `
        <article>
		    <img src="${quizz.image}" alt=""/>
		    <div class="gradient">
		    <p>${quizz.title}</p>
            </div>
	    </article>
        `
	})
}


//Criação Quiz

const createQuiz = document.querySelector('.createQuiz')


function basicInfo() {
	const quizTitle = createQuiz.querySelector('input:first-child').value
	const quizImg = createQuiz.querySelector('input:nth-child(2)').value
	const numberQuestions = createQuiz.querySelector('input:nth-child(3)').value
	const numberLvls = createQuiz.querySelector('input:last-child').value

	if (quizTitle.length < 20 || quizTitle.length > 65 || numberQuestions < 3 || numberLvls < 2 || quizImg.includes('https') === false/* || quizImg.toLowerCase().includes('jpg') === false*/) {
		alert('Dados Incorretos! Favor preencher corretamente.')
	} else {
		console.log(quizTitle)
		console.log(quizImg)
		console.log(numberQuestions)
		console.log(numberLvls)
	}

}

// Inicialização// 
getAllQuizz()