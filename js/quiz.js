// MeetYu Quiz Experience
class MeetYuQuiz {
    constructor() {
        // Config
        this.totalQuestions = 5;
        this.currentQuestion = 0;
        this.answers = [];
        this.resultMapping = {
            high: {
                threshold: 80,
                title: "Perfect Match!",
                message: "Based on your responses, MeetYu aligns perfectly with your personal development goals and preferences.",
                insights: [
                    "You value self-reflection and personal growth through journaling",
                    "You appreciate AI assistance that enhances your thinking without replacing it",
                    "You're looking for tools that help you track patterns in your thoughts and emotions"
                ]
            },
            medium: {
                threshold: 60,
                title: "Great Potential!",
                message: "MeetYu shows strong potential to support your personal development journey, with a few areas that may require adjustment.",
                insights: [
                    "You're interested in structured journaling to improve your self-awareness",
                    "You appreciate technology that adapts to your unique needs",
                    "You may benefit from MeetYu's focused approach to emotional intelligence"
                ]
            },
            low: {
                threshold: 0,
                title: "Interesting Match",
                message: "While MeetYu offers valuable tools, your needs might be better served with specific features or approaches.",
                insights: [
                    "You might prefer a more traditional approach to journaling",
                    "You could benefit from exploring MeetYu's collaborative features",
                    "MeetYu's customization options can help tailor the experience to your preferences"
                ]
            }
        };

        // Quiz questions
        this.questions = [
            {
                id: 1,
                text: "How often do you reflect on your day?",
                options: [
                    { id: 1, text: "Every day", value: 20 },
                    { id: 2, text: "A few times a week", value: 15 },
                    { id: 3, text: "Sometimes", value: 10 },
                    { id: 4, text: "Rarely", value: 5 }
                ]
            },
            {
                id: 2,
                text: "What's your main goal for journaling?",
                options: [
                    { id: 1, text: "Self-awareness", value: 20 },
                    { id: 2, text: "Emotional growth", value: 18 },
                    { id: 3, text: "Build habits", value: 15 },
                    { id: 4, text: "Solve problems", value: 12 }
                ]
            },
            {
                id: 3,
                text: "How do you feel about AI in journaling?",
                options: [
                    { id: 1, text: "Love it", value: 20 },
                    { id: 2, text: "Open to it", value: 15 },
                    { id: 3, text: "Neutral", value: 10 },
                    { id: 4, text: "Prefer less AI", value: 5 }
                ]
            },
            {
                id: 4,
                text: "What's most important in a journaling app?",
                options: [
                    { id: 1, text: "Spotting patterns", value: 20 },
                    { id: 2, text: "Helpful prompts", value: 18 },
                    { id: 3, text: "Mood tracking", value: 15 },
                    { id: 4, text: "Simple writing", value: 12 }
                ]
            },
            {
                id: 5,
                text: "How important is privacy?",
                options: [
                    { id: 1, text: "Essential", value: 20 },
                    { id: 2, text: "Very important", value: 18 },
                    { id: 3, text: "Somewhat important", value: 15 },
                    { id: 4, text: "Not a big deal", value: 10 }
                ]
            }
        ];

        // DOM elements
        this.startScreen = document.querySelector('.quiz-start-screen');
        this.questionsContainer = document.querySelector('.quiz-questions-container');
        this.questionsWrapper = document.querySelector('.questions-wrapper');
        this.resultsScreen = document.querySelector('.quiz-results-screen');
        this.startBtn = document.querySelector('.start-quiz-btn');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.progressFill = document.querySelector('.progress-fill');
        this.currentQuestionEl = document.querySelector('.current-question');
        this.totalQuestionsEl = document.querySelector('.total-questions');
        this.gaugeFill = document.querySelector('.gauge-fill');
        this.gaugeNeedle = document.querySelector('.gauge-needle');
        this.gaugePercentage = document.querySelector('.gauge-percentage');
        this.resultsTitle = document.querySelector('.results-message h3');
        this.resultsMessage = document.querySelector('.results-message p');
        this.insightsList = document.querySelector('.insights-list');
        this.restartBtn = document.querySelector('.restart-quiz');
        this.tryNowBtn = document.querySelector('.results-cta .primary-button');

        // Initialize
        this.init();
    }

