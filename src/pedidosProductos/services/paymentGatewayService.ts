export interface PaymentGateway {
    processPayment(paymentData: {
        amount: number;
        currency: string;
        method: string;
        details: any;
    }): Promise<{ success: boolean; transactionId?: string; errorMessage?: string }>;
}
