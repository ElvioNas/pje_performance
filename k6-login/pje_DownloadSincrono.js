import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
        processo_pje: {
            executor: 'constant-vus',
            vus: 5,
            duration: '20s',
        },
    },

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<5000'],
    },
};

const BASE_URL = 'https://desenvolvimento-pje.app.tjpe.jus.br';

const headersForm = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

export default function () {

    //=====================================================
    // 1 - LOGIN
    //=====================================================

    const paginaLogin = http.get(
        `${BASE_URL}/d01-1g/loginOld.seam?loginComCertificado=false`
    );

    check(paginaLogin, {
        'Tela Login': (r) => r.status === 200,
    });

    const payloadLogin = {
        username: '03108751450',
        password: '123',
        btnEntrar: 'Entrar'
    };

    const login = http.post(
        `${BASE_URL}/d01-1g/loginOld.seam?loginComCertificado=false`,
        payloadLogin,
        headersForm
    );

    check(login, {
        'Login realizado': (r) => r.status === 200 || r.status === 302,
    });

    console.log(`Login: ${login.status}`);

    sleep(1);

    //=====================================================
    // 2 - QUADRO DE AVISOS
    //=====================================================

    const quadroAviso = http.get(
        `${BASE_URL}/d01-1g/QuadroAviso/listViewQuadroAvisoMensagem.seam`
    );

    check(quadroAviso, {
        'Quadro Avisos': (r) => r.status === 200,
    });

    console.log(`Quadro Avisos: ${quadroAviso.status}`);

    sleep(1);

    //=====================================================
    // 3 - CONSULTA PROCESSUAL
    //=====================================================

    const consulta = http.get(
        `${BASE_URL}/d01-1g/Processo/ConsultaProcesso/listView.seam`
    );

    check(consulta, {
        'Tela Consulta': (r) => r.status === 200,
    });

    console.log(`Consulta Processo: ${consulta.status}`);

    sleep(1);

    //=====================================================
    // 4 - PESQUISAR PROCESSO
    //=====================================================

    const payloadPesquisa = {

        'AJAXREQUEST': '_viewRoot',

        'fPP:j_id169:nomeParte': '',
        'fPP:j_id178:outrosNomesAlcunha': '',
        'fPP:j_id187:nomeAdvogado': '',

        'tipoMascaraDocumento': 'on',

        'fPP:dpDec:documentoParte': '',

        'fPP:numeroProcesso:numeroSequencial': '123',
        'fPP:numeroProcesso:numeroDigitoVerificador': '',
        'fPP:numeroProcesso:Ano': '',
        'fPP:numeroProcesso:ramoJustica': '8',
        'fPP:numeroProcesso:respectivoTribunal': '17',
        'fPP:numeroProcesso:NumeroOrgaoJustica': '',

        'fPP:processoReferenciaDecoration:habilitarMascaraProcessoReferencia': 'true',
        'fPP:processoReferenciaDecoration:IdProcessoReferenciaComMascaraDecoration:IdProcessoReferenciaComMascara': '',

        'fPP': 'fPP',
        'autoScroll': '',
        'javax.faces.ViewState': 'j_id3',
        'fPP:j_id480': 'fPP:j_id480',
        'AJAX:EVENTS_COUNT': '1'
    };

    const pesquisa = http.post(
        `${BASE_URL}/d01-1g/Processo/ConsultaProcesso/listView.seam`,
        payloadPesquisa,
        headersForm
    );

    check(pesquisa, {
        'Pesquisa realizada': (r) => r.status === 200,
    });

    console.log(`Pesquisa: ${pesquisa.status}`);

    sleep(2);

    //=====================================================
    // 5 - ABRIR O PROCESSO ENCONTRADO
    //=====================================================

    const payloadAbrirProcesso = {

        'AJAXREQUEST': '_viewRoot',

        'idProcessoSelecionado': '7783227',

        'ajaxSingle': 'fPP:processosTable:7783227:j_id494',

        'fPP:processosTable:7783227:j_id494':
            'fPP:processosTable:7783227:j_id494',

        //'javax.faces.ViewState': 'j_id3',

        'AJAX:EVENTS_COUNT': '1',

        'fPP': 'fPP'
    };

    const abrirProcesso = http.post(
        `${BASE_URL}/d01-1g/Processo/ConsultaProcesso/listView.seam`,
        payloadAbrirProcesso,
        headersForm
    );

    check(abrirProcesso, {
        'Processo aberto': (r) => r.status === 200,
    });

    console.log(`Abrir Processo: ${abrirProcesso.status}`);

    //=====================================================
// 6 - DOWNLOAD DO DOCUMENTO
//=====================================================

const inicioDownload = Date.now();

const download = http.get(
    `${BASE_URL}/d01-1g/seam/resource/rest/pje-legacy/documento/download/244263016`
   // `${BASE_URL}/2026081209s/0000123-18.2026.8.17.2530-1786537134199-20395-peticao%20inicial%20%28outras%29.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=docs1g296adec7%2F20260812%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260812T121854Z&X-Amz-Expires=120&X-Amz-SignedHeaders=host&X-Amz-Signature=0bde7fcb4ab2de6a3b4c283fe93704192d3dd21ffd83e0db3d1098d391f54f63`
);

const tempoDownload = Date.now() - inicioDownload;

check(download, {
    'Download aberto': (r) => r.status === 200,

});

console.log(`Abrir Download: ${download.status}`);


sleep(2);






}