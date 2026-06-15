
export function setUsuarioLogado(usuario) {
  sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

export function getUsuarioLogado() {
  const valor = sessionStorage.getItem("usuarioLogado");
  return valor ? JSON.parse(valor) : null;
}

export function limparUsuarioLogado() {
  sessionStorage.removeItem("usuarioLogado");
}
