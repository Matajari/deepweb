// Traducciones
const translations = {
    es: {
        header_title: "Aprende Español Eficazmente",
        nav_classes: "Clases y Tarifas",
        nav_test: "¿Qué nivel tengo?",
        nav_community: "Comunidad",
        nav_practice: "Práctica Diaria",
        nav_reviews: "Reseñas",
        // ... más traducciones al español
    },
    en: {
        header_title: "Learn Spanish Effectively",
        nav_classes: "Classes and Pricing",
        nav_test: "What's my level?",
        // ... traducciones al inglés
    },
    ru: {
        header_title: "Эффективное изучение испанского",
        nav_classes: "Классы и тарифы",
        // ... traducciones al ruso
    },
    zh: {
        header_title: "有效学习西班牙语",
        nav_classes: "课程和价格",
        // ... traducciones al chino
    }
};

// Sistema de traducción
document.addEventListener('DOMContentLoaded', function() {
    // Cambiar idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            translatePage(lang);
        });
    });

    // Contador regresivo
    startCountdown();

    // Test de nivel
    document.getElementById('check-level').addEventListener('click', function() {
        checkSpanishLevel();
    });

    // Juego de práctica
    initMatchingGame();
});

function translatePage(lang) {
    // Actualizar botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Traducir elementos
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

function startCountdown() {
    let hours = 24;
    let minutes = 0;
    let seconds = 0;

    const countdownElement = document.getElementById('countdown');

    const interval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                if (hours === 0) {
                    clearInterval(interval);
                    countdownElement.textContent = "¡Oferta terminada!";
                    return;
                }
                hours--;
                minutes = 59;
            } else {
                minutes--;
            }
            seconds = 59;
        } else {
            seconds--;
        }

        countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function checkSpanishLevel() {
    // Lógica simplificada del test
    const answers = [
        document.getElementById('answer1').value.toLowerCase()
        // ... más respuestas
    ];

    let score = 0;
    
    // Evaluar respuestas (ejemplo simplificado)
    if (answers[0] && answers[0].length > 0) score += 20;

    // Determinar nivel
    let level = "A1";
    if (score > 60) level = "A2";
    if (score > 80) level = "B1";
    if (score > 90) level = "B2";

    alert(`Tu nivel estimado es: ${level}. Te recomendamos nuestras clases para nivel ${level}.`);
    window.location.href = "#classes";
}

function initMatchingGame() {
    // Ejercicios en español (no se traducen)
    const exercises = [
        { image: "🍎", word: "manzana" },
        { image: "🏃", word: "correr" },
        { image: "😊", word: "feliz" },
        // ... más ejercicios
    ];

    const gameContainer = document.getElementById('matching-game');
    
    // Mostrar primer ejercicio
    displayExercise(exercises[0], gameContainer);
    
    document.getElementById('next-exercise').addEventListener('click', function() {
        const currentIndex = exercises.findIndex(e => e.word === this.dataset.current);
        const nextIndex = (currentIndex + 1) % exercises.length;
        displayExercise(exercises[nextIndex], gameContainer);
    });
}

function displayExercise(exercise, container) {
    container.innerHTML = `
        <div class="exercise">
            <div class="image">${exercise.image}</div>
            <input type="text" placeholder="Escribe la palabra en español">
            <button class="check">Comprobar</button>
        </div>
    `;

    container.querySelector('.check').addEventListener('click', function() {
        const input = container.querySelector('input');
        if (input.value.toLowerCase() === exercise.word) {
            alert("¡Correcto!");
        } else {
            alert(`Casi! La respuesta correcta es "${exercise.word}"`);
        }
    });
}
