# Alterar textos de componentes VTEX com GraphQL
## Verificar texto atual antes da alteração
```javascript
query GetTranslation($args: TranslateWithDependenciesArgs!) {
  translateWithDependencies(args: $args)
}
```
```javascript
{
"args": {
    "indexedByFrom": [
      {
        "from": "en-DV",
        "messages": [
          {
            "content": "store/minicart.go-to-checkout",
            "context": "vtex.minicart@2.x"
          }
        ]
      }
    ],
    "to": "pt-BR",
    "depTree": "[{\"id\": \"vtex.minicart@2.x\"}]"
  }
}
```
:::tip
Para pegar o que colocar em “context” veja no inspecionar da loja qual o nome que vem na classe do elemento que você quer alterar, por exemplo para mudar o texto do botão no carrinho:
 ![](/api/attachments.redirect?id=e0d33e46-871a-4c30-8408-5d34d156bcf3)
:::

:::tip
Para pegar o que colocar em “content” procure no google pelo repositório do app em questão e depois veja na pasta “messages” como se chama a variável em questão.
 ![](/api/attachments.redirect?id=88f4b798-eb62-41b6-a077-c6d1015ae4b1)
:::
## Alterar texto
```javascript
mutation Save($saveArgs: SaveArgsV2!) {
  saveV2(args: $saveArgs)
}
```
```javascript
{
  "saveArgs": {
    "to": "pt-BR",
    "messages": [
      {
        "srcLang": "en-DV",
        "srcMessage": "store/minicart.go-to-checkout",
        "context": "vtex.minicart@2.x",
        "targetMessage": "My personalized Search message"
      }
    ]
  }
}
```
