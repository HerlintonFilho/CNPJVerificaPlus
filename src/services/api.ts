export async function getCNPJData(cnpj: string) {
    const response = await fetch(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
    const data = await response.json();
    return data;
  }
  