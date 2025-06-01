import { useState } from 'react';
import Mensaje from './Mensaje';

const FormularioLogin = ({ onLogin, onSwitchView, cargando, mensaje }) => {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return;
    }
    onLogin(formData);
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      
      <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} />
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario o Email:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
            //placeholder="admin / admin@example.com"//
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            //placeholder="admin123 / password123"//
          />
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="switch-view">
        <p>¿No tienes cuenta?</p>
        <button onClick={onSwitchView}>Registrarse</button>
      </div>

      <div className="usuarios-prueba">
        <h4>Usuarios de prueba:</h4>
        <ul>
          <li><strong>Usuario:</strong> admin | <strong>Contraseña:</strong> admin123</li>
          <li><strong>Usuario:</strong> usuario1 | <strong>Contraseña:</strong> password123</li>
        </ul>
      </div>
    </div>
  );
};

export default FormularioLogin;