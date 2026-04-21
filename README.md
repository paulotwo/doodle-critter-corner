# Estúdio de Pintura dos Bichinhos

Jogo educativo de pintura para crianças (3–7 anos). Pinte bichinhos fofos com pincel e baldinho de tinta, complete desafios e aprenda cores, números e nomes de animais — tudo offline, direto no navegador.

**Demo ao vivo:** https://doodle-critter-corner.lovable.app

---

## Funcionalidades

- **29 bichinhos** para colorir em 4 categorias: domésticos, selvagens, aquáticos e dinossauros
- **6 desafios por animal** com progressão de dificuldade (usar uma cor, pintar N partes, usar carimbos, etc.)
- **4 ferramentas:** baldinho de tinta (flood-fill), pincel, borracha e carimbos temáticos
- **6 idiomas:** Português, English, Español, Français, Italiano, Deutsch
- **PWA:** instalável, funciona offline, sem necessidade de conta ou login
- Efeitos sonoros e síntese de voz para leitura dos desafios

## Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** (Radix UI)
- **Framer Motion** para animações
- **Vitest** + **@testing-library/react** para testes
- **Sentry** para monitoramento de erros e performance

## Desenvolvimento

```bash
npm install
npm run dev        # servidor local em http://localhost:8080
npm run build      # build de produção
npm run lint       # ESLint
npm run test       # Vitest (execução única)
npm run test:watch # Vitest (modo watch)
```

## Arquitetura

O conteúdo do jogo (temas, desafios, cores, carimbos) vive todo em `src/lib/studio-data.ts`. Para adicionar um novo animal: crie a imagem de contorno em `src/assets/animals/`, registre o `AnimalDef` em `src/lib/animals.ts` (com coordenadas das partes pintáveis), e adicione o `ThemeDef` com os 6 desafios em `studio-data.ts`.

```
src/
├── components/studio/   # lógica do jogo (PaintStudio, PaintCanvas, ...)
├── lib/
│   ├── studio-data.ts   # todo o conteúdo: temas, desafios, cores, carimbos
│   └── animals.ts       # definição dos animais e regiões de flood-fill
├── i18n/                # traduções (UI + textos de desafios) para 6 idiomas
└── assets/animals/      # PNGs de contorno (1024px) e animals-512/ (mobile)
```

O canvas de pintura e o canvas de contorno são camadas separadas. No momento do fill, o contorno é compositado temporariamente sobre a camada de pintura para servir de barreira ao flood-fill, e depois removido com `destination-out`.
