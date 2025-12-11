# Lista de Presença (Angular 16+ Standalone + Tailwind)

Aplicação simples para cadastro e listagem de presença com formulários reativos, validação, e atualização otimista de estado. Visual com Tailwind CSS e Material Icons.

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+ (ou compatível com seu Node)
- (Opcional) Angular CLI global: `npm i -g @angular/cli`

## Instalação

```bash
# 1) Instalar dependências
npm install

# 2) Rodar em desenvolvimento
npm start
# ou
ng serve
```

- Acesse: http://localhost:4200

## Scripts úteis

```bash
npm start        # ng serve (dev)
npm run build    # build de produção
npm run watch    # build em watch (modo dev)
npm test         # testes unitários (Angular)
```

## Estrutura principal

```
src/
  app/
    api/
      attendance.api.ts            # Simulação de API (Observables com delay)
    components/
      attendance/
        attendance.component.ts    # Form + integração com service
        attendance.component.html
      attendance-list/
        attendance-list.component.ts
        attendance-list.component.html
    models/
      attendance.model.ts          # Interface dos registros
    services/
      attendance.service.ts        # Estado local + chamadas fake (comentadas)
  assets/
  styles.css                       # Tailwind importado
```

## Como funciona

- Formulário reativo com validação:
  - Nome: obrigatório, mínimo 3 caracteres
  - Email: obrigatório, formato válido
- Botões: Salvar, Editar, Remover
- Lista é atualizada imediatamente (optimistic update)
- Separação de responsabilidades:
  - `AttendanceComponent`: UI e interação do formulário
  - `AttendanceListComponent`: exibição da lista (via @Input e @Output)
  - `AttendanceService`: estado local + pontos de integração com API
  - `AttendanceApi`: simulação de endpoints HTTP (apenas delay e `of()`)





## Dicas de uso

- Validações apresentam mensagens logo abaixo de cada campo.
- A lista atualiza na hora (mesmo antes da "chamada HTTP fake").
- O componente de lista emite eventos de editar e remover para o pai, que atualiza o service.



