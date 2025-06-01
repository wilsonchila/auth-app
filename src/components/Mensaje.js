const Mensaje = ({ texto, tipo }) => {
  if (!texto) return null;

  const estilo = {
    padding: '12px 16px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid',
    backgroundColor: tipo === 'success' ? '#d4edda' : tipo === 'error' ? '#f8d7da' : '#d1ecf1',
    borderColor: tipo === 'success' ? '#c3e6cb' : tipo === 'error' ? '#f5c6cb' : '#bee5eb',
    color: tipo === 'success' ? '#155724' : tipo === 'error' ? '#721c24' : '#0c5460'
  };

  return <div style={estilo}>{texto}</div>;
};

export default Mensaje;