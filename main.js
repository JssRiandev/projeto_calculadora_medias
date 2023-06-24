const form = document.getElementById('form-atividade');
const img_aprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />'; 
const img_reprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividades =[];
const notas = [];
const span_aprovado = '<span class="resultado aprovado">Aprovado</span>'
const span_reprovado = '<span class="resultado reprovado">Reprovado</span>' 
const nota_minima = parseFloat(prompt("Digite a nota mínima:")); 

let linhas = "";

form.addEventListener("submit",function(e){
    e.preventDefault();
    
    adiciona_linha();
    atualiza_tabela();
    atualiza_media();
});

function adiciona_linha(){

    const input_nome_atividade = document.getElementById("nome-atividade");
    const input_nota_atividade = document.getElementById("nota-atividade");

    if(atividades.includes(input_nome_atividade.value)){
        alert(`A atividade ${input_nome_atividade.value} já foi inserida`);
    }else{
    atividades.push(input_nome_atividade.value);
    notas.push(parseFloat(input_nota_atividade.value));

    let linha = "<tr>";

    linha += `<td>${input_nome_atividade.value}</td>`; //Definindo que a primeira coluna irá receber o valor digitado no campo nome
    linha += `<td>${input_nota_atividade.value}</td>`; //Definindo que a segunda coluna irá receber o valor digitado no campo nota
    linha += `<td>${input_nota_atividade.value >= nota_minima ? img_aprovado : img_reprovado}</td>`; //Definindo uma condição que: se(?) o valor digitado no campo nota, for maior do que 7, um emoji feliz irá aparecer na terceira coluna. E se não(:) a mensagem triste irá aparecer na terceira coluna
    linha += "</tr>"; //Fechando a tag tr

    linhas += linha; // definindo que a variável linha irá receber todo o conteúdo das colunas definidas anteriormente
    }

    input_nome_atividade.value = ""; //Limpando os campos ao adcionar a linha na tabela
    input_nota_atividade.value =""; 
}

function atualiza_tabela(){
    const corpo_tabela = document.querySelector("tbody"); //A constante corpo_tabela irá receber o conteúdo da tag tbody
    corpo_tabela.innerHTML = linhas; // Inserindo o conteúdo da variável linhas dentro da tag tbody do html
}

function atualiza_media(){
    const media_final = calcula_media();

    document.getElementById("media-final-valor").innerHTML= media_final.toFixed(2);
    document.getElementById("media-final-resultado").innerHTML= media_final >=nota_minima ? span_aprovado :  span_reprovado;

}

function calcula_media(){
    let soma_notas = 0;

    for (let i = 0; i<notas.length; i++){
        soma_notas += notas[i];
    }
    return soma_notas/notas.length;
}