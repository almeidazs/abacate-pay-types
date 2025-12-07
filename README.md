<h1 align="center">AbacatePay API Types</h1>
<p align="center">Tipagens oficiais e helpers modernos para integrar com a API da AbacatePay.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/abacate-pay-types"><img src="https://img.shields.io/npm/v/abacate-pay-types" /></a>
  <a href="https://www.npmjs.com/package/abacate-pay-types"><img src="https://img.shields.io/npm/dm/abacate-pay-types" /></a>
  <img src="https://img.shields.io/badge/built%20for-bun%20%26%20node-0b7" />
  <img src="https://img.shields.io/badge/types-TypeScript-3178c6" />
  <img src="https://img.shields.io/badge/license-MIT-lightgray" />
</p>

<h2 align="center">📦 Instalação</h2>

```bash
npm install abacate-pay-types
```

<h2 align="center">Como a AbacatePay API Types documenta</h2>

- Prefixo `API*`
Representa estruturas gerais da API (Objetos retornados, modelos internos etc.).

- Prefixo `Webhook*`
Representa payloads recebidos pelos eventos de webhook.
Documentação: https://docs.abacatepay.com/pages/webhooks

- Prefixo `REST<HTTPMethod>*`
Tipos usados em requisições diretas à API.
  - Sufixo Body → corpo enviado na requisição
  Ex.: `RESTPostCreateNewChargeBody`

  - Sufixo `QueryParams` → parâmetros de query
  Ex.: `RESTGetCheckQRCodePixStatusQueryParams`

  - Sufixo `Data` → dados retornados pela API
  Ex.: `RESTGetListCouponsData`

- O pacote **NÃO adiciona tipos além do que existe na documentação oficial**.
Cada tipo reflete exatamente o que está documentado aqui:
https://docs.abacatepay.com/pages/introduction

- Campos marcados com `@unstable`
São campos que não têm definição formal na documentação, mas cujo tipo foi inferido com base nos exemplos oficiais.
(Ex.: `WebhookWithdrawDoneEvent.billing.kind`)

<h2 align="center">Quickstart</h2>

<p align="center"><strong>Crie um novo cupom</strong></p>

```ts
import {
	API_BASE,
	API_VERSION,
	type APICoupon,
	type RESTPostCreateCouponBody,
	Routes,
} from 'abacate-api-types';

async function createCoupon(body: RESTPostCreateCouponBody) {
	const path = `${API_BASE_URL}/${API_VERSION}/${Routes.createCoupon()}`;

	const response = await fetch(path, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	const data: APICoupon = await response.json();

	return data;
}
```

<p align="center"><strong>Crie um servidor e escute eventos de Webhooks do Aabacate</strong></p>

```ts
import { type WebhookEvent, WebhookEventType } from 'abacate-api-types';

Bun.serve({
    routes: {
        async '/webhooks/abacate'(request) {
            const { data, event }: WebhookEvent = await request.json();

            switch (event) {
                case WebhookEventType.BillingPaid:
                    console.log(`Um novo pagamento de ${data.payment.amount} foi feito`);

                    break;
                case WebhookEventType.WithdrawDone:
                    console.log(`Um novo saque foi feito ${data.transaction.receiptUrl}`);

                    break;
                case WebhookEventType.WithdrawFailed:
                    console.log(`O saque com o ID ${data.transaction.id} falhou`);
            }

            return new Response('OK');
        },
    },
});
```
