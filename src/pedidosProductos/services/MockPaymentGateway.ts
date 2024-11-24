import { PaymentGateway } from "./paymentGatewayService";

export class MockPaymentGateway implements PaymentGateway {
    async processPayment(paymentData: {
        amount: number;
        currency: string;
        method: string; // Usar 'method'
        details: any;
    }): Promise<{ success: boolean; transactionId?: string; errorMessage?: string }> {
        const isSuccess = Math.random() > 0.3; // 70% de éxito
        return new Promise((resolve) =>
            setTimeout(() => {
                if (isSuccess) {
                    resolve({ success: true, transactionId: `TX-${Date.now()}` });
                } else {
                    resolve({ success: false, errorMessage: "Transacción rechazada" });
                }
            }, Math.random() * 3000) // Entre 0 y 3 segundos de demora
        );
    }
}
