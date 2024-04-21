import { Request, Response } from 'express';
import { gerarPdf } from '../services/fileServices';

export const gerarPdfByHtml = async (req: Request, res: Response) => {
    try {
        const dados: string = req.body; // Apenas o corpo da solicitação é o HTML        
        const pdfBuffer = await gerarPdf(dados);        
        if (pdfBuffer) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=lista_produtos.pdf');
            res.status(200).send(pdfBuffer);          
        } else {
            res.status(500).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}