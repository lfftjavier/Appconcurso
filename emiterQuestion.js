var emitQuestion = function(){
    
 };

 emitQuestion.sendQuestion = function(socket,pos,body){
    //server send question 
    socket.emit('question',{
        question : body[pos].pregunta,
        category : body[pos].categoria,

        optionOne : body[pos].data[0].contenido,
        solutionOne :body[pos].data[0].solucion,

        optionTwo :body[pos].data[1].contenido,
        solutionTwo:body[pos].data[1].solucion,

        optionThree : body[pos].data[2].contenido,
        solutionThree:body[pos].data[2].solucion
    });
 }

 module.exports = emitQuestion;