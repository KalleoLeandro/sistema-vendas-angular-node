import { Request, Response } from 'express';
import { buscarDadosDashboard } from '../services/dashboardService';

export const carregarDashboard = async (req: Request, res: Response) => {
    try {
        const dados = await buscarDadosDashboard();
        res.status(200).json(dados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}
