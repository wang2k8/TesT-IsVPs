const questionContainer = document.getElementById('question-container');
const submitBtn = document.getElementById('submit-btn');
const resultBox = document.getElementById('result-box');
const resultMessage = document.getElementById('result-message');
const retryBtn = document.getElementById('retry-btn');
const loadingDiv = document.getElementById('loading');
const quizContainer = document.querySelector('.quiz-container');

let questions = [];
let selectedAnswers = [];

// Xáo trộn mảng
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Hoán đổi
    }
};

// Tải câu hỏi
const loadQuestions = () => {
    try {
        // Lặp qua 25 câu hỏi
        for (let i = 1; i <= 11; i++) {
            const question = window[`question${i}`];
            if (!question) {
                console.warn(`Câu hỏi ${i} không được tìm thấy.`);
                continue;
            }
            questions.push(question);
        }

        if (questions.length < 10) {
            alert("Không đủ câu hỏi để làm bài kiểm tra. Vui lòng kiểm tra lại!");
            throw new Error("Không đủ câu hỏi.");
        }

        // Xáo trộn và chọn 10 câu ngẫu nhiên
        shuffleArray(questions);
        questions = questions.slice(0, 10);
        questions.forEach((question) => shuffleArray(question.answers));

        loadingDiv.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        renderQuestions();
    } catch (error) {
        console.error("Lỗi khi tải câu hỏi:", error);
        alert("Đã xảy ra lỗi trong quá trình tải câu hỏi.");
    }
};

// Hiển thị câu hỏi
const renderQuestions = () => {
    questionContainer.innerHTML = ''; 
    selectedAnswers = Array(questions.length).fill(null);

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionText = document.createElement('h3');
        questionText.textContent = `Câu ${index + 1}: ${q.text}`;
        questionDiv.appendChild(questionText);

        q.answers.forEach((answer, i) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer-option';
            answerDiv.textContent = answer.text;
            answerDiv.onclick = () => selectAnswer(index, i, answerDiv);
            questionDiv.appendChild(answerDiv);
        });

        questionContainer.appendChild(questionDiv);
    });
};

// Chọn câu trả lời
const selectAnswer = (questionIndex, answerIndex, element) => {
    console.log(`Chọn câu trả lời: Câu ${questionIndex + 1}, Đáp án ${answerIndex}`);
    selectedAnswers[questionIndex] = answerIndex;
    document.querySelectorAll('.question')[questionIndex].querySelectorAll('.answer-option').forEach((option) => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
};

// Chấm điểm
const gradeQuiz = () => {
    console.log("Chấm điểm bài kiểm tra...");
    if (selectedAnswers.includes(null)) {
        alert("Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài!");
        return;
    }

    let score = 0;
    selectedAnswers.forEach((answerIndex, i) => {
        if (questions[i].answers[answerIndex]?.correct) {
            score += 1;
        }
    });

    resultBox.classList.remove('hidden');
    quizContainer.classList.add('hidden');
    resultMessage.textContent = getMessage(score);
};

// Hiển thị thông báo kết quả
const getMessage = (score) => {
    console.log(`Điểm số: ${score}`);
    if (score < 5) return `Bạn được ${score} điểm. Có vẻ bạn cần ôn tập thêm!`;
    if (score < 7) return `Bạn được ${score} điểm. Khá tốt, nhưng cần cố gắng hơn!`;
    if (score < 9) return `Bạn được ${score} điểm. Rất tốt, hãy tiếp tục phát huy!`;
    return `Bạn được ${score} điểm. Xuất sắc!`;
};

// Kiểm tra kết nối nút
submitBtn.onclick = () => {
    console.log("Nút Nộp bài được nhấn!");
    gradeQuiz();
};

retryBtn.onclick = () => {
    console.log("Nút Làm lại được nhấn!");
    location.reload();
};

// Khởi động
window.onload = () => {
    try {
        console.log("Bắt đầu tải câu hỏi...");
        loadQuestions();
    } catch (error) {
        console.error("Lỗi khi tải trang:", error);
        alert("Đã xảy ra lỗi. Vui lòng thử lại!");
    }
};
