
function updatePreview() {
    document.getElementById("previewName").innerText = document.getElementById("nameInput").value || "O teu nome";
    document.getElementById("previewDesc").innerText = document.getElementById("descInput").value || "Descrição aqui";
    const imgUrl = document.getElementById("imgInput").value;
    document.getElementById("previewImg").src = imgUrl || "";

    const previewLinks = document.getElementById("previewLinks");
    previewLinks.innerHTML = "";

    const titles = document.querySelectorAll(".linkTitle");
    const urls = document.querySelectorAll(".linkURL");

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i].value;
        const url = urls[i].value;
        if (title && url) {
            const link = document.createElement("a");
            link.href = url;
            link.className = "link-button";
            link.target = "_blank";
            link.innerText = title;
            previewLinks.appendChild(link);
        }
    }
}

function addLink() {
    const container = document.getElementById("linksContainer");
    const div = document.createElement("div");
    div.className = "link-entry";
    div.innerHTML = \`
        <input type="text" class="linkTitle" placeholder="Título do link">
        <input type="text" class="linkURL" placeholder="https://...">
    \`;
    container.appendChild(div);
    bindInputs();
}

function bindInputs() {
    document.querySelectorAll("input").forEach(input => {
        input.removeEventListener("input", updatePreview);
        input.addEventListener("input", updatePreview);
    });
}

function generateHTML() {
    const htmlContent = document.querySelector(".preview-box").outerHTML;
    const fullHTML = \`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>O meu Linktree</title>
    <style>
        body { font-family: Arial; text-align: center; padding: 20px; background: #f3f3f3; }
        img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }
        .link-button { display: block; margin: 10px auto; padding: 10px; width: 80%; background: #333; color: white; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
\${htmlContent}
</body>
</html>
\`;

    const blob = new Blob([fullHTML], {type: "text/html"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "linktree.html";
    a.click();
}

window.onload = () => {
    bindInputs();
    updatePreview();
};
