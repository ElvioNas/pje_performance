import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
        processo_pje: {
            executor: 'constant-vus',
            vus: 500,
            duration: '60s',
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
        'Login realizado': (r) =>
            r.status === 200 || r.status === 302,
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

        'fPP:processoReferenciaDecoration:habilitarMascaraProcessoReferencia':
            'true',

        'fPP:processoReferenciaDecoration:IdProcessoReferenciaComMascaraDecoration:IdProcessoReferenciaComMascara':
            '',

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

        'idProcessoSelecionado': '7695738',

        'ajaxSingle':
            'fPP:processosTable:7695738:j_id494',

        'fPP:processosTable:7695738:j_id494':
            'fPP:processosTable:7695738:j_id494',

        'javax.faces.ViewState': 'j_id18',

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

    sleep(2);


    //=====================================================
    // 6 - ABRIR DOCUMENTO
    //=====================================================

    const documento = http.get(
        `${BASE_URL}/d01-1g/seam/resource/rest/pje-legacy/documento/download/244167563`
    );

    check(documento, {
        'Documento solicitado': (r) => r.status === 200,
    });

    console.log(`Documento: ${documento.status}`);

    sleep(2);


    //=====================================================
    // 7 - CLICAR NO BOTÃO DOWNLOAD
    //=====================================================

    const payloadAreaDownload = {

        'AJAXREQUEST': 'j_id152',

        'j_id153': 'j_id153',

        'autoScroll': '',

        'javax.faces.ViewState': 'j_id3',

        'j_id153:j_id155':
            'j_id153:j_id155',

        'ajaxSingle':
            'j_id153:j_id155',

        'AJAX:EVENTS_COUNT': '1'
    };

    const areaDownload = http.post(
        `${BASE_URL}/d01-1g/AreaDeDownload/listView.seam`,
        payloadAreaDownload,
        {
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',

                'X-Requested-With':
                    'XMLHttpRequest',

                'Accept':
                    '*/*',

                'Referer':
                    `${BASE_URL}/d01-1g/AreaDeDownload/listView.seam`
            }
        }
    );

    check(areaDownload, {
        'Área Click Download ': (r) => r.status === 200,
    });

    console.log(`Área Click Download: ${areaDownload.status}`);

    sleep(2);
}