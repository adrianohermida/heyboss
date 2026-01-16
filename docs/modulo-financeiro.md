

# Especificação Técnica: Módulo Financeiro (Hermida Maia Advocacia)

Este documento detalha a visão arquitetural e funcional do módulo Financeiro, projetado para ser o núcleo de gestão de receitas e conformidade do escritório.

## 1. Componentes Funcionais
- **Gestor de Receitas**: Interface para criação e edição de honorários, custas e reembolsos.
- **Painel de Controle Stripe**: Monitoramento em tempo real de sessões de checkout e status de pagamento.
- **Filtros Dinâmicos**: Segmentação por período, cliente, status (Pago, Pendente, Atrasado) e categoria financeira.
- **Centro de Notificações**: Alertas automáticos para o financeiro sobre pagamentos confirmados e para clientes sobre vencimentos.
- **Exportador de Dados**: Geração de relatórios em CSV/JSON para contabilidade externa.

## 2. Fluxos de Trabalho
### A. Ciclo de Cobrança
1. O advogado registra uma nova fatura vinculada a um processo.
2. O sistema gera automaticamente um link de pagamento seguro via Stripe.
3. O cliente recebe o link e realiza o pagamento.
4. O Stripe notifica o Worker (Webhook/Polling), que atualiza o status para "Pago" e registra a `data_pagamento`.

### B. Auditoria e Compliance
1. Toda visualização de dados financeiros por um administrador gera um registro na tabela `audit_logs`.
2. Alterações em valores ou datas de vencimento exigem justificativa (campo `comentario`).

## 3. Estrutura de Dados (D1)
A tabela `faturas` é a espinha dorsal, suportada por:
- `id`: Chave primária.
- `cliente_email`: Vínculo com a tabela `customers`.
- `valor_original` / `saldo_pagar`: Controle de montantes.
- `status`: Máquina de estados (Pendente -> Pago | Atrasado | Cancelado).
- `metodo_pagamento`: Identificação da origem (Cartão, Pix via Stripe, etc).
- `data_pagamento`: Timestamp da liquidação.

## 4. Segurança e LGPD
- **Minimização**: Não armazenamos dados de cartão; apenas tokens e IDs de transação do Stripe.
- **Integridade**: Uso de Prepared Statements em todas as queries SQL para evitar injeção.
- **Transparência**: O cliente tem acesso total ao seu histórico financeiro via Portal, exercendo seu direito de acesso aos dados.

## 5. Inteligência Artificial
- **Previsão de Receita**: Algoritmo que analisa o tempo médio de pagamento por cliente para projetar o caixa do mês seguinte.
- **Classificação Automática**: IA que sugere a `categoria` e `centro_custo` baseada na descrição da fatura.

## 6. Design e Acessibilidade
- **Contraste Elevado**: Uso de cores semânticas (Verde para Pago, Vermelho para Atrasado) com ícones de suporte para daltônicos.
- **Responsividade**: Tabelas que se transformam em cards detalhados em dispositivos móveis.
- **Navegação por Teclado**: Foco visível em todos os campos de formulário e botões de ação.
  
