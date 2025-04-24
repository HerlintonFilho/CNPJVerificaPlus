export function formatCNPJ(cnpj: string): string {
    const digits = cnpj.replace(/\D/g, '');
    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5");
  }
  
