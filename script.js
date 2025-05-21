
function adicionarLink() {
  const div = document.createElement("div");
  div.classList.add("link-item");

  const texto = document.createElement("input");
  texto.placeholder = "Texto do link";
  texto.className = "link-text";

  const url = document.createElement("input");
  url.placeholder = "URL do link";
  url.className = "link-url";

  div.appendChild(texto);
  div.appendChild(url);
  document.getElementById("links").appendChild(div);
}

function atualizarPreview() {
  const nome = document.getElementById("nome").value;
  const imagem = document.getElementById("imagem").value;

  let html = `
    <div style="text-align:center;font-family:sans-serif;">
      <img src="${imagem}" alt="Imagem" style="width:120px;border-radius:50%;margin-top:20px;">
      <h2>${nome}</h2>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">
  `;

  const textos = document.querySelectorAll(".link-text");
  const urls = document.querySelectorAll(".link-url");

  for (let i = 0; i < textos.length; i++) {
    const t = textos[i].value;
    const u = urls[i].value;
    if (t && u) {
      html += `<a href="${u}" target="_blank" style="padding:10px;background:#007bff;color:white;border-radius:5px;text-decoration:none;">${t}</a>`;
    }
  }

  html += `</div></div>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  document.getElementById("preview").src = url;
}

function exportarHTML() {
  const preview = document.getElementById("preview");
  preview.contentWindow.postMessage("exportar", "*");

  const nome = document.getElementById("nome").value || "minha-linktree";
  const imagem = document.getElementById("imagem").value;

  let html = `
    <!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${nome}</title></head><body style="text-align:center;font-family:sans-serif;">
    <img src="${imagem}" alt="Imagem" style="width:120px;border-radius:50%;margin-top:20px;">
    <h2>${nome}</h2><div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">`;

  const textos = document.querySelectorAll(".link-text");
  const urls = document.querySelectorAll(".link-url");

  for (let i = 0; i < textos.length; i++) {
    const t = textos[i].value;
    const u = urls[i].value;
    if (t && u) {
      html += `<a href="${u}" target="_blank" style="padding:10px;background:#007bff;color:white;border-radius:5px;text-decoration:none;">${t}</a>`;
    }
  }

  html += `</div></body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${nome.replace(/\s+/g, "_")}.html`;
  link.click();
}
