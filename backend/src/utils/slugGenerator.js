function gerarSlug(nome) {
    return nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') 
        .replace(/\s+/g, '-') 
        .replace(/[^\w\-]+/g, '') 
        .replace(/\-\-+/g, '-') 
        .replace(/^-+|-+$/g, ''); 
}

module.exports = { gerarSlug };