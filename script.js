//   Variaveis Globais    //
const API_QUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"


// Variaveis de controle pra tela 2 //
let scrollTo = 0;
let questionsToEnd = null;
let numberQuestionsTotal = null;
let numberCorrectAnswers = 0;
let levelsQuizz

let levelImage = null;
let levelTitle = null;
let levelText = null;

//  Renderização da Tela 1 //
function getAllQuizz() {
	const promise = axios.get(API_QUIZZ);
	promise.then(response => {
		// console.log(response)
		renderAllQuizz(response.data)
	});
}

function renderAllQuizz(quizzes) {
	const all_Quizz = document.querySelector(".allQuizz");
	all_Quizz.innerHTML = ""
	quizzes.forEach(quizz => {
		all_Quizz.innerHTML += `
        <article onclick="startQuizz(${quizz.id})" id="${quizz.id}">
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

const mainScreen = document.querySelector('main')
function startQuizz(response) {
	console.log(response);
	const mainScreen = document.querySelector('main')
	mainScreen.classList.add('hidden')
	createQuiz.classList.add('hidden')
	//let selectedQuizz = response.id

	// console.log(response);
	// console.log(selectedQuizz);

	currentQuizz = axios.get(`${API_QUIZZ}/${response}`)
	const scren2 = document.querySelector('.screen-2-header')
	const screenQuestion = document.querySelector('.screen-2-quizz')


	// console.log(screenQuestion);
	// scren2.innerHTML = ""

	currentQuizz.then((response) => {
		currentQuizz = response.data
		levelsQuizz = currentQuizz.levels
		console.log(levelsQuizz);
		console.log(currentQuizz);
		scren2.innerHTML = `
        <figure>
            <p>${currentQuizz.title}</p>
            <img src="${currentQuizz.image}" alt="imagem do quizz">
            <div class="gradient-2"></div>
        </figure>

		`


		let newQuestions = response.data.questions

		// console.log(newQuestions);



		newQuestions.forEach((question, indexd) => {
			// console.log(question);
			// console.log(i);
			screenQuestion.innerHTML += `
			<section class="box-quizz">
				<div class="title"  style="background-color:${question.color}">
				${question.title}
				</div>
				<div class="questions q${indexd}"></div>
			</section>
			`
			questionNum = question.answers.sort(() => Math.random() - 0.5)
			// console.log(question);

			questionNum.forEach((element,) => {
				document.querySelector(`.questions.q${indexd}`).innerHTML += `
				
				<span class="question is${element.isCorrectAnswer}" onclick="checkCorret(this)">
						<img src="${element.image}" alt="quizz answer photo">
						<span>${element.text}</span>
					</span>`
			})
		})
	})
	setTimeout(() => {
		questionsToEnd = document.querySelectorAll('.questions').length;
		console.log(questionsToEnd);
		numberQuestionsTotal = questionsToEnd;
	}, 400)


}



function checkCorret(alternative) {
	// console.log(response.classList);
	// console.log(response.parentNode);
	const teste = alternative.parentNode;
	alternative.classList.add('selected')
	const testeArray = teste.querySelectorAll('.question')


	if (alternative.classList[1] == 'istrue') {
		alternative.classList.add('correctAnswer')
		console.log('acertou! :D');
		teste.style.pointerEvents = "none"

		testeArray.forEach(element => { if (element.classList[2] != 'selected') { element.style.opacity = '0.3' } })

		scrollTo++
		// console.log(scrollTo);
		setTimeout(() => {
			document.querySelector(`.questions.q${scrollTo}`).scrollIntoView({ block: "center", behavior: "smooth" })

		}, 2000)
		numberCorrectAnswers++
		questionsToEnd--
		if (questionsToEnd === 0) { acabou() }
	}

	else {
		alternative.classList.add('wrongAnswer')
		console.log('errou! :(');
		teste.style.pointerEvents = "none"

		testeArray.forEach(element => { if (element.classList[2] != 'selected') { element.style.opacity = '0.3' } })

		scrollTo++
		console.log(scrollTo);
		setTimeout(() => {
			document.querySelector(`.questions.q${scrollTo}`).scrollIntoView({ block: "center", behavior: "smooth" })

		}, 2000)
		questionsToEnd--
		if (questionsToEnd === 0) { acabou() }
	}
}

function acabou() {
	setTimeout(() => {
		let percentCorrect = Math.round((numberCorrectAnswers / numberQuestionsTotal) * 100)
		console.log(percentCorrect);

		levelsQuizz = levelsQuizz.sort(function (a, b) {
			return a.minValue - b.minValue
		}
		)
		console.log(levelsQuizz);
		levelsQuizz.forEach(level => {
			if (percentCorrect >= level.minValue) {

				levelImage = level.image
				levelTitle = level.title;
				levelText = level.text
				levelPercent = level.minValue;
				console.log(levelImage);
				console.log(levelTitle);
				console.log(levelText);
			}

		})

		const levelBox = document.querySelector('.screen-2-quizz')
		levelBox.innerHTML += `
			<section class="boxLevelQuizz">
			<div class="titlefinal">
				<h5>${percentCorrect}% de acerto: ${levelTitle} </h5>
			</div>
			<img src="${levelImage}" alt="photo level answer"> 
			<div class="description"> <h6>${levelText}</h6> </div>
			</section>
		`
		document.querySelector(".boxLevelQuizz").scrollIntoView({ block: "center", behavior: "smooth" })
	}, 2001)
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

let h3 = createQuiz.querySelector('h3')
let buttonCreateQuiz = createQuiz.querySelector('button')

function saveBasicInfo() {

	if (checkURL(quizImg.value) === false || !quizTitle.checkValidity() ||
		!quizImg.checkValidity() || !numberQuestions.checkValidity() || !numberLvls.checkValidity()) {
		alert('Dados inválidos! Insira os dados corretamente.')
	} else {
		quizDone.title = quizTitle.value
		quizDone.image = quizImg.value

		hideScreen('Crie suas perguntas', basicInfoScreen, 'saveQuestions()', 'Prosseguir pra criar níveis')
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
			
				<input class="incorrectText2" type="text" placeholder="Resposta incorreta 2"></input>
				<input class="incorrectImg2 margin32" type="url" placeholder="URL da imagem 2"></input>
			
				<input class="incorrectText3" type="text" placeholder="Resposta incorreta 3"></input>
				<input class="incorrectImg3" type="url" placeholder="URL da imagem 3"></input>
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

		let incorrectText2 = question.querySelector('.incorrectText2')
		let incorrectImg2 = question.querySelector('.incorrectImg2')

		let incorrectText3 = question.querySelector('.incorrectText3')
		let incorrectImg3 = question.querySelector('.incorrectImg3')

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

		if (incorrectText2.value !== '' || incorrectImg2.value !== '') {
			if (checkURL(incorrectImg2.value) === true && incorrectImg2.checkValidity() && 
			incorrectText2.value !== '' && incorrectImg2.value !== '') {
				answers.push({
					text: incorrectText2.value,
					image: incorrectImg2.value,
					isCorrectAnswer: false
				})
			} else {
				quizDone.questions = []
				return alert('Dados inválidos! Insira os dados corretamente!')
			}
		}
		if (incorrectText3.value !== '' || incorrectImg3.value !== '') {
			if (checkURL(incorrectImg3.value) === true && incorrectImg3.checkValidity() &&
			incorrectText3.value !== '' && incorrectImg3.value !== '') {
				answers.push({
					text: incorrectText3.value,
					image: incorrectImg3.value,
					isCorrectAnswer: false
				})
			} else {
				quizDone.questions = []
				return alert('Dados inválidos! Insira os dados corretamente!')
			}
		}

		if (isHex(questionColor.value) === false || checkURL(correctImg.value) === false ||
			checkURL(incorrectImg1.value) === false || !questionText.checkValidity() ||
			!questionColor.checkValidity() || !correctText.checkValidity() ||
			!incorrectText1.checkValidity() || !correctImg.checkValidity() || !incorrectImg1.checkValidity()) {

			quizDone.questions = []
			return alert('Dados inválidos! Insira os dados corretamente!')

		} else {
			quizDone.questions.push({
				title: questionText.value,
				color: questionColor.value,
				answers: answers
			})
		}
	}
	hideScreen('Agora, decida os níveis!', questionScreen, 'saveLvls()', 'Finalizar Quizz')
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

	for (let i = 0; i < levels.length; i++) {
		let level = levels[i]
		let lvlText = level.querySelector('.lvlText')
		let lvlMin = level.querySelector('.lvlMin')
		let lvlImg = level.querySelector('.lvlImg')
		let lvlDesc = level.querySelector('.lvlDesc')

		if (checkURL(lvlImg.value) === false || !lvlText.checkValidity() ||
			!lvlMin.checkValidity() || !lvlImg.checkValidity() || !lvlDesc.checkValidity()) {
			quizDone.levels = []
			return alert('Dados inválidos! Insira os dados corretamente!!')
		} else {
			quizDone.levels.push({
				title: lvlText.value,
				image: lvlImg.value,
				text: lvlDesc.value,
				minValue: lvlMin.value
			})
		}
	}

	if (hasLvl0() === false) {
		quizDone.levels = []
		return alert('Dados inválidos! Insira os dados corretamente!!')
	}

	postQuiz()
}

function postQuiz() {
	const promise = axios.post(API_QUIZZ, quizDone)
	promise.then(response => {
		let userQuizDone = response.data
		let userQuizId = response.data.id
		saveUserQuiz(userQuizDone, userQuizId)
		getAllUserQuiz()
		hideScreen('Seu quizz está pronto!', lvlScreen, `startQuizz(${userQuizId})`, 'Acessar Quizz')
		createEnd()
	})
}

function saveUserQuiz(quiz, id) {
	let quizDoneSerialized = JSON.stringify(quiz)
	localStorage.setItem(`${id}`, quizDoneSerialized)
}

function getAllUserQuiz() {
	let allUserQuiz = []
	for (let i = 0; i < localStorage.length; i++) {
		let quizId = localStorage.key(i)
		let userQuizSerialized = localStorage.getItem(quizId)
		let userQuiz = JSON.parse(userQuizSerialized)
		allUserQuiz.push(userQuiz)
	}
	//console.log(allUserQuiz)
	return allUserQuiz
}

function createEnd() {
	endScreen.innerHTML = `
    <article>
		<img src="${quizDone.image}" alt="${quizDone.image}"/>
		<div class="gradient">
			<p>${quizDone.title}</p>
        </div>
	</article>
	`
	createQuiz.innerHTML += `
	<div class="finalButton">
        <span onclick="backHome()">Voltar pra home</span>
    </div>
	`
	const lastBtn = createQuiz.querySelector('button')
	lastBtn.classList.add('reduceBtn')
}


function backHome() {
	//window.location.reload() //getAllQuizz()
	const promise = axios.get(API_QUIZZ);
	promise.then(response => {
		renderAllQuizz(response.data)
		createQuiz.classList.add('hidden')
		mainScreen.classList.remove('hidden')
	});
}



///////////////Funções Auxiliares da Criação////////////

function checkURL(url) {
	return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function hideScreen(text, screen, btn, textBtn) {
	h3.innerText = text
	screen.classList.add('hidden')
	buttonCreateQuiz.setAttribute("onclick", btn);
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

function hasLvl0() {
	let hasLvlMin = false
	quizDone.levels.forEach(levelInfo => {
		if (parseInt(levelInfo.minValue) === 0) {
			hasLvlMin = true
		}
	})
	if (hasLvlMin === false) {
		return false
	}
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

localStorage.removeItem('i')
localStorage.clear()
localStorage.key(i)

*/