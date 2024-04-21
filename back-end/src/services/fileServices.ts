import pdf from 'html-pdf';

export const gerarPdf = async (dados: string) => {
    return new Promise<Buffer | null>((resolve, reject) => {
        pdf.create(dados).toBuffer((err, buffer) => {
            if (err) {
                console.error('Erro ao gerar PDF:', err);
                resolve(null);
            } else {
                resolve(buffer);
            }
        });
    });
}