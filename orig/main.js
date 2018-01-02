var app = new Vue({
	el: '#app',
	data: {
		taskZero: {
			search: '',
			films: [
				{id: 1, name: 'Побег из Шоушенка', desc: 'Культовый фильм 1994 года.', voted: false},
				{id: 2, name: 'Крестный отец', desc: 'Эпическая гангстерская драма.', voted: false},
				{id: 3, name: 'Темный рыцарь', desc: 'Супергеройский боевик с элементами неонуара.', voted: false},
				{id: 4, name: 'Криминальное чтиво', desc: 'Кинофильм режиссёра Квентина Тарантино.', voted: false},
				{id: 5, name: 'Бойцовский клуб', desc: 'Американский кинофильм 1999 года режиссёра Дэвида Финчера.', voted: false},
				{id: 6, name: 'История игрушек: Большой побег', desc: 'Мультипликационный 3D-фильм студии Pixar.', voted: false}
			]
		},
		taskOne: {
			randomNum: 0,
			interval: null
		},
		taskTwo: {
			firstName: '',
			lastName: '',
		},
		taskThree: {
			tweet: ''
		},
		taskFour: {
			loaded: false,
			show: false,
			posts: []
		},
		taskFive: {
			choice: 'Выбери что-нибудь'
		},
		taskSix: {
			choices: []
		},
		taskSeven: {
			progress: 0,
			showPercents: true,
			interval: null
		},
		taskEight: {
			country: '',
			countries: [
				{ code: 'RU', name: 'Россия' },
				{ code: 'CN', name: 'Китай' },
				{ code: 'US', name: 'Соединенные Штаты Америки' }
			]
		},
		taskNine: {
			rubles: 0,
			dollars: 0
		},
		taskTen: {
			question: '',
			questionVal: '',
			answer: 'Задай вопрос',
			answers: ['Да', 'Нет', 'Может быть']
		},
		taskEleven: {
			post: '',
			edge: 10
		},
		microTask: {
			hoverMsg: ''
		}
	},
	watch: {
		question(val) {
			if (!val) {
				this.taskTen.answer = 'Задай вопрос';
			}
			else {
				this.taskTen.answer = 'Жду пока ты допишешь';
				this.taskTen.questionVal = val;
				this.getAnswer();
			}
		}
	},
	methods: {
		stopTaskOne() {
			clearInterval(this.taskOne.interval);
		},
		startTaskOne() {
			this.stopTaskOne();
			this.taskOne.interval = setInterval(function() {
				app.taskOne.randomNum = Math.floor(Math.random() * 15);
			}, 1000);
		},
		getPosts() {
			this.taskFour.show = true;
			setTimeout(function() {
				app.taskFour.loaded = true;
				app.taskFour.posts = [
					{id: 1, title: 'Заголовок первой статьи', body: 'Содержимое первой статьи', read: false},
					{id: 2, title: 'Заголовок второй статьи', body: 'Содержимое второй статьи', read: false},
					{id: 3, title: 'Заголовок третьей статьи', body: 'Содержимое третьей статьи', read: false}
				];
				app.taskFour.show = false;
			}, 2000);
		},
		markRead(postId) {
			this.taskFour.posts.find(function(post) {
				if (postId === post.id) {
					post.read = true;
				}
			})
		},
		loadBar() {
			this.taskSeven.interval = setInterval(function() {
				if (app.taskSeven.progress >= 100) {
					clearInterval(app.taskSeven.interval);
				}
				else {
					app.taskSeven.progress++;
				}
			}, 30);
		},
		resetBar() {
			clearInterval(this.taskSeven.interval);
			this.taskSeven.progress = 0;
		},
		getAnswer: _.debounce(function() {
			if (app.taskTen.questionVal && app.taskTen.answer != 'Задай вопрос') {
				app.taskTen.answer = 'Думаю...';
				setTimeout(function() {
					app.taskTen.answer = app.taskTen.answers[Math.floor(Math.random() * app.taskTen.answers.length)];
				}, 1200);
			}
		}, 800),
		vote(film) {
			film.voted = true;
		}
	},
	computed: {
		reversedName() {
			return this.fullName.split('').reverse().join('');
		},
		fullName() {
			return this.taskTwo.firstName + ' ' + this.taskTwo.lastName;
		},
		tweetClass() {
			return {
				warning: this.taskThree.tweet.length > 10,
				danger: this.taskThree.tweet.length > 19
			}
		},
		formattedDollars: {
			get() {
				return '$' + this.taskNine.dollars;
			},
			set(val) {
				if (!val) {
					this.taskNine.dollars = 0;
				}
				this.taskNine.dollars = val.split('$').reverse()[0];
			}
		},
		formattedRubles: {
			get() {
				return '₽' + this.taskNine.rubles;
			},
			set(val) {
				if (!val) {
					this.taskNine.rubles = 0;
				}
				this.taskNine.rubles = val.split('₽').reverse()[0];
			}
		},
		computedDollars() {
			return (this.taskNine.rubles / 60).toFixed(2);
		},
		computedRubles() {
			return this.taskNine.dollars * 60;
		},
		question() {
			return this.taskTen.question;
		},
		filteredFilms() {
			var str = this.taskZero.search.toLowerCase();
			return this.taskZero.films.filter(function(film) {
				if (str == '') {
					return true;
				}
				return film.name.toLowerCase().indexOf(str) != -1;
			});
		}
	},
	filters: {
		truncate(val, len) {
			if (val.length > +len) {
				return val.substring(0, +len) + '...';
			}
			return val;
		}
	}
})