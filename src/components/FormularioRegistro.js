import { useState } from 'react';
import Mensaje from './Mensaje';

const FormularioRegistro = ({ onRegister, onSwitchView, cargando, mensaje }) => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return;
    }
    onRegister(formData);
  };

  return (
    <div className="form-container">
      <h2>Registrarse</h2>
      
      <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} />
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
            placeholder="Elige un nombre de usuario"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            minLength="6"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <div className="switch-view">
        <p>¿Ya tienes cuenta?</p>
        <button onClick={onSwitchView}>Iniciar Sesión</button>
      </div>
    </div>
  );
};

export default FormularioRegistro;