import { Router } from "express"; 

const router = Router();

router.post('/process', async (req, res) => {
    const isSuccess = Math.random() > 0.3;
    setTimeout(() => {
        if (isSuccess) {
            res.json({ success: true, transactionId: `TX-${Date.now()}` });
        } else {
            res.status(400).json({ success: false, errorMessage: "Transacción rechazada" });
        }
    }, Math.random() * 3000); // Entre 0 y 3 segundos
});


export default router;
