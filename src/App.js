import { useState, useEffect } from 'react';
import FormularioLogin from './components/FormularioLogin';
import FormularioRegistro from './components/FormularioRegistro';
import Dashboard from './components/Dashboard';
import './styles.css';

const App = () => {
  // Datos quemados de usuarios
  const usuariosQuemados = [
    { 
      id: 1, 
      username: 'admin', 
      email: 'admin@example.com', 
      password: 'admin123' 
    },
    { 
      id: 2, 
      username: 'usuario1', 
      email: 'usuario1@example.com', 
      password: 'password123' 
    }
  ];

  const [usuarios, setUsuarios] = useState(usuariosQuemados);
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('login');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  // Verificar usuario al cargar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
      setVista('dashboard');
    }
  }, []);

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setTimeout(() => {
      setMensaje('');
      setTipoMensaje('');
    }, 5000);
  };

  // Función de login modificada para usar datos quemados
  const manejarLogin = (credenciales) => {
    setCargando(true);
    
    setTimeout(() => { // Simular delay de red
      const usuarioEncontrado = usuarios.find(
        u => (u.username === credenciales.username || u.email === credenciales.username) && 
             u.password === credenciales.password
      );

      if (usuarioEncontrado) {
        const usuarioData = {
          id: usuarioEncontrado.id,
          username: usuarioEncontrado.username,
          email: usuarioEncontrado.email
        };
        
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
        setUsuario(usuarioData);
        setVista('dashboard');
        mostrarMensaje('¡Bienvenido!', 'success');
      } else {
        mostrarMensaje('Credenciales incorrectas', 'error');
      }
      
      setCargando(false);
    }, 1000);
  };

  // Función de registro modificada
  const manejarRegistro = (nuevoUsuario) => {
    setCargando(true);
    
    setTimeout(() => {
      const usuarioExiste = usuarios.some(
        u => u.username === nuevoUsuario.username || u.email === nuevoUsuario.email
      );

      if (usuarioExiste) {
        mostrarMensaje('El usuario o email ya existe', 'error');
      } else {
        const usuarioData = {
          id: Date.now(),
          username: nuevoUsuario.username,
          email: nuevoUsuario.email
        };
        
        // Agregar a la lista de usuarios
        setUsuarios([...usuarios, {
          ...nuevoUsuario,
          id: usuarioData.id
        }]);
        
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
        setUsuario(usuarioData);
        setVista('dashboard');
        mostrarMensaje('¡Registro exitoso!', 'success');
      }
      
      setCargando(false);
    }, 1000);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    setVista('login');
    mostrarMensaje('Sesión cerrada', 'info');
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Sistema de Autenticación</h1>
        <p>Frontend con datos quemados</p>
      </div>

      {vista === 'login' && (
        <FormularioLogin 
          onLogin={manejarLogin} 
          onSwitchView={() => setVista('register')} 
          cargando={cargando}
          mensaje={{ texto: mensaje, tipo: tipoMensaje }}
        />
      )}
      
      {vista === 'register' && (
        <FormularioRegistro 
          onRegister={manejarRegistro} 
          onSwitchView={() => setVista('login')} 
          cargando={cargando}
          mensaje={{ texto: mensaje, tipo: tipoMensaje }}
        />
      )}
      
      {vista === 'dashboard' && usuario && (
        <Dashboard 
          usuario={usuario} 
          onLogout={cerrarSesion} 
          mensaje={{ texto: mensaje, tipo: tipoMensaje }} 
        />
      )}
    </div>
  );
};

export default App;
