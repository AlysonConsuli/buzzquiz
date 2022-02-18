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


////////////////Criação Quiz////////////////

const quizDone = {
	title: '',
	image: '',
	questions: [],
	levels: []
}

const createQuiz = document.querySelector('.createQuiz')
//const container = createQuiz.querySelector('.container')
const basicInfoScreen = createQuiz.querySelector('.basicInfoScreen')
const questionScreen = createQuiz.querySelector('.questionScreen')
const lvlScreen = createQuiz.querySelector('.lvlScreen')
const endScreen = createQuiz.querySelector('.endScreen')

const quizTitle = createQuiz.querySelector('input:first-child')
const quizImg = createQuiz.querySelector('input:nth-child(2)')
const numberQuestions = createQuiz.querySelector('input:nth-child(3)')
const numberLvls = createQuiz.querySelector('input:nth-child(4)')

const h3 = createQuiz.querySelector('h3')
const buttonCreateQuiz = createQuiz.querySelector('button')

function saveBasicInfo() {

	if (!quizTitle.checkValidity() || !quizImg.checkValidity() || !numberQuestions.checkValidity() || !numberLvls.checkValidity()) {
		alert('Dados inválidos! Insira os dados corretamente.')
	} else {
		quizDone.title = quizTitle.value
		quizDone.image = quizImg.value

		hideScreen('Crie suas perguntas', basicInfoScreen, 'saveQuestions', 'Prosseguir pra criar níveis')
		createQuestions()
	}
}

function createQuestions() {
	for (let i = 0; i < numberQuestions.value; i++) {
		questionScreen.innerHTML += `
		<div class="box">
        	<h3>Pergunta ${i + 1}</h3>
        	<ion-icon name="create-outline" onclick="openBox(this,questionScreen,'questionOpen')"></ion-icon>
			<div class="questionOpen hidden">
				<input class="questionText" type="text" placeholder="Texto da pergunta" minlength="20" required></input>
				<input class="questionColor" type="text" placeholder="Cor de fundo da pergunta" minlength="7" maxlength="7" required></input>
			
				<h3 class="marginH3">Resposta correta</h3>
				<input class="correctText" type="text" placeholder="Resposta correta" required></input>
				<input class="correctImg" type="url" placeholder="URL da imagem" required></input>
			
				<h3 class="marginH3">Respostas incorretas</h3>
				<input class="incorrectText1" type="text" placeholder="Resposta incorreta 1" required></input>
				<input class="incorrectImg1 margin32" type="url" placeholder="URL da imagem 1" required></input>
			
				<input type="text" placeholder="Resposta incorreta 2"></input>
				<input class="margin32" type="url" placeholder="URL da imagem 2"></input>
			
				<input type="text" placeholder="Resposta incorreta 3"></input>
				<input type="url" placeholder="URL da imagem 3"></input>
			</div>
		</div>
		`
	}
	openFirstBox('questionOpen')
}

function saveQuestions() {
	const questions = questionScreen.querySelectorAll('.box')

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
			quizDone.questions = []
			return alert('Dados inválidos! Insira os dados corretamente!')
			//i = questions.length
		} else {
			quizDone.questions.push({
				title: questionText.value,
				color: questionColor.value,
				answers: answers
			})
		}
	}
	hideScreen('Agora, decida os níveis!', questionScreen, 'saveLvls', 'Finalizar Quizz')
	createLevels()
}

function createLevels() {
	for (let i = 0; i < numberLvls.value; i++) {
		lvlScreen.innerHTML += `
		<div class="box">
        	<h3>Nível ${i + 1}</h3>
        	<ion-icon name="create-outline" onclick="openBox(this,lvlScreen,'lvlOpen')"></ion-icon>
        	<div class="lvlOpen hidden">
            	<input class="lvlText" type="text" placeholder="Título do nível" minlength="10" required></input>
            	<input class="lvlMin" type="number" placeholder="% de acerto mínima" min="0" max="100" required></input>
            	<input class="lvlImg" type="url" placeholder="URL da imagem do nível" required></input>
            	<textarea class="lvlDesc" placeholder="Descrição do nível" minlength="30" required></textarea>
        	</div>
    	</div>
		`
	}
	openFirstBox('lvlOpen')
}

function saveLvls() {
	const levels = lvlScreen.querySelectorAll('.box')

	/*for (let i = 0; i < levels.length; i++) {
		let level = levels[i]
	}*/

	hideScreen('Seu quizz está pronto!', lvlScreen, 'accessQuiz', 'Acessar Quizz')
	//createEnd()

}



///////////////Funções Auxiliares da Criação////////////

function hideScreen(text, screen, btn, textBtn) {
	h3.innerText = text
	screen.classList.add('hidden')
	buttonCreateQuiz.setAttribute("onclick", `${btn}()`);
	buttonCreateQuiz.innerHTML = `<span>${textBtn}</span>`
}

function openFirstBox(screenOpen) {
	const box1 = document.querySelector(`.${screenOpen}`)
	const btn1 = box1.parentNode.querySelector('ion-icon')
	btn1.classList.add('hidden')
	box1.parentNode.classList.add('config')
	box1.classList.remove('hidden')
}

function openBox(button, screen, screenOpen) {
	const config = screen.querySelector('.config')
	const btn = config.querySelector('ion-icon')
	btn.classList.remove('hidden')
	const hiddenBox1 = config.querySelector(`.${screenOpen}`)
	hiddenBox1.classList.add('hidden')
	config.classList.remove('config')

	const box = button.parentNode
	button.classList.add('hidden')
	box.classList.add('config')
	const showScreen = box.querySelector(`.${screenOpen}`)
	showScreen.classList.remove('hidden')
	scrollScreen('config')
}

function scrollScreen(box) {
	let elementoQueQueroQueApareca = document.querySelector(`.${box} h3`);
	elementoQueQueroQueApareca.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

const hexChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
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





//////////////// Inicialização/////////////////// 
getAllQuizz()




/* ///////////////RASCUNHO///////////////
{
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



document.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		const enviar = document.querySelector('footer ion-icon')
		enviar.click()
	}
})

*/