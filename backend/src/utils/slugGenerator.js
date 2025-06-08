// utils/slugGenerator.js
function gerarSlug(nome) {
    return nome
        .toLowerCase()
        .normalize('NFD') // Remove acentos
        .replace(/[\u0300-\u036f]/g, '') // Remove marcas Unicode restantes
        .replace(/\s+/g, '-') // Substitui espaços por hífen
        .replace(/[^\w\-]+/g, '') // Remove caracteres não alfanuméricos
        .replace(/\-\-+/g, '-') // Remove hífens duplicados
        .replace(/^-+|-+$/g, ''); // Remove hífens das extremidades
}

module.exports = { gerarSlug };