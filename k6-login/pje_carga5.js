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

        'javax.faces.ViewState': 'j_id3',

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
//=====================================================
// 6 - SOLICITAR DOWNLOAD DO DOCUMENTO NO PJE
//=====================================================

const inicioSolicitacao = Date.now();

const download = http.get(
    `${BASE_URL}/d01-1g/seam/resource/rest/pje-legacy/documento/download/244263016`,
    {
        headers: {
            'Referer':
                `${BASE_URL}/d01-1g/js/pdfjs/web/viewer.html?file=%2Fd01-1g%2Fseam%2Fresource%2Frest%2Fpje-legacy%2Fdocumento%2Fdownload%2F244263016`,
            'Accept': 'application/pdf,*/*'
        },
        redirects: 0
    }
);

const tempoSolicitacao = Date.now() - inicioSolicitacao;

console.log('============================================');
console.log('SOLICITAÇÃO DO DOWNLOAD');
console.log('============================================');
console.log(`Status: ${download.status}`);
console.log(`Tempo: ${tempoSolicitacao} ms`);
console.log(`Content-Type: ${download.headers['Content-Type']}`);
console.log(`Content-Length: ${download.headers['Content-Length']}`);
console.log(`Body: ${download.body.length} bytes`);
console.log('============================================');

check(download, {
    'Solicitação download': (r) => r.status === 200,
});


//=====================================================
// 7 - DOWNLOAD DIRETO DO MINIO
//=====================================================

const urlMinio =
    'https://desenvolvimento-pje-docs-1g-minio-api.app.tjpe.jus.br/2026081215s/0000123-18.2026.8.17.2530-1786560556783-20395-peticao';

console.log('============================================');
console.log('DOWNLOAD DIRETO DO MINIO');
console.log('============================================');

const inicioMinio = Date.now();

const arquivo = http.get(urlMinio, {
    redirects: 0
});

const tempoMinio = Date.now() - inicioMinio;

console.log(`Status MinIO: ${arquivo.status}`);
console.log(`Tempo Download: ${tempoMinio} ms`);
console.log(`Content-Type: ${arquivo.headers['Content-Type']}`);
console.log(`Content-Length: ${arquivo.headers['Content-Length']}`);
console.log(`Bytes recebidos: ${arquivo.body.length}`);

console.log('============================================');

check(arquivo, {
    'Download MinIO realizado': (r) => r.status === 200,
    'Arquivo possui conteúdo': (r) => r.body.length > 0,
});

sleep(2);


}