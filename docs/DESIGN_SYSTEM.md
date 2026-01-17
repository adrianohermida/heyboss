# Guia de Manutenção e Evolução de Tema

## 1. Estrutura de Tema
- Todas as cores principais estão centralizadas em `src/styles/theme.ts`.
- O ThemeProvider injeta variáveis CSS globais (`--color-bg`, `--color-brand`, etc.) para alternância claro/escuro.
- Tailwind está configurado para usar utilitários e classes dinâmicas baseadas nessas variáveis.

## 2. Como Adicionar/Alterar Cores
- Edite `src/styles/theme.ts` para atualizar valores das cores.
- Para adicionar novas variáveis, inclua no objeto `colors` e injete via ThemeProvider.
- Use as variáveis CSS nos componentes: `bg-[var(--color-bg)]`, `text-[var(--color-text)]`, etc.

## 3. Temas de Formulário
- Temas customizados para formulários estão em `src/react-app/components/CustomForm/themes.ts`.
- Para criar um novo tema, siga o padrão dos objetos existentes e aplique via prop `theme` no componente `CustomForm`.

## 4. Responsividade
- Use utilitários Tailwind (`sm:`, `md:`, `lg:`) para garantir layouts adaptativos.
- Cards, tabelas e banners devem usar `overflow-x-auto` e espaçamentos responsivos.

## 5. Acessibilidade
- Sempre inclua labels, roles e navegação por teclado.
- Teste contraste de cores e navegação usando ferramentas como Lighthouse ou axe.

## 6. Manutenção
- Novos componentes devem usar variáveis de tema e utilitários Tailwind.
- Documente padrões e exemplos neste arquivo para facilitar onboarding.

## 7. Checklist de QA
- [ ] Alternância claro/escuro funciona em todos componentes.
- [ ] Layout responsivo em mobile, tablet e desktop.
- [ ] Contraste de cores adequado para acessibilidade.
- [ ] Labels e navegação por teclado presentes.
- [ ] Logs de auditoria e exportação/importação testados nos módulos CRM/Publicações.
- [ ] Documentação atualizada.

## 8. Exemplos
```tsx
// Usando cor de fundo do tema
<div className="bg-[var(--color-bg)] text-[var(--color-text)]">
  ...
</div>

// Usando tema customizado em formulário
<CustomForm theme={contactFormTheme} ... />
```

---

## Referências
- [src/styles/theme.ts](../src/styles/theme.ts)
- [src/styles/ThemeProvider.tsx](../src/styles/ThemeProvider.tsx)
- [src/react-app/components/CustomForm/themes.ts](../src/react-app/components/CustomForm/themes.ts)
