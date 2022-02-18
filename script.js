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
        <article onclick="startQuizz(this)" id="${quizz.id}">
		    <img src="${quizz.image}" alt=""/>
		    <div class="gradient">
		    <p>${quizz.title}</p>
            </div>
	    </article>
        `
	})
}

//  Renderização da Tela 2 //
let currentQuizz = null;

function startQuizz(response) {
	const mainScreen = document.querySelector('main')
	mainScreen.classList.add('hidden')
	let selectedQuizz = response.id

	// console.log(response);
	// console.log(selectedQuizz);

	currentQuizz = axios.get(`${API_QUIZZ}/${selectedQuizz}`)
	const scren2 = document.querySelector('.screen-2-header')
	const screenQuestion = document.querySelector('.screen-2-quizz')
	
	// console.log(screenQuestion);
	// scren2.innerHTML = ""

	currentQuizz.then((response) => {
		currentQuizz = response.data

		scren2.innerHTML = `
        <figure>
            <p>${currentQuizz.title}</p>
            <img src="${currentQuizz.image}" alt="imagem do quizz">
            <div class="gradient-2"></div>
        </figure>

		`
		
		
		let newQuestions = response.data.questions
		
		// console.log(newQuestions);

		newQuestions.forEach((question) => {
			// console.log(question);
			screenQuestion.innerHTML += `
			<section class="box-quizz">
				<div class="title"  style="background-color:${question.color}">
				${question.title}
				</div>
				<div class="questions"></div>
			</section>
			`
			questionNum = question.answers.sort(() => Math.random() - 0.5)
			console.log(questionNum);
			
			// for (let index = 0; index < questionNum.length; index++) {
			// 	// console.log(index);

			// 	document.querySelector(`.questions`).innerHTML+= `
				
			// 	<span class="question">
			// 			<img src="${question.answers.image}" alt="">
			// 			<span>${question.answers.text}</span>
			// 		</span>
			// 	`
			//}
		})
		
		jorge = document.querySelectorAll('.questions')
		jorge = [...jorge]
		questionNum.forEach(answer => {
			console.log(answer.text, answer.image);
		});
		for (let i = 0; i < jorge.length; i++) {
			// console.log(jorge[i])
			
			
		}
	})
}

let jorge = null;

//Criação Quiz

const createQuiz = document.querySelector('.createQuiz')
const container = createQuiz.querySelector('.container')

const quizTitle = createQuiz.querySelector('input:first-child')
const quizImg = createQuiz.querySelector('input:nth-child(2)')
const numberQuestions = createQuiz.querySelector('input:nth-child(3)')
const numberLvls = createQuiz.querySelector('input:last-child')

function basicInfo() {

	if (!quizTitle.checkValidity() || !quizImg.checkValidity() || !numberQuestions.checkValidity() || !numberLvls.checkValidity()) {
		alert('Dados inválidos! Insira os dados corretamente.')
	} else {
		console.log(quizTitle.value)
		console.log(quizImg.value)
		console.log(numberQuestions.value)
		console.log(numberLvls.value)

		hiddenBasicInfo()
		createQuestions()
	}
}

function hiddenBasicInfo() {
	let h3 = createQuiz.querySelector('h3')
	h3.innerText = 'Crie suas perguntas'
	const basicsInfo = createQuiz.querySelector('.basicInfo')
	basicsInfo.classList.add('hidden')
	const buttonCreateQuiz = createQuiz.querySelector('button')
	buttonCreateQuiz.removeAttribute("onclick");
	buttonCreateQuiz.innerHTML = `<span>Prosseguir pra criar níveis</span>`
}

function createQuestions() {

	for (let i = 0; i < numberQuestions.value; i++) {
		container.innerHTML += `
		<div class="boxQuestion">
        	<h3>Pergunta ${i + 1}</h3>
        	<ion-icon name="create-outline" onclick="openQuestion(this)"></ion-icon>
    	</div>
		`
	}

}

function openQuestion(botao) {
	const box = botao.parentNode
	botao.classList.add('hidden')
	box.classList.add('config')
	box.innerHTML += `
	<input type="text" placeholder="Texto da pergunta" minlength="20" required></input>
	<input type="color" placeholder="Cor de fundo da pergunta"></input>
	
	<h3>Resposta correta</h3>
	<input type="text" placeholder="Resposta correta" required></input>
	<input type="url" placeholder="URL da imagem"></input>
	
	<h3>Respostas incorretas</h3>
	<input type="text" placeholder="Resposta incorreta 1" required></input>
	<input class="margin32" type="url" placeholder="URL da imagem 1"></input>
	
	<input type="text" placeholder="Resposta incorreta 2"></input>
	<input class="margin32" type="url" placeholder="URL da imagem 2"></input>
	
	<input type="text" placeholder="Resposta incorreta 3"></input>
	<input type="url" placeholder="URL da imagem 3"></input>
	`
}

// Inicialização// 
getAllQuizz()

/*{
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}
*/
