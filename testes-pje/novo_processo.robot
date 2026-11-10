*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***
Acessar Site do PJE 
   
    Open Browser    https://homologacao-pje.app.tjpe.jus.br/h06-1g/home.seam    chrome
    Sleep    2s
    Maximize Browser Window

*** Test Cases ***
Realizar login

    Input Text    id=username    02112357417
    Input Text    id=password    tjpe1977
    Click Button    id=kc-login
    Sleep    5s

*** Test Cases ***
Criar novo processo

    Click Element    css=.botao-menu
    Click Element    xpath=//a[contains(., 'Processo')]
    Sleep    2s
    Click Element    xpath=//a[contains(., 'Novo processo')]
    Sleep    2s
    Click Element    xpath=//span[contains(@class, 'select2-selection')]
    Sleep    2s
    Click Element    xpath=//li[contains(text(), 'DIREITO CIVIL > COISAS')]
    Sleep    2s
    Click Element    xpath=//span[contains(text(), 'Selecione')]
    Sleep    4s
    Click Element    xpath=//li[contains(text(), 'Abreu e Lima - Varas')]
    Sleep    10s
    Click Element    xpath=//span[contains(text(), 'Selecione')]
    Sleep    6s
    Click Element    xpath=//li[contains(text(), 'AÇÃO CIVIL COLETIVA (63)')]
    Sleep    6s
    Click Button    id=processoTrfForm:incluiProcessoButton
    Sleep    6s
    Click Element    id=r_processoAssuntoListList:0:j_id396:j_id397:j_id398
    Sleep    4s
    Click Element    id=tabPartes_lbl
    Sleep    4s
    Click Element    id=addParteA
    Sleep    4s
    Input Text    id=preCadastroPessoaFisicaForm:preCadastroPessoaFisica_nrCPFDecoration:preCadastroPessoaFisica_nrCPF    728.970.810-58
    Sleep    4s
    Click Element    id=preCadastroPessoaFisicaForm:pesquisarDocumentoPrincipal
    Sleep    4s
    Click Element    id=preCadastroPessoaFisicaForm:btnConfirmarCadastro
    Sleep    4s
    Click Element    xpath=//span[contains(@class, 'select2-selection')]
    Sleep    4s
    Click Element    xpath=//li[contains(text(), 'AUTOR(A)')]
    Sleep    4s
    Click Element    id=select2-formInserirParteProcesso:selectPaisNacionalidadeDecoration:selectPaisNacionalidade-container
    Sleep    6s
    Click Element    xpath=//li[contains(text(), 'Brasil')]
    Sleep    4s
    Click Element    id=select2-formInserirParteProcesso:estadoDecoration:estado-container
    Sleep    4s
    Click Element    xpath=//li[contains(text(), 'PERNAMBUCO')]
    Sleep    4s
    Click Element    id=formInserirParteProcesso:j_id5245:municipio
    Sleep    2s
    Input Text    id=formInserirParteProcesso:j_id5245:municipio   RECIFE
    Sleep    4s
    Click Element    id=formInserirParteProcesso:btnComplementarDadosParte
    Sleep    4s
    Click Element    id=formInserirParteProcesso:btnInserirParteProcesso
    Sleep    4s
    Click Element    id=addParteP
    Sleep    4s
    Click Element    xpath=//span[contains(@class, 'select2-selection')]
    Sleep    4s
    Click Element    xpath=//li[contains(text(), 'RÉU')]
    Sleep    4s
    Input Text    id=preCadastroPessoaFisicaForm:preCadastroPessoaFisica_nrCPFDecoration:preCadastroPessoaFisica_nrCPF    544.837.590-19
    Sleep    4s
    Click Element    id=preCadastroPessoaFisicaForm:pesquisarDocumentoPrincipal
    Sleep    4s
    Click Element    id=preCadastroPessoaFisicaForm:btnConfirmarCadastro
    Sleep    4s
    Click Element    id=select2-formInserirParteProcesso:selectPaisNacionalidadeDecoration:selectPaisNacionalidade-container
    Sleep    6s
    Click Element    xpath=//li[contains(text(), 'Brasil')]
    Sleep    4s
    Click Element    id=select2-formInserirParteProcesso:estadoDecoration:estado-container
    Sleep    4s
    Click Element    xpath=//li[contains(text(), 'PERNAMBUCO')]
    Sleep    4s
    Click Element    id=formInserirParteProcesso:j_id22140:municipio
    Sleep    2s
    Input Text    id=formInserirParteProcesso:j_id22140:municipio   RECIFE
    Sleep    2s
    Click Element    id=formInserirParteProcesso:btnComplementarDadosParte
    Sleep    4s
    Click Element    id=formInserirParteProcesso:btnInserirParteProcesso
    Sleep    4s
    Click Element    id=processoPrioridadeProcesso_lbl
    Sleep    2s
    Click Element    formAdicionarCaracteristicasProcesso:salvaCaracteristicaProcessoButton
    Sleep    2s
    Click Element    id=novoAnexo_lbl
    Sleep    2s
    Click Button    id=j_id1020
    Sleep    2s
    Scroll Element Into View    id=btn-assinador
    Sleep    1s
    Click Element    id=btn-assinador
    Sleep    6s
    Click Element    id=informativo_lbl
    Sleep    4s
    Click Element    id=formBotoesAcao:btnProtocolar
    
    
  

  