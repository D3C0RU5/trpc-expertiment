export class Pollinations {
  static async generateAcronym(name: string): Promise<string | undefined> {
    const prompt = `
Gere uma sigla criativa e pronunciável com no máximo 3 letras para o nome "${name}".
Regras:
- Retorne SOMENTE a sigla, sem comentários ou explicações
- No máximo 3 letras
- Fácil de pronunciar
- Não use apenas a primeira letra de cada palavra
- Seja criativo e inesperado
`.trim();

    const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;

    try {
      const response = await fetch(url);
      const text = await response.text();

      const acronym = text
        .trim()
        .replace(/[^A-Za-z]/g, "")
        .slice(0, 3)
        .toUpperCase();

      return acronym || undefined;
    } catch (err) {
      console.error("Erro ao gerar acrônimo com Pollinations:", err);
      return undefined;
    }
  }
}
