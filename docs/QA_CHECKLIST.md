# Checklist de QA para Publicação

## 1. Alternância de Modo
- [ ] Alternância claro/escuro funciona em todos componentes e páginas.
- [ ] Cores do tema são aplicadas corretamente via CSS vars.

## 2. Responsividade
- [ ] Layouts adaptativos em mobile, tablet e desktop.
- [ ] Tabelas, cards e banners usam `overflow-x-auto` e espaçamentos responsivos.

## 3. Acessibilidade
- [ ] Labels presentes em todos inputs e botões.
- [ ] Navegação por teclado funcional.
- [ ] Contraste de cores validado (Lighthouse/axe).

## 4. Integração com Central de Ajuda
- [ ] Aparência da central de ajuda "casa" com o tema do site (cores, fontes, espaçamentos).
- [ ] Testar visualização de artigos, tickets e navegação.

## 5. Logs de Auditoria e Exportação/Importação
- [ ] Logs de auditoria registrados em todas ações sensíveis (visualização, exportação, importação).
- [ ] Exportação/importação de dados (CSV/JSON) funcional nos módulos CRM/Publicações.

## 6. Documentação
- [ ] DESIGN_SYSTEM.md atualizado com padrões e exemplos.
- [ ] Guia de manutenção disponível para onboarding.

## 7. Testes Finais
- [ ] Testar em Chrome, Firefox, Safari, Edge, Android/iOS.
- [ ] Validar visual e funcionalidade em todos navegadores/dispositivos.
- [ ] Rodar Lighthouse/axe para acessibilidade.

---

**Observação:** Marque cada item após validação. Use este checklist antes de publicar ou atualizar o sistema.
