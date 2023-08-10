export default interface IProperty {
  id?: string;
  local: {
    municipio: string;
    distrito: string;
    bairro: string;
  };
  imovel: {
    titulo: string,
    aquisição: string,
    tipo: string,
    sala: number,
    cozinha: number,
    quarto: number,
    quintal: boolean,
    preco: number,
  },
  facilidades?: string[];
  imagem: string[];
}
