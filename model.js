
const Sequelize = require('sequelize');
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false});


let quizzes = [
    {
        question: "Capital de Italia",
        answer: "Roma"
    },
    {
        question: "Capital de Francia",
        answer: "París"
    },
    {
        question: "Capital de España",
        answer: "Madrid"
    },
    {
        question: "Capital de Portugal",
        answer: "Lisboa"
    }];

const load =() => {

    fs.readFile(DB_FILENAME, (err,data) =>{
        if(err){

            if(err.code === "ENOENT"){
                save();
                return;
            }
            throw err;
        }

        let json = JSON.parse(data);

        if(json){
            quizzes = json;
        }
    });
};

const save = () => {

    fs.writeFile(DB_FILENAME,
        JSON.stringify(quizzes),
    err => {
        if(err) throw err;
    });
};


//Devuelve el numero total de preguntas existentes

exports.count = () => quizzes.length;

// Añade un nuevo quiz

exports.add = (question, answer) => {
    quizzes.push({
        question: (question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};

//Actualiza el quiz situado en la posicion index

exports.update = (id, question, answer) => {

    const quiz = quizzes[id];
    if(typeof quiz === "undefined"){
        throw new Error(`El valor del parámetro id no es válido`);
    }
    quizzes.splice(id,1, {
        question: (question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};

// Devuelve una copia de todos los quizzes existentes.

exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

//Devuelve un con del quiz almacenado en la posición dada

exports.getByIndex = id => {
    const quiz = quizzes[id];
    if(typeof quiz === "undefined"){
        throw new Error(`El valor del parámetro id no es válido.`);
    }
    return JSON.parse(JSON.stringify(quiz));
};

// Elimina el quiz situado en la posicion dada

exports.deleteByIndex = id => {
    const quiz = quizzes[id];
    if(typeof quiz === "undefined"){
        throw new Error(`El valor del parámetro id no es válido.`);
    }
    quizzes.splice(id,1);
    save();
};

// Carga los quizzes almacenados en el fichero
load();
