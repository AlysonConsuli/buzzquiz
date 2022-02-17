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
	const scren2 = document.querySelector('.screen-2')
	const screenQuestion = document.querySelector('.desisto')
	// scren2.innerHTML = ""

	currentQuizz.then((response) => {
		currentQuizz = response.data

		scren2.innerHTML = `
        <figure>
            <p>${currentQuizz.title}</p>
            <img src="${currentQuizz.image}" alt="">
            <div class="gradient-2"></div>
        </figure>
		`

		currentQuizz.questions.forEach((question) => {
			screenQuestion.innerHTML = `
			<div class="title">${question.title}</div>
            <div class="questions">
                <span class="question">
                    <img src="https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="">
                    <span>carhorro</span>
                </span>
			`
		})
	})
}


//Criação Quiz

const quizDone = {
	title: '',
	image: '',
	questions: [],
	levels: []
}

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
		quizDone.title = quizTitle.value
		quizDone.image = quizImg.value

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
	//buttonCreateQuiz.removeAttribute("onclick");
	buttonCreateQuiz.setAttribute("onclick", "questionsInfo()");
	buttonCreateQuiz.innerHTML = `<span>Prosseguir pra criar níveis</span>`
}

function createQuestions() {

	for (let i = 0; i < numberQuestions.value; i++) {
		container.innerHTML += `
		<div class="boxQuestion question${i + 1}">
        	<h3>Pergunta ${i + 1}</h3>
        	<ion-icon name="create-outline" onclick="openQuestion(this)"></ion-icon>
    	</div>
		`
	}

}

let contador = 0

function openQuestion(botao) {
	const box = botao.parentNode
	botao.classList.add('hidden')
	box.classList.add('config')
	box.innerHTML += `
	<input class="questionText" type="text" placeholder="Texto da pergunta" minlength="20" required></input>
	<input class="questionColor" type="text" placeholder="Cor de fundo da pergunta" minlength="7" maxlength="7" required></input>
	
	<h3>Resposta correta</h3>
	<input class="correctText" type="text" placeholder="Resposta correta" required></input>
	<input class="correctImg" type="url" placeholder="URL da imagem" required></input>
	
	<h3>Respostas incorretas</h3>
	<input class="incorrectText1" type="text" placeholder="Resposta incorreta 1" required></input>
	<input class="incorrectImg1 margin32" type="url" placeholder="URL da imagem 1" required></input>
	
	<input type="text" placeholder="Resposta incorreta 2"></input>
	<input class="margin32" type="url" placeholder="URL da imagem 2"></input>
	
	<input type="text" placeholder="Resposta incorreta 3"></input>
	<input type="url" placeholder="URL da imagem 3"></input>
	`

	contador++
	/*let questionH3 = box.querySelector('h3')
	let numberQuestion = parseInt((questionH3.innerText).substring(9,questionH3.innerText.length))
	let questionText = box.querySelector('input:first-child')
	let questionColor = box.querySelector('input:nth-child(2)')*/

}

const hexChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

function questionsInfo() {
	const questions = container.querySelectorAll('.boxQuestion')

	if (contador !== parseInt(numberQuestions.value)) {
		alert('Preencha todas as perguntas!')
	} else {
		for (let i = 0; i < questions.length; i++) {
			let question = questions[i]
			let questionText = question.querySelector('.questionText')
			let questionColor = question.querySelector('.questionColor')

			let correctText = question.querySelector('.correctText')
			let correctImg = question.querySelector('.correctImg')

			let incorrectText1 = question.querySelector('.incorrectText1')
			let incorrectImg1 = question.querySelector('.incorrectImg1')

			let answers = [
				{
					text: correctText.value,
					image: correctImg.value,
					isCorrectAnswer: true
				},
				{
					text: incorrectText1.value,
					image: incorrectImg1.value,
					isCorrectAnswer: false
				}
			]

			if (isHex(questionColor.value) === false || !questionText.checkValidity() || !questionColor.checkValidity() || !correctText.checkValidity() || !incorrectText1.checkValidity() || !correctImg.checkValidity() || !incorrectImg1.checkValidity()) {
				alert('Dados inválidos! Insira os dados corretamente!')
				quizDone.questions = []
				i = questions.length
			} else {
				quizDone.questions.push({
					title: questionText.value,
					color: questionColor.value,
					answers: answers
				})
			}
		}
	}
}

function isHex(color) {
	if (color.substring(0, 1) !== '#') {
		return false
	}
	for (let j = 1; j < color.length; j++) {
		if (!hexChar.includes((color.substring(j, j + 1)).toLowerCase())) {
			return false
		}
	}
	return true
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

/*document.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		const enviar = document.querySelector('footer ion-icon')
		enviar.click()
	}
})*/
