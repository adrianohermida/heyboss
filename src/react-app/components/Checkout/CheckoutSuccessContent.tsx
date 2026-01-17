import React from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
type Product = { productName?: string };
type Props = {
  loading: boolean;
  error: any;
  purchaseData: any;
  onRetry: () => void;
};
const CheckoutSuccessContent: React.FC<Props> = ({ loading, error, purchaseData, onRetry }) => (
  <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center">
    {loading ? (
      <div className="text-center"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" /><p className="text-gray-600">Verificando informações...</p></div>
    ) : error ? (
      <><AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" /><h1 className="text-2xl font-bold text-gray-900 mb-2">Falha na Compra</h1><div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"><p className="text-red-600 text-sm">{`Erro: ${error?.message}`}</p></div><button onClick={onRetry} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">Tentar Novamente</button></>
    ) : !purchaseData ? (
      <><AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" /><h1 className="text-2xl font-bold text-gray-900 mb-2">Informação não encontrada</h1><p className="text-gray-600">Verifique se o sessionId está correto</p></>
    ) : (
      <><CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" /><h1 className="text-2xl font-bold text-gray-900 mb-2">Compra Realizada!</h1><p className="text-gray-600 mb-6">Obrigado pela sua compra, seu pedido foi confirmado.</p>{purchaseData.products && purchaseData.products.length > 0 ? (<div className="space-y-4"><div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm"><h3 className="text-lg font-semibold text-green-800 mb-4">Seu Pedido ({purchaseData.products.length} item{purchaseData.products.length > 1 ? 's' : ''})</h3><div className="space-y-3 mb-6">{purchaseData.products.map((product: Product, index: number) => (<div key={index} className="bg-white/60 rounded-lg p-4 border border-green-200"><div className="flex items-center justify-between"><div className="flex-1"><h4 className="font-medium text-green-800">{product.productName || `Produto ${index + 1}`}</h4></div></div></div>))}</div><div className="space-y-3"><a href="/account" className="w-full bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors flex items-center justify-center gap-2 no-underline font-medium">Ir para Meu Portal</a><a href="/" className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 no-underline font-medium">Voltar para o Início</a></div></div></div>) : null}<div className="mt-8 pt-6 border-t border-gray-200">{purchaseData.checkoutSessionId && (<div className="mb-4"><p className="text-sm font-mono text-gray-800 bg-gray-100 px-3 py-2 rounded border">Pedido: {purchaseData.checkoutSessionId}</p></div>)}</div></>
    )}
  </div>
);
export default CheckoutSuccessContent;
