const input = document.querySelector("#cep");
const btn = document.querySelector("#btn");
const loader = document.querySelector("#loader");
const msg = document.querySelector("#msg");
const loaderTxt = document.querySelector("h3");
const container = document.querySelector("#container");
const fields = document.querySelector("#fields");
btn.addEventListener('click', async () => {
    var cep = input.value;
    cep = cep.replace(".","");
    cep = cep.replace("-","");
    loaderTxt.innerText = "Carregando...";
    if(cep.length == 8){
        var request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var data = await request.json();
        if(data.erro == undefined){
            var txt = "";
            // CASO O CEP EXISTA
            if(data.logradouro.length > 0){
                // CEP ESPECIFICO                
                let {cep: data_cep,logradouro:data_rua, bairro:data_bairro,localidade:data_cidade, uf:data_uf} = data;
                document.querySelector("#data_cep_especifico").innerText = data_cep;
                document.querySelector("#data_rua_especifico").innerText = data_rua;
                document.querySelector("#data_bairro_especifico").innerText = data_bairro;
                document.querySelector("#data_cidade_especifico").innerText = data_cidade;
                document.querySelector("#data_uf_especifico").innerText = data_uf;
                document.querySelector("#especifico").style.display = "block";
                document.querySelector("#geral").style.display = "none";
                txt = "CEP específico";
            }else{
                // CEP GERAL
                let {cep: data_cep,localidade:data_cidade, uf:data_uf} = data;
                document.querySelector("#data_cep_geral").innerText = data_cep;
                document.querySelector("#data_cidade_geral").innerText = data_cidade;
                document.querySelector("#data_uf_geral").innerText = data_uf;
                document.querySelector("#geral").style.display = "block";
                document.querySelector("#especifico").style.display = "none";
                txt = "CEP geral";
            }
            
            
            // ANIMATION
            loader.style.display = "flex";
            setTimeout(() => {
                loaderTxt.innerText = "Estabelecendo conexão com o servidor..."
            }, 1000);

            setTimeout(() => {
                loaderTxt.innerText = "Buscando CEP no banco de dados...";
            }, 3000);

            setTimeout(() => {
                loaderTxt.innerText = "Coletando informações de um "+txt+"...";
            }, 5000);
            
            setTimeout(() => {
                loader.style.display = "none";
                fields.style.top = "0vh";
            },6500);

            setTimeout(() => {
                if(txt.search("geral") != -1){
                    document.querySelector("#data_rua_geral").focus();
                }else{
                    document.querySelector("#data_numero_especifico").focus();  
                }
            },7400);
            














        }else{
            //Caso o CEP não exista
            loader.style.display = "flex";
            setTimeout(() => {
                loaderTxt.innerText = "Estabelecendo conexão com o servidor..."
            }, 1000);

            setTimeout(() => {
                loaderTxt.innerText = "Buscando CEP no banco de dados...";
            }, 3000);

            setTimeout(() => {
                loaderTxt.innerText = "CEP não encontrado! Buscando em servidores alternativos...";
            }, 5000);

            setTimeout(() => {
                loader.style.display = "none";
                // Caso cep seja inválido
                msg.innerText = "CEP não encontrado...";
                msg.style.opacity = 1;

                setTimeout(() => {
                    msg.style.opacity = 0;
                    input.focus();
                },2000);
            }, 9000);
            
        }
        














    }else{
        // Caso o CEP esteja incompleto
        msg.innerText = "CEP inválido...";
        msg.style.opacity = 1;

        setTimeout(() => {
            msg.style.opacity = 0;
            input.focus();
        },2000);
    }
    
});


function searchForANewZipCode(){
    loader.style.display = "none";
    fields.style.top = "101vh";
    input.value = "";
}



document.querySelectorAll(".btn_change")[0].addEventListener('click', () => {
    searchForANewZipCode()
});

document.querySelectorAll(".btn_change")[1].addEventListener('click', () => {
    searchForANewZipCode()
});