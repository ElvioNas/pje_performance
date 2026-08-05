# Teste de carga — fluxo de consulta no PJe

Este projeto contém um teste de carga em [k6](https://grafana.com/docs/k6/latest/) para validar o fluxo de consulta processual do ambiente de desenvolvimento do PJe/TJPE.

O cenário está definido em [`pje_carga3.js`](./pje_carga3.js).

## Fluxo exercitado

Cada usuário virtual executa, em sequência:

1. Carregamento da tela de login;
2. Autenticação no PJe;
3. Abertura do Quadro de Avisos;
4. Abertura da tela de Consulta Processual;
5. Pesquisa de um processo;
6. Abertura do processo retornado.

Há pausas entre as etapas para simular o tempo de navegação do usuário: 1 segundo após login, quadro de avisos e consulta; 2 segundos após a pesquisa e a abertura do processo.

## Perfil de carga

| Configuração | Valor |
| --- | --- |
| Executor | `constant-vus` |
| Usuários virtuais | 100 |
| Duração | 30 segundos |
| Ambiente-alvo | desenvolvimento do PJe/TJPE |

Com `constant-vus`, o k6 mantém 100 usuários virtuais ativos durante todo o período. Cada VU repete o fluxo completo enquanto houver tempo disponível.

## Critérios de aceitação

O teste falha quando algum dos limites abaixo não é atendido:

| Métrica | Limite |
| --- | --- |
| Taxa de requisições HTTP com falha (`http_req_failed`) | menor que 1% |
| 95º percentil da duração HTTP (`http_req_duration`) | menor que 5 segundos |

Além disso, cada etapa possui uma validação de status HTTP:

- Login: `200` ou `302`;
- Demais telas e ações: `200`.

## Pré-requisitos

- [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) instalado e disponível no terminal;
- Acesso de rede ao ambiente de desenvolvimento;
- Uma conta de teste válida no PJe;
- Processo de teste disponível para os identificadores usados na pesquisa e na abertura.

## Execução

No diretório do projeto, execute:

```powershell
k6 run .\pje_carga3.js
```

O resultado é exibido no terminal ao final da execução. Observe principalmente `http_req_failed`, `http_req_duration` e as validações (`checks`). O código também registra no console o status de cada etapa para facilitar o diagnóstico.

## Configurações a revisar antes de executar

O script contém valores específicos do ambiente e do cenário atual:

- `BASE_URL`: endereço do PJe alvo;
- número de VUs e duração, em `options.scenarios.processo_pje`;
- dados usados na pesquisa e o identificador do processo aberto;
- campos e tokens de formulário JSF/Seam (`javax.faces.ViewState`, `AJAXREQUEST` e similares).

Esses valores podem expirar ou variar conforme a sessão e a versão da aplicação; confirme-os antes de reutilizar o teste em outro ambiente.

## Segurança

Não versione senhas, CPF ou outros dados reais no script. O arquivo atual possui credenciais diretamente no payload de login; antes de compartilhar ou enviar o projeto a um repositório remoto, substitua-as por variáveis de ambiente, por exemplo:

```javascript
const payloadLogin = {
  username: __ENV.PJE_USERNAME,
  password: __ENV.PJE_PASSWORD,
  btnEntrar: 'Entrar',
};
```

Então execute sem expor os valores no código:

```powershell
k6 run -e PJE_USERNAME='seu_usuario' -e PJE_PASSWORD='sua_senha' .\pje_carga3.js
```

Use somente credenciais e dados de teste autorizados, especialmente porque a execução concorrente gera volume significativo de acessos ao ambiente.

## Limitações conhecidas

- O teste mede o fluxo HTTP, não a renderização no navegador;
- Não há grupos (`group`) ou métricas personalizadas para separar o tempo de cada etapa no resumo final;
- Os `console.log` de cada VU podem aumentar o volume de saída e interferir levemente em cargas maiores;
- A sessão depende do comportamento de cookies e redirecionamentos do servidor, que o cliente HTTP do k6 gerencia durante a execução de cada VU.
