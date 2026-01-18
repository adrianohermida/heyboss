# Fluxo de Atendimento, Chat Realtime e Integração CRM/Balcão Virtual

## 1. Fluxo de Atendimento ao Cliente
- O cliente acessa o ClientPortal e autentica-se.
- O sistema busca o registro do cliente na tabela `crm.clientes` para obter `cliente_id` e `escritorio_id`.
- O cliente pode:
  - Visualizar tickets existentes.
  - Criar um novo ticket (chamado de suporte), preenchendo título, descrição, prioridade, etc.
  - Cada ticket é salvo em `tickets.tickets` com os campos do schema real.

## 2. Chat Realtime por Ticket
- Ao abrir um ticket, o ChatWidget é exibido e vinculado ao tópico `ticket:{ticket_id}`.
- Todas as mensagens trocadas no chat são persistidas em `realtime.messages` com o topic do ticket.
- O ChatWidget assina o canal realtime do Supabase para o topic do ticket, permitindo colaboração em tempo real entre cliente e equipe.
- O histórico do chat é carregado automaticamente ao abrir o ticket.
- Mensagens tradicionais (não realtime) podem ser salvas em `tickets.ticket_comments`.

## 3. Integração com Balcão Virtual
- Se o cliente tiver uma sessão ativa no Balcão Virtual (`balcao_virtual.sessoes_ativas`), ao criar um ticket:
  - O ticket é associado à sessão.
  - O histórico da conversa do Balcão Virtual (`balcao_virtual.logs_conversas`) é importado como comentários do ticket.
- Isso garante rastreabilidade e continuidade do atendimento entre canais.

## 4. Integração com CRM
- Todos os tickets e documentos enviados são relacionados ao `cliente_id` e `escritorio_id` do CRM.
- O time pode consultar o histórico completo de tickets, documentos e interações do cliente via CRM.

## 5. Benefícios
- Atendimento centralizado, seguro e auditável.
- Chat colaborativo e persistente, com histórico completo.
- Integração omnichannel: portal, chat, Balcão Virtual e CRM.

## 6. Testes Recomendados
- Abrir ticket, enviar mensagens, validar realtime e persistência.
- Testar importação de conversas do Balcão Virtual.
- Validar acesso e histórico no CRM.

---

Dúvidas ou sugestões? Consulte a equipe de desenvolvimento ou o README do projeto.