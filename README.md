<h1 align="center">AbacatePay API Types</h1>

<p align="center">Definições de tipos para a API da Abacate Pay</p>

<h2 align="center">Instalando</h2>

```bash
npm install abacate-pay-types
```

<h2 align="center">Estrutura</h2>

- Qualquer tipagem exportada com o prefixo `API` representa tipos de estruturas da API.
- Qualquer tipagem exportada com o prefixo `Webhook` representa tipos que você recebe de [eventos de webhook](https://docs.abacatepay.com/pages/webhooks).
- Qualquer tipagem exportada com o prefixo `REST<HTTP Method>` representa tipos que você recebe ou envia para a API via requisições.
   - Para endpoints/rotas que necessitam de query parameters ou body, as tipagens então vão ser documentadas com o sufixo `Body` ou `QueryParams`.
   - Por exemplo, `RESTPostCreateNewChargeBody` e `RESTGetCheckQRCodePixStatusQueryParams`.
   - Qualquer tipo que tenha o sufixo `Data` representa dados que vem diretamente de uma resposta de alguma requisição.
   - Por exemplo, `RESTGetListCouponsData` é a tipagem para a rota `/v1/coupon/list`.

**Comos os tipos são documentados:** O pacate `abacate-api-types` vai adicionar tipos somente para campos e estrutura que estão presentes na documentação oficial da [API da AbacatePay](https://docs.abacatepay.com/pages/introduction). Nada além disso será documentado.

**@unstable**: Campos que contam com a tag `@unstable` (Como é o caso do `WebhookWithdrawDoneEvent.billing.kind`), que significam que o campo não possui nenhuma documentação certa sobre qual é o tipo do campo, mas nós assumimos que o tipo do campo é determinado pelos exemplos fornecido na documentação oficial.