    init() {
        // Set total questions
        if (this.totalQuestionsEl) {
            this.totalQuestionsEl.textContent = this.totalQuestions;
        }

        // Add event listeners
        if (this.startBtn) {
            this.startBtn.addEventListener('click', () => this.startQuiz());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.navigateQuestion(-1));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.handleNextClick());
        }
        
        if (this.restartBtn) {
            this.restartBtn.addEventListener('click', () => this.restartQuiz());
        }
        
        if (this.tryNowBtn) {
            this.tryNowBtn.addEventListener('click', () => {
                window.location.href = 'https://meetyu.com/signup'; // Replace with your actual signup URL
            });
        }

        // Initialize ripple effect for buttons
        this.initRippleEffect();
    }

    initRippleEffect() {
        const buttons = document.querySelectorAll('.primary-button, .nav-button, .text-button');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    startQuiz() {
        // Hide start screen with fade-out animation
        this.startScreen.classList.add('fade-out');
        
        // After animation completes, hide start screen and show questions
        setTimeout(() => {
            this.startScreen.style.display = 'none';
            this.questionsContainer.style.display = 'block';
            this.questionsContainer.classList.add('fade-in');
            
            // Render the first question
            this.renderQuestion();
        }, 500);
    }

    renderQuestion() {
        const question = this.questions[this.currentQuestion];
        
        // Create question card element
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        
        // Create question title
        const questionTitle = document.createElement('h2');
        questionTitle.className = 'question-title';
        questionTitle.textContent = question.text;
        
        // Create answers container
        const answersContainer = document.createElement('div');
        answersContainer.className = 'answers-container';
        
        // Create answer options
        question.options.forEach(option => {
            const answerOption = document.createElement('div');
            answerOption.className = 'answer-option';
            answerOption.dataset.value = option.value;
            answerOption.dataset.id = option.id;
            
            // Check if this option was previously selected
            if (this.answers[this.currentQuestion] && 
                this.answers[this.currentQuestion].id === option.id) {
                answerOption.classList.add('selected');
            }
            
            // Create option content
            const optionContent = document.createElement('div');
            optionContent.className = 'option-content';
            
            // Create option marker (radio button visual)
            const optionMarker = document.createElement('div');
            optionMarker.className = 'option-marker';
            
            // Create option text
            const optionText = document.createElement('div');
            optionText.className = 'option-text';
            optionText.textContent = option.text;
            
            // Assemble option
            optionContent.appendChild(optionMarker);
            optionContent.appendChild(optionText);
            answerOption.appendChild(optionContent);
            
            // Add click event for option selection
            answerOption.addEventListener('click', (e) => this.selectAnswer(answerOption, option));
            
            // Add hover tracking for fancy effects
            answerOption.addEventListener('mousemove', (e) => {
                const rect = answerOption.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                answerOption.style.setProperty('--mouse-x', `${x}%`);
                answerOption.style.setProperty('--mouse-y', `${y}%`);
            });
            
            // Add to answers container
            answersContainer.appendChild(answerOption);
        });
        
        // Assemble question card
        questionCard.appendChild(questionTitle);
        questionCard.appendChild(answersContainer);
        
        // Clear previous question and add the new one
        if (this.questionsWrapper) {
            this.questionsWrapper.innerHTML = '';
            this.questionsWrapper.appendChild(questionCard);
        }
        
        // Update UI elements
        this.updateProgressBar();
        this.updateNavButtons();
    }

    selectAnswer(answerEl, option) {
        // Remove selection from all options
        const allOptions = document.querySelectorAll('.answer-option');
        allOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selection to clicked option
        answerEl.classList.add('selected');
        
        // Create ripple effect
        this.createSelectionRipple(answerEl);
        
        // Store the answer
        this.answers[this.currentQuestion] = {
            id: option.id,
            value: option.value,
            text: option.text
        };
        
        // Enable the next button if it was disabled
        if (this.nextBtn) {
            this.nextBtn.disabled = false;
        }
    }

    createSelectionRipple(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Position the ripple at center of element
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        
        element.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    navigateQuestion(direction) {
        // Calculate new question index
        const newIndex = this.currentQuestion + direction;
        
        // Validate index
        if (newIndex < 0 || newIndex >= this.totalQuestions) return;
        
        // Fade out current question
        if (this.questionsWrapper) {
            this.questionsWrapper.classList.add('fade-out');
        }
        
        // After animation, change question and fade in
        setTimeout(() => {
            this.currentQuestion = newIndex;
            this.renderQuestion();
            
            if (this.questionsWrapper) {
                this.questionsWrapper.classList.remove('fade-out');
                this.questionsWrapper.classList.add('fade-in');
                
                // Remove the fade-in class after animation completes
                setTimeout(() => {
                    this.questionsWrapper.classList.remove('fade-in');
                }, 500);
            }
        }, 300);
    }

    handleNextClick() {
        // If we're on the last question and have an answer, show results
        if (this.currentQuestion === this.totalQuestions - 1 && this.answers[this.currentQuestion]) {
            this.showResults();
        } else if (this.answers[this.currentQuestion]) {
            // Otherwise navigate to next question
            this.navigateQuestion(1);
        }
    }

    updateProgressBar() {
        // Update question number
        if (this.currentQuestionEl) {
            this.currentQuestionEl.textContent = this.currentQuestion + 1;
        }
        
        // Update progress bar width
        if (this.progressFill) {
            const progressPercentage = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
            this.progressFill.style.width = `${progressPercentage}%`;
        }
    }

    updateNavButtons() {
        // Disable previous button on first question
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentQuestion === 0;
        }
        
        // Update next button text on last question
        if (this.nextBtn) {
            const buttonText = this.nextBtn.querySelector('.button-text');
            if (buttonText) {
                if (this.currentQuestion === this.totalQuestions - 1) {
                    buttonText.textContent = 'See Results';
                } else {
                    buttonText.textContent = 'Next';
                }
            }
            
            // Disable next button if no answer selected for current question
            this.nextBtn.disabled = !this.answers[this.currentQuestion];
        }
    }

    calculateScore() {
        // Calculate total possible points
        const maxPossibleScore = this.questions.reduce((total, question) => {
            const maxOptionValue = Math.max(...question.options.map(option => option.value));
            return total + maxOptionValue;
        }, 0);
        
        // Calculate user's score
        const userScore = this.answers.reduce((total, answer) => {
            return total + (answer ? answer.value : 0);
        }, 0);
        
        // Calculate percentage
        return Math.round((userScore / maxPossibleScore) * 100);
    }

    getResultCategory(score) {
        if (score >= this.resultMapping.high.threshold) {
            return 'high';
        } else if (score >= this.resultMapping.medium.threshold) {
            return 'medium';
        } else {
            return 'low';
        }
    }

    animateGauge(percentage) {
        // Calculate rotation based on percentage (0-180 degrees)
        const rotation = (percentage / 100) * 180;
        
        // Update gauge fill clip-path
        if (this.gaugeFill) {
            if (percentage <= 50) {
                // For 0-50%, we adjust the first half of the gauge
                const angleRad = (percentage / 100) * Math.PI;
                const x = 50 + 50 * Math.sin(angleRad);
                const y = 50 - 50 * Math.cos(angleRad);
                this.gaugeFill.style.clipPath = `polygon(50% 50%, 0 0, 0 100%, 100% 100%, 100% 0, ${x}% ${y}%)`;
            } else {
                // For 51-100%, we adjust the second half of the gauge
                this.gaugeFill.style.clipPath = `polygon(50% 50%, 0 0, 0 100%, 100% 100%, 100% 0)`;
            }
        }
        
        // Update needle rotation
        if (this.gaugeNeedle) {
            this.gaugeNeedle.style.transform = `translate(-100%, -50%) rotate(${rotation}deg)`;
        }
        
        // Animate percentage counter
        this.animateCounter(percentage);
    }

    animateCounter(targetValue) {
        if (!this.gaugePercentage) return;
        
        let startValue = 0;
        const duration = 1500; // ms
        const startTime = performance.now();
        
        const updateCounter = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easing function for smoother animation
            const easedProgress = this.easeOutQuart(progress);
            
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);
            this.gaugePercentage.textContent = `${currentValue}%`;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    populateInsights(category) {
        if (!this.insightsList) return;
        
        // Clear existing insights
        this.insightsList.innerHTML = '';
        
        // Add new insights
        this.resultMapping[category].insights.forEach(insight => {
            const insightItem = document.createElement('li');
            insightItem.textContent = insight;
            this.insightsList.appendChild(insightItem);
        });
    }

    showResults() {
        // Calculate score
        const score = this.calculateScore();
        const resultCategory = this.getResultCategory(score);
        const resultData = this.resultMapping[resultCategory];
        // Update result content
        if (this.resultsTitle) {
            this.resultsTitle.textContent = resultData.title;
        }
        if (this.resultsMessage) {
            this.resultsMessage.textContent = resultData.message;
        }
        // Populate insights
        this.populateInsights(resultCategory);
        // Transition to results screen
        if (this.questionsContainer) {
            this.questionsContainer.classList.add('fade-out');
        }
        setTimeout(() => {
            if (this.questionsContainer) {
                this.questionsContainer.style.display = 'none';
            }
            if (this.resultsScreen) {
                this.resultsScreen.style.display = 'block';
                this.resultsScreen.classList.add('fade-in');
                // No gauge percentage animation
            }
        }, 500);
    }

    restartQuiz() {
        // Reset state
        this.currentQuestion = 0;
        this.answers = [];
        
        // Reset UI
        if (this.resultsScreen) {
            this.resultsScreen.classList.add('fade-out');
        }
        
        setTimeout(() => {
            if (this.resultsScreen) {
                this.resultsScreen.style.display = 'none';
            }
            
            if (this.startScreen) {
                this.startScreen.style.display = 'block';
                this.startScreen.classList.remove('fade-out');
                this.startScreen.classList.add('fade-in');
            }
            
            // Reset progress bar
            if (this.progressFill) {
                this.progressFill.style.width = '0%';
            }
            
            // Reset gauge
            if (this.gaugeFill) {
                this.gaugeFill.style.clipPath = `polygon(50% 50%, 0 0, 0 50%, 50% 50%)`;
            }
            
            if (this.gaugeNeedle) {
                this.gaugeNeedle.style.transform = `translate(-100%, -50%) rotate(0deg)`;
            }
            
            if (this.gaugePercentage) {
                this.gaugePercentage.textContent = '0%';
            }
            
            if (this.startScreen) {
                setTimeout(() => {
                    this.startScreen.classList.remove('fade-in');
                }, 500);
            }
        }, 500);
    }
}

// Initialize the quiz when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new MeetYuQuiz();
});